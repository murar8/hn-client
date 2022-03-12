import { Box, Button, Flex, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { forwardRef, LegacyRef, useRef, useState } from "react";
import { IconBaseProps } from "react-icons";
import { FaAngleDown, FaExclamationTriangle } from "react-icons/fa";
import { Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import { usePaginatedItems } from "src/hooks/queries";

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 5;

// See https://github.com/react-icons/react-icons/issues/336
const AngleDownIcon = forwardRef((props: IconBaseProps, ref: LegacyRef<HTMLSpanElement>) => (
  <span ref={ref} style={{ display: "inline-flex", alignItems: "center" }}>
    <FaAngleDown {...props} />
  </span>
));

const MotionIcon = motion(Icon);

function Comment({ text, id, kids, by, time, score, descendants, dead }: Item) {
  const [showChildren, setShowChildren] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const childrenTextColor = useColorModeValue("gray.500", "gray.400");
  const linkTextColor = useColorModeValue("gray.600", "gray.400");

  const onHide = () => {
    ref.current?.scrollIntoView();
    setShowChildren(false);
  };

  return (
    <VStack ref={ref} spacing={2} alignItems="stretch" _notFirst={{ marginTop: 8 }} data-testid={`comment-${id}`}>
      <ItemData variant="ghost" by={by} time={time} score={score} descendants={descendants} dead={dead} />
      {text && (
        <Text
          fontSize="lg"
          sx={{ "& > *": { overflowX: "auto" }, "& a": { textColor: linkTextColor } }}
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
              animate={showChildren ? "open" : "closed"}
              variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
            />
          }
          onClick={() => setShowChildren(!showChildren)}
        >
          {`${kids.length} ${kids.length === 1 ? "child" : "children"}`}
        </Button>
      )}
      {showChildren && kids?.length && <CommentTree ids={kids!} nested hideSelf={onHide} />}
    </VStack>
  );
}

export type CommentTreeProps = {
  ids: number[];
  nested?: boolean;
  hideSelf?: () => void;
};

export function CommentTree({ ids, nested = false, hideSelf }: CommentTreeProps) {
  const { items, isError, isLoading, fetchMore, hasMore, refetch } = usePaginatedItems(
    ids,
    BATCH_SIZE,
    nested ? BATCH_SIZE : INITIAL_BATCH_SIZE
  );

  const borderColor = useColorModeValue("gray.200", "gray.500");
  const borderColorActive = useColorModeValue("gray.400", "gray.300");

  return (
    <Box position="relative" width="100%">
      {nested && (
        <Box
          as="span"
          top={0}
          left={-4}
          px={4}
          sx={{ "& > *": { borderColor } }}
          _hover={{ "& > *": { borderColor: borderColorActive } }}
          height="100%"
          position="absolute"
          cursor="pointer"
          onClick={hideSelf}
        >
          <Box borderWidth="1px" borderStartStyle="solid" height="100%" />
        </Box>
      )}
      <Flex direction="column" align="stretch" width="100%" ps={nested ? 4 : 0}>
        {isError ? (
          <Button leftIcon={<Icon as={FaExclamationTriangle} />} onClick={() => refetch()}>
            Retry
          </Button>
        ) : (
          <>
            {items && items.map((item) => (item.text?.length ?? 0) > 0 && <Comment key={item.id} {...item} />)}
            {(hasMore || isLoading) && (
              <Button
                sx={{ "&:not(:first-child)": { marginTop: 8 } }}
                isLoading={isLoading}
                onClick={() => fetchMore()}
              >
                Load More
              </Button>
            )}
          </>
        )}
      </Flex>
    </Box>
  );
}
