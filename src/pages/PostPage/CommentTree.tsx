import { Button, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown, FaExclamationTriangle } from "react-icons/fa";
import { Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import { usePaginatedItems } from "src/hooks/queries";

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 5;

function Comment({ text, id, kids, by, time, score, descendants, dead }: Item) {
  const [showChildren, setShowChildren] = useState(false);
  const childrenTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <VStack spacing={2} alignItems="stretch">
      <ItemData variant="ghost" by={by} time={time} score={score} descendants={descendants} dead={dead} />
      {text && <Text fontSize="lg" overflow="hidden" dangerouslySetInnerHTML={{ __html: text }} />}
      {kids?.length && !showChildren && (
        <Button
          variant="ghost"
          color={childrenTextColor}
          rightIcon={
            <Icon
              as={FaAngleDown}
              rotate="90deg"
              transform={showChildren ? undefined : "rotate(180deg)"}
              transition="transform 0.2s"
            />
          }
          onClick={() => setShowChildren(!showChildren)}
        >
          {kids.length} {kids.length === 1 ? "child" : "children"}
        </Button>
      )}
      {showChildren && kids?.length && <CommentTree ids={kids!} nested />}
    </VStack>
  );
}

export type CommentTreeProps = {
  ids: number[];
  nested?: boolean;
};

export function CommentTree({ ids, nested = false }: CommentTreeProps) {
  const { items, isError, isLoading, fetchMore, hasMore, refetch } = usePaginatedItems(
    ids,
    BATCH_SIZE,
    nested ? BATCH_SIZE : INITIAL_BATCH_SIZE
  );

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
      {isError ? (
        <Button leftIcon={<Icon as={FaExclamationTriangle} />} onClick={() => refetch()}>
          Retry
        </Button>
      ) : (
        <>
          {items && items.map((item) => (item.text?.length ?? 0) > 0 && <Comment key={item.id} {...item} />)}
          {(hasMore || isLoading) && (
            <Button isLoading={isLoading} onClick={() => fetchMore()}>
              Load More
            </Button>
          )}
        </>
      )}
    </VStack>
  );
}
