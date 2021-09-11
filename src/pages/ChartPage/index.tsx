import { Box } from "@chakra-ui/layout";
import { useErrorHandler } from "react-error-boundary";
import { Virtuoso } from "react-virtuoso";
import { Chart } from "src/api";
import { Loader } from "src/components/Loader";
import { ItemCard } from "./ItemCard";
import { useChart } from "./useChart";

const BATCH_SIZE = 10;
export const INITIAL_BATCH_SIZE = 20;

export type ChartPageProps = {
  chart: Chart;
};

export default function ChartPage({ chart }: ChartPageProps) {
  const { items, error, loading, loadMore } = useChart(chart, BATCH_SIZE, INITIAL_BATCH_SIZE);
  useErrorHandler(error);

  return (
    <Virtuoso
      useWindowScroll
      data={items}
      endReached={loadMore}
      overscan={600}
      itemContent={(_, data) => <ItemCard item={data} />}
      components={{
        Footer: () => <Box>{loading && <Loader size="xl" p={4} />}</Box>,
        Item: (props) => <Box px={2} pt={2} _last={{ pb: 2 }} {...props} />,
      }}
    />
  );
}
