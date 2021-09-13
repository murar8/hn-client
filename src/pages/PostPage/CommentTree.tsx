import { Button, Flex, HStack, Icon, IconButton, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown, FaExclamationTriangle } from "react-icons/fa";
import { Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import { usePaginatedItems } from "src/hooks/queries";

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 5;

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
  const { items, error, isLoading, fetchMore } = usePaginatedItems(
    ids,
    nested ? BATCH_SIZE : INITIAL_BATCH_SIZE,
    BATCH_SIZE
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
      {error ? (
        <HStack spacing={4} alignItems="center">
          <Icon as={FaExclamationTriangle} ps={4} boxSize={12} />
          <Text fontSize="lg">An error occured</Text>
        </HStack>
      ) : (
        <>
          {items && items.map((item) => (item.text?.length ?? 0) > 0 && <Comment key={item.id} {...item} />)}
          {(items?.length ?? 0) < ids.length && (
            <Button isLoading={isLoading} onClick={() => fetchMore()}>
              Show More
            </Button>
          )}
        </>
      )}
    </VStack>
  );
}
