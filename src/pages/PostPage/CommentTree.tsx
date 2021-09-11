import { Button, Flex, HStack, Icon, IconButton, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaAngleDown, FaExclamationTriangle } from "react-icons/fa";
import { fetchItem, Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import useSWRInfinite from "swr/infinite";

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 5;

function useComments(ids: number[], batchSize: number, initialBatchSize: number = batchSize) {
  const getKey = (index: number) => [ids[index]];
  const fetcher = async (id: number) => fetchItem(id);
  const config = { initialSize: Math.min(ids.length, initialBatchSize) };
  const { data: items, error, size, setSize } = useSWRInfinite(getKey, fetcher, config);

  const loading = useMemo(() => !error && (!items || items[size - 1] === undefined), [error, items, size]);

  const loadMore = () => {
    if (size < ids.length) setSize(Math.min(size + batchSize, ids.length));
  };

  return { items, error, loading, loadMore };
}

function Comment({ text, id, kids, ...item }: Item) {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <VStack spacing={2} alignItems="stretch">
      <Flex justifyContent="space-between" alignItems="center">
        <ItemData variant="ghost" {...item} />
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
      {text && <Text fontSize="lg" overflow="hidden" dangerouslySetInnerHTML={{ __html: text }} />}
      {showChildren && kids?.length && <CommentTree ids={kids!} nested />}
    </VStack>
  );
}

export type CommentTreeProps = {
  ids: number[];
  nested?: boolean;
};

export function CommentTree({ ids, nested = false }: CommentTreeProps) {
  const { items, error, loading, loadMore } = useComments(ids, nested ? BATCH_SIZE : INITIAL_BATCH_SIZE, BATCH_SIZE);
  const borderColor = useColorModeValue("gray.200", "gray.500");

  return (
    <VStack
      spacing={12}
      alignItems="stretch"
      w="100%"
      pt={nested ? 2 : 0}
      ps={nested ? 4 : 0}
      borderStartWidth={nested ? "1px" : undefined}
      borderColor={borderColor}
    >
      {error ? (
        <HStack spacing={4} alignItems="center">
          <Icon as={FaExclamationTriangle} ps={4} boxSize={12} />
          <Text fontSize="lg">An error occured</Text>
        </HStack>
      ) : (
        <>
          {items && items.map((item) => (item.text?.length ?? 0) > 0 && <Comment key={item.id} {...item} />)}
          {(items?.length ?? 0) < ids.length && (
            <Button isLoading={loading} onClick={() => loadMore()}>
              Show More
            </Button>
          )}
        </>
      )}
    </VStack>
  );
}
