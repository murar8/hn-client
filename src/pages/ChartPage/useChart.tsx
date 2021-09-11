import { useEffect, useMemo } from "react";
import { Chart, fetchChart, fetchItem } from "src/api";
import useSWR from "swr";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export function useChart(chart: Chart, batchSize: number, initialBatchSize: number = batchSize) {
  const { data: ids, error: chartError } = useSWR(chart, () => fetchChart(chart));

  const getKey = (index: number) => (index < ids!.length ? [ids![index]] : null);
  const fetcher = (id: number) => fetchItem(id);
  const config: SWRInfiniteConfiguration = { initialSize: initialBatchSize, fallbackData: [] };
  const { data: items, error: itemsError, size, setSize } = useSWRInfinite(getKey, fetcher, config);

  useEffect(
    () => {
      if (ids && ids?.length < initialBatchSize && size === initialBatchSize) setSize(ids.length);
    },
    [ids] /* eslint-disable-line react-hooks/exhaustive-deps */
  );

  const error = useMemo(() => chartError || itemsError, [chartError, itemsError]);
  const loading = useMemo(() => !error && (!items || items[size - 1] === undefined), [error, items, size]);

  const loadMore = () => {
    const maxSize = ids?.length ?? 0;
    if (size < maxSize) setSize(Math.min(size + batchSize, maxSize));
  };

  return { items, error, loading, loadMore };
}
