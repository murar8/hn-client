import { Box } from "@chakra-ui/layout";
import { ChakraProps } from "@chakra-ui/system";
import { useState } from "react";
import { ItemProps, ListRange, ScrollerProps, Virtuoso } from "react-virtuoso";
import { Chart } from "src/api";
import { SharedState, useSharedState } from "src/common/SharedStateProvider";
import { ErrorBanner } from "src/components/ErrorBanner";
import { Loader } from "src/components/Loader";
import { useChart, usePaginatedItems } from "src/hooks/queries";
import { ItemCard } from "./ItemCard";

const BUFFER_SIZE = 10;
const INITIAL_BATCH_SIZE = 20;
const BATCH_SIZE = 5;

function Scroller(props: ScrollerProps) {
  return <Box mt={2} {...props} />;
}

function Item(props: ChakraProps & Partial<ItemProps>) {
  return <Box px={2} pb={2} {...props} />;
}

type FooterProps = { isLoading: boolean };

function Footer({ isLoading, ...props }: FooterProps) {
  return <Box>{isLoading && <Loader size="xl" />}</Box>;
}

export type ChartPageProps = { chart: Chart };

export default function ChartPage({ chart }: ChartPageProps) {
  const [index, setIndex] = useSharedState(`${ChartPage.name}-${chart}`) as SharedState<number>;
  const [initialTopMostItemIndex] = useState(index ?? 0);

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
  } = usePaginatedItems(ids, BATCH_SIZE, INITIAL_BATCH_SIZE);

  if (isIdsError) return <ErrorBanner error={idsError} onRetry={() => refetchIds()} />;
  if (isItemsError) return <ErrorBanner error={itemsError} onRetry={() => refetchItems()} />;

  const onRangeChanged = ({ startIndex, endIndex }: ListRange) => {
    setIndex(startIndex);
    if (!isLoadingItems && items.length - endIndex < BUFFER_SIZE) fetchMore();
  };

  return (
    <Virtuoso
      useWindowScroll
      initialTopMostItemIndex={initialTopMostItemIndex}
      rangeChanged={onRangeChanged}
      data={items}
      itemContent={(_, data) => <ItemCard item={data} />}
      components={{
        Item,
        Scroller,
        Footer: () => <Footer isLoading={isLoadingIds || isLoadingItems} />,
      }}
    />
  );
}
