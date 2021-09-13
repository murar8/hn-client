import { useQuery } from "react-query";
import { Chart, fetchChart } from "src/api";
import { usePaginatedItems } from "src/hooks/queries";

export function useChart(chart: Chart, pageSize: number, initialPageSize = pageSize) {
  const {
    data: ids,
    error: idsError,
    isLoading: isLoadingIds,
    isError: isIdsError,
  } = useQuery(["chart", chart], () => fetchChart(chart));

  const {
    items,
    error: itemsError,
    fetchMore,
    hasMore,
    isLoading: isLoadingItems,
    isError: isItemsError,
  } = usePaginatedItems(ids, pageSize, initialPageSize);

  return {
    items,
    error: idsError || itemsError,
    fetchMore,
    hasMore,
    isLoading: isLoadingIds || isLoadingItems,
    isError: isIdsError || isItemsError,
  };
}
