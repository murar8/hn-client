import { Box } from "@chakra-ui/layout";
import { ChakraProps } from "@chakra-ui/system";
import { useState } from "react";
import { ItemProps, ListItem, ListRange, ScrollerProps, Virtuoso } from "react-virtuoso";
import { Chart, Item } from "src/api";
import { SharedState, useSharedState } from "src/common/SharedStateProvider";
import { ErrorBanner } from "src/components/ErrorBanner";
import { Loader } from "src/components/Loader";
import { useChart, usePaginatedItems } from "src/hooks/queries";
import { ItemCard } from "./ItemCard";

const MIN_ITEM_HEIGHT = 114;

function Scroller(props: ScrollerProps) {
  return <Box mt={2} {...props} />;
}

function VirtuosoItem(props: ChakraProps & Partial<ItemProps>) {
  return <Box px={2} pb={2} {...props} />;
}

type FooterProps = { isLoading: boolean };

function Footer({ isLoading }: FooterProps) {
  return <Box>{isLoading && <Loader size="xl" />}</Box>;
}

export type ChartPageProps = { chart: Chart };

export default function ChartPage({ chart }: ChartPageProps) {
  const [lastTopMostIndex, setTopMostIndex] = useSharedState(`${ChartPage.name}-${chart}`) as SharedState<number>;
  const [initialTopMostIndex] = useState(lastTopMostIndex ?? 0);
  const [batchSize] = useState(window.innerHeight / MIN_ITEM_HEIGHT);
  const [initialBatchSize] = useState((window.innerHeight * 2) / MIN_ITEM_HEIGHT + batchSize);

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

  if (isIdsError) return <ErrorBanner error={idsError} onRetry={() => refetchIds()} />;
  if (isItemsError) return <ErrorBanner error={itemsError} onRetry={() => refetchItems()} />;

  const overscanTop = window.innerHeight / 3;
  const overscanBottom = window.innerHeight;

  const onRangeChanged = ({ endIndex }: ListRange) => {
    if (!isLoadingItems && items.length - endIndex < batchSize) fetchMore();
  };

  const onItemsRendered = (items: ListItem<Item>[]) => {
    if (!items.length) return;
    const thresholdOffset = items[0].offset + overscanTop;
    const topMostItem = items.find((item) => item.offset >= thresholdOffset);
    if (topMostItem) setTopMostIndex(topMostItem.index);
  };

  return (
    <Virtuoso
      useWindowScroll
      increaseViewportBy={{ top: overscanTop, bottom: overscanBottom }}
      initialTopMostItemIndex={initialTopMostIndex}
      rangeChanged={onRangeChanged}
      itemsRendered={onItemsRendered}
      data={items}
      itemContent={(_, data) => <ItemCard item={data} />}
      components={{
        Item: VirtuosoItem,
        Scroller,
        Footer: () => <Footer isLoading={isLoadingIds || isLoadingItems} />,
      }}
    />
  );
}
