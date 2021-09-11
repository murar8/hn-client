import { Box } from "@chakra-ui/layout";
import { Virtuoso } from "react-virtuoso";
import { Chart } from "src/api";
import { ErrorBanner } from "src/components/ErrorBanner";
import { Loader } from "src/components/Loader";
import { ItemCard } from "./ItemCard";
import { useChart } from "./useChart";

const BATCH_SIZE = 10;
export const INITIAL_BATCH_SIZE = 20;

export type ChartPageProps = {
  chart: Chart;
};

export function ChartPage({ chart }: ChartPageProps) {
  const { items, error, loading, loadMore } = useChart(chart, BATCH_SIZE, INITIAL_BATCH_SIZE);

  // const Footer = useCallback(() => (loading ? <Loader size="xl" p={4} pb={8} /> : <Box pb={4} />), [loading]);

  if (error) return <ErrorBanner p={4} error={error} />;

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

export function BestChartPage() {
  return <ChartPage chart="best" />;
}

export function NewChartPage() {
  return <ChartPage chart="new" />;
}

export function TopChartPage() {
  return <ChartPage chart="top" />;
}

export function AskChartPage() {
  return <ChartPage chart="ask" />;
}

export function ShowChartPage() {
  return <ChartPage chart="show" />;
}

export function JobChartPage() {
  return <ChartPage chart="job" />;
}
