import { useMemo } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { Chart, fetchChart, fetchItem, fetchItems, Item } from "src/api";

export function useChart(chart: Chart) {
  return useQuery(["chart", chart], () => fetchChart(chart));
}

export function useItem(id: number) {
  return useQuery(["item", id], () => fetchItem(id));
}

export function useItems(ids: number[]) {
  return useQuery(["items", ids], () => fetchItems(ids));
}

export type UsePaginatedItemsOptions = {
  pageSize: number;
  initialPageSize?: number;
  enabled?: boolean;
};

export function usePaginatedItems(ids: number[] | undefined, pageSize: number, initialPageSize = pageSize) {
  const enabled = Boolean(ids);

  const getNextPageParam = (_: Item[], data: Item[][]) => {
    const length = data.length ? initialPageSize + (data.length - 1) * pageSize : 0;
    return length < ids!.length ? [length, length + pageSize] : undefined;
  };

  const { data, fetchNextPage, isLoading, isFetchingNextPage, isError, error, hasNextPage, refetch } = useInfiniteQuery(
    ["paginated_items", ids],
    ({ pageParam = [0, initialPageSize] }) => fetchItems(ids!.slice(...pageParam)),
    { getNextPageParam, enabled }
  );

  const items = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);

  return {
    items,
    error,
    isLoading: isLoading || isFetchingNextPage,
    isError,
    refetch,
    fetchMore: () => fetchNextPage(),
    hasMore: hasNextPage,
  };
}
