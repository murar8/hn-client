import { Button, Icon, Spinner, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { forwardRef, LegacyRef, useState } from "react";
import { IconBaseProps } from "react-icons";
import { FaAngleDown, FaExclamationTriangle } from "react-icons/fa";
import { Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import { usePaginatedItems } from "src/hooks/queries";

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 5;

// See https://github.com/react-icons/react-icons/issues/336
const AngleDownIcon = forwardRef((props: IconBaseProps, ref: LegacyRef<HTMLSpanElement>) => (
  <span ref={ref}>
    <FaAngleDown {...props} />
  </span>
));

const MotionIcon = motion(Icon);

function Comment({ text, id, kids, by, time, score, descendants, dead }: Item) {
  const [showChildren, setShowChildren] = useState(false);
  const childrenTextColor = useColorModeValue("gray.500", "gray.400");
  const linkTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <VStack spacing={2} alignItems="stretch">
      <ItemData variant="ghost" by={by} time={time} score={score} descendants={descendants} dead={dead} />
      {text && (
        <Text
          fontSize="lg"
          sx={{ "& > *": { overflowY: "scroll" }, "& a": { textColor: linkTextColor } }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      {kids?.length && (
        <Button
          variant="ghost"
          color={childrenTextColor}
          justifyContent="start"
          paddingLeft={1}
          leftIcon={
            <MotionIcon
              as={AngleDownIcon}
              rotate="90deg"
              animate={showChildren ? "open" : "closed"}
              variants={{ open: { rotate: 0 }, closed: { rotate: 180 } }}
            />
          }
          onClick={() => setShowChildren(!showChildren)}
        >
          {`${kids.length} ${kids.length === 1 ? "child" : "children"}`}
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
          {hasMore ? <Button onClick={() => fetchMore()}>Load More</Button> : isLoading && <Spinner />}
        </>
      )}
    </VStack>
  );
}
