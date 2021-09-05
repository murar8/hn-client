import { Flex, SystemProps, Tag as ChakraTag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { ComponentType, useMemo } from "react";
import { FaRegClock, FaRegCommentAlt, FaRegThumbsUp, FaRegUser } from "react-icons/fa";
import { Item } from "src/api";
import { timestampToLocaleString } from "src/util";

type TagProps = {
  icon: ComponentType;
  label: string;
};

function Tag({ icon, label }: TagProps) {
  return (
    <ChakraTag size="lg" variant="outline">
      <TagLeftIcon as={icon} />
      <TagLabel overflow="visible">{label}</TagLabel>
    </ChakraTag>
  );
}

export type ItemDataProps = Pick<Item, "by" | "time" | "score" | "descendants">;

export function ItemData({ by, time, score, descendants, ...props }: ItemDataProps & SystemProps) {
  const date = useMemo(() => (time ? timestampToLocaleString(time) : undefined), [time]);

  return (
    <Flex sx={{ gap: "8px" }} flexWrap="wrap" {...props}>
      {by && <Tag icon={FaRegUser} label={by} />}
      {date && <Tag icon={FaRegClock} label={date} />}
      {score !== undefined && <Tag icon={FaRegThumbsUp} label={score.toString()} />}
      {descendants !== undefined && <Tag icon={FaRegCommentAlt} label={descendants.toString()} />}
    </Flex>
  );
}
