import { useMergeRefs } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { ChakraProps } from "@chakra-ui/system";
import { debounce } from "lodash";
import { forwardRef, useEffect, useMemo, useRef } from "react";
import { ItemProps, ListItem, ListRange, Virtuoso } from "react-virtuoso";
import { Chart, Item } from "src/api";
import { SharedState, useSharedState } from "src/common/SharedStateProvider";
import { ErrorBanner } from "src/components/ErrorBanner";
import { Loader } from "src/components/Loader";
import { useChart, usePaginatedItems } from "src/hooks/queries";
import { ItemCard } from "./ItemCard";

const MIN_ITEM_HEIGHT = 114;

function ItemContainer(props: ChakraProps & Partial<ItemProps>) {
  return <Box px={2} pt={2} _last={{ pb: 2 }} {...props} />;
}

export type ChartPageProps = { chart: Chart };

export default function ChartPage({ chart }: ChartPageProps) {
  const [lastTopMostIndex, setNextTopMostIndex] = useSharedState(`${ChartPage.name}-${chart}`) as SharedState<number>;

  // VirtuosoProps.initialTopMostItemIndex must be a static value
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const topMostIndex = useMemo(() => lastTopMostIndex ?? 0, []);

  const batchSize = useMemo(() => Math.floor(window.innerHeight / MIN_ITEM_HEIGHT), []);

  const initialBatchSize = useMemo(
    () => Math.floor((window.innerHeight * 2) / MIN_ITEM_HEIGHT) + batchSize,
    [batchSize]
  );

  const {
    data: ids,
    error: idsError,
    isLoading: isLoadingIds,
    isError: isIdsError,
    refetch: refetchIds,
  } = useChart(chart);

  const {
    items,
    error: itemsError,
    fetchMore,
    isLoading: isLoadingItems,
    isError: isItemsError,
    refetch: refetchItems,
  } = usePaginatedItems(ids, batchSize, initialBatchSize);

  const containerRef = useRef<HTMLDivElement>(null);
  const renderedItems = useRef([] as ListItem<Item>[]);

  useEffect(() => {
    const onScroll = () => {
      const offsetTop = containerRef.current!.getBoundingClientRect().top + window.scrollY;
      const thresholdOffset = Math.max(window.scrollY - offsetTop, 0);
      const topMostItem = renderedItems.current?.find((item) => item.offset >= thresholdOffset);
      if (topMostItem) setNextTopMostIndex(topMostItem.index);
    };

    const scrollListener = debounce(onScroll, 250);

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  });

  const onItemsRendered = (items: ListItem<Item>[]) => {
    renderedItems.current = items;
  };

  const onRangeChanged = ({ endIndex }: ListRange) => {
    if (!isLoadingItems && items.length - endIndex < batchSize) fetchMore();
  };

  if (isIdsError) return <ErrorBanner error={idsError} onRetry={() => refetchIds()} />;
  if (isItemsError) return <ErrorBanner error={itemsError} onRetry={() => refetchItems()} />;

  return (
    <Virtuoso
      data={items}
      useWindowScroll
      increaseViewportBy={{ top: window.innerHeight / 3, bottom: window.innerHeight }}
      initialTopMostItemIndex={topMostIndex}
      rangeChanged={onRangeChanged}
      itemsRendered={onItemsRendered}
      itemContent={(i, data) => <ItemCard item={data} />}
      components={{
        Item: ItemContainer,
        List: forwardRef((props, ref) => <Box ref={useMergeRefs(ref, containerRef)} {...props} />),
        Footer: () => <Box>{(isLoadingIds || isLoadingItems) && <Loader size="xl" />}</Box>,
      }}
    />
  );
}
