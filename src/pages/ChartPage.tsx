import { Box, Center, Heading, Spinner, useColorModeValue, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { Chart, fetchChart, fetchItems, Item } from "src/api";
import { ErrorBanner } from "src/components/ErrorBanner";
import { ItemData } from "src/components/ItemData";
import { ShortLink } from "src/components/ShortLink";

const INITIAL_BATCH_SIZE = 20;
const LOAD_BATCH_SIZE = 10;

function Loading() {
  return (
    <Center p={4}>
      <Spinner size="xl" />
    </Center>
  );
}

function Content({ title, text, url, id, ...item }: Item) {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const history = useHistory();

  return (
    <VStack
      spacing={4}
      m={4}
      p={4}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      alignItems="flex-start"
      bgColor={bgColor}
      onClick={() => history.push(`/post/${id}`)}
    >
      {title && <Heading size="md">{title}</Heading>}
      {url && <ShortLink href={url} />}
      <ItemData {...item} />
    </VStack>
  );
}

export type ChartPageProps = {
  chart: Chart;
};

export function ChartPage({ chart }: ChartPageProps) {
  const [ids, setIds] = useState<number[]>([]);
  const [rows, setRows] = useState<Item[]>([]);
  const [error, setError] = useState<any | undefined>(undefined);

  const Header = useCallback(
    () => (error ? <ErrorBanner p={4} error={error.message ?? error.toString()} /> : <></>),
    [error]
  );

  const Footer = useCallback(
    () => ((!ids.length && !error) || ids.length > rows.length ? <Loading /> : <Box h={1} />),
    [ids.length, rows.length, error]
  );

  const loadItems = useCallback(
    (lastIndex: number, batchSize: number) => {
      fetchItems(ids.slice(lastIndex, lastIndex + batchSize))
        .then((items) => setRows([...rows, ...items]))
        .catch(setError);
    },
    [ids, rows]
  );

  useEffect(() => {
    fetchChart(chart)
      .then((ids) => setIds(ids))
      .catch(setError);
  }, [chart]);

  useEffect(() => {
    if (ids.length && !rows.length) loadItems(0, INITIAL_BATCH_SIZE);
  }, [ids.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box maxW="6xl">
      <Virtuoso
        useWindowScroll
        data={rows}
        endReached={(lastIndex) => loadItems(lastIndex, LOAD_BATCH_SIZE)}
        overscan={1200}
        components={{ Header, Footer }}
        itemContent={(_, data) => <Content {...data} />}
      />
    </Box>
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
