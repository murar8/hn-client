import { Button, Flex, Grid, Heading, Icon, IconButton, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FaAngleDown, FaExclamationTriangle } from "react-icons/fa";
import { useRouteMatch } from "react-router-dom";
import { fetchItem, fetchItems, Item } from "src/api";
import { ErrorBanner } from "src/components/ErrorBanner";
import { ItemData } from "src/components/ItemData";
import { Loader } from "src/components/Loader";
import { ShortLink } from "src/components/ShortLink";
import { numberToUnitString, rainbow } from "src/util";
import useSWR from "swr";

const INITIAL_BATCH_SIZE = 20;
const LOAD_BATCH_SIZE = 10;

function Comment({ text, id, kids, ...item }: Item) {
  const baseColor = useColorModeValue("blackAlpha", "whiteAlpha");
  const [showChildren, setShowChildren] = useState(false);

  return (
    <VStack spacing={4} alignItems="stretch" _notFirst={{ pt: 8 }} ps={4} borderColor={`${baseColor}.100`}>
      <Flex justifyContent="space-between" alignItems="center" pe={4}>
        <ItemData {...item} />
        {kids?.length && (
          <IconButton
            variant="ghost"
            aria-label="Show children"
            icon={
              <Icon
                as={FaAngleDown}
                rotate="90deg"
                transform={showChildren ? undefined : "rotate(180deg)"}
                transition="transform 0.2s"
              />
            }
            onClick={() => setShowChildren(!showChildren)}
          />
        )}
      </Flex>
      {text && <Text fontSize="lg" overflow="hidden" dangerouslySetInnerHTML={{ __html: text }} pe={4} />}
      {showChildren && kids?.length && <CommentTree ids={kids!} nested />}
    </VStack>
  );
}

type CommentTreeProps = {
  ids: number[];
  nested?: boolean;
};

function CommentTree({ ids, nested = false }: CommentTreeProps) {
  const [limit, setLimit] = useState(INITIAL_BATCH_SIZE);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<any | undefined>(undefined);
  const baseColor = useColorModeValue("blackAlpha", "whiteAlpha");

  useEffect(() => {
    fetchItems(ids.slice(items.length, limit))
      .then((data) => {
        const filtered = data.filter((item) => item.text?.length);
        setItems([...items, ...filtered]);
      })
      .catch(setError);
  }, [limit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex
      flexDir="column"
      alignItems="stretch"
      w="100%"
      py={nested ? undefined : 4}
      bgColor={nested ? undefined : `${baseColor}.100`}
      borderColor={nested ? undefined : `${baseColor}.500`}
      borderRadius={nested ? undefined : "lg"}
      borderWidth={nested ? undefined : "1px"}
      borderStartWidth="1px"
    >
      {items.length > 0 && items.map((item) => <Comment key={item.id} {...item} />)}
      {items.length < ids.length && (
        <Button
          isLoading={!error && items.length < limit}
          mx={4}
          mt={items.length ? 8 : 0}
          onClick={() => setLimit(limit + LOAD_BATCH_SIZE)}
        >
          Show More
        </Button>
      )}
    </Flex>
  );
}

type PollOptsProps = {
  ids: number[];
};

function PollOpts({ ids }: PollOptsProps) {
  let { data, error } = useSWR(ids, () => fetchItems(ids));

  let filtered = useMemo(
    () =>
      !data
        ? undefined
        : data
            .filter((item) => item.text && item.score !== undefined)
            .sort((a, b) => b.score! - a.score!)
            .map(({ score, ...item }) => ({ score: numberToUnitString(score!), ...item })),
    [data]
  );

  if (error) return <Icon as={FaExclamationTriangle} boxSize={8} />;
  if (!data) return <Loader size="lg" />;

  return (
    <Grid gap={2} templateColumns="auto auto" alignItems="baseline">
      {filtered!.map(({ id, score, text }, i) => (
        <Fragment key={id}>
          <Text
            p={1}
            fontSize="2xl"
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
            borderColor={rainbow(filtered!.length, i)}
          >
            {score}
          </Text>
          {text && <Text fontSize="lg">{text}</Text>}
        </Fragment>
      ))}
    </Grid>
  );
}

export function PostPage() {
  let { id } = useRouteMatch<{ id: string }>("/post/:id")!.params;
  let { data, error } = useSWR(id, () => fetchItem(parseInt(id)));

  if (error) return <ErrorBanner error={error.message ?? error.toString()} />;
  if (!data) return <Loader size="xl" p={4} />;

  const { title, url, text, parts, kids, ...item } = data;

  return (
    <VStack spacing={8} my={4} py={4} alignItems="flex-start">
      {title && <Heading size="md">{title}</Heading>}
      {url && <ShortLink href={url} />}
      {text && <Text fontSize="lg" dangerouslySetInnerHTML={{ __html: text }} />}
      {parts && <PollOpts ids={parts} />}
      <ItemData {...item} />
      {kids && <CommentTree ids={kids} />}
    </VStack>
  );
}
