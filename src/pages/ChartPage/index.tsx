import { Box } from "@chakra-ui/layout";
import { Virtuoso } from "react-virtuoso";
import { Chart } from "src/api";
import { ErrorBanner } from "src/components/ErrorBanner";
import { Loader } from "src/components/Loader";
import { useChart, usePaginatedItems } from "src/hooks/queries";
import { ItemCard } from "./ItemCard";

const BATCH_SIZE = 10;
export const INITIAL_BATCH_SIZE = 20;

export type ChartPageProps = {
  chart: Chart;
};

export default function ChartPage({ chart }: ChartPageProps) {
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

  return (
    <Virtuoso
      useWindowScroll
      data={items}
      endReached={() => fetchMore()}
      overscan={600}
      itemContent={(_, data) => <ItemCard item={data} />}
      components={{
        Footer: () => <Box>{(isLoadingIds || isLoadingItems) && <Loader size="xl" />}</Box>,
        Item: (props) => <Box px={2} pt={2} _last={{ pb: 2 }} {...props} />,
      }}
    />
  );
}
