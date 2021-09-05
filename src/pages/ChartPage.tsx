import { Box, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { Chart, fetchChart, fetchItems, Item } from "src/api";
import { ErrorBanner } from "src/components/ErrorBanner";
import { ItemData } from "src/components/ItemData";
import { Loader } from "src/components/Loader";
import { ShortLink } from "src/components/ShortLink";

const INITIAL_BATCH_SIZE = 20;
const LOAD_BATCH_SIZE = 10;

function Content({ title, text, url, id, ...item }: Item) {
  const history = useHistory();
  const baseColor = useColorModeValue("blackAlpha", "whiteAlpha");

  return (
    <VStack
      as={Link}
      to={`/post/${id}`}
      spacing={4}
      my={4}
      p={4}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      alignItems="flex-start"
      borderWidth="1px"
      borderColor={`${baseColor}.500`}
      bgColor={`${baseColor}.100`}
      _hover={{ bgColor: `${baseColor}.300` }}
    >
      {title && <Heading size="md">{title}</Heading>}
      {url && <ShortLink href={url} />}
      <ItemData variant="outline" {...item} />
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

  const Header = useCallback(() => (error ? <ErrorBanner p={4} error={error} /> : <></>), [error]);

  const Footer = useCallback(
    () => ((!ids.length && !error) || ids.length > rows.length ? <Loader size="xl" p={4} /> : <Box h={1} />),
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
    <Virtuoso
      useWindowScroll
      data={rows}
      endReached={(lastIndex) => loadItems(lastIndex, LOAD_BATCH_SIZE)}
      overscan={1200}
      components={{ Header, Footer }}
      itemContent={(_, data) => <Content {...data} />}
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
