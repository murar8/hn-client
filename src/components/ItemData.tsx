import {
  Flex,
  SystemProps,
  Tag as ChakraTag,
  TagLabel,
  TagLeftIcon,
  TagProps as ChakraTagProps,
} from "@chakra-ui/react";
import { ComponentType, useMemo } from "react";
import { FaRegClock, FaRegCommentAlt, FaRegThumbsUp, FaRegUser } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Item } from "src/api";
import { numberToUnitString, timestampToLocaleString } from "src/util";

type TagProps = Omit<ChakraTagProps, "children"> & {
  icon: ComponentType;
  label: string;
};

function Tag({ icon, label, variant, ...props }: TagProps) {
  return (
    <ChakraTag size="lg" variant={variant} {...props}>
      <TagLeftIcon as={icon} />
      <TagLabel overflow="visible">{label}</TagLabel>
    </ChakraTag>
  );
}

export type ItemDataProps = SystemProps &
  Pick<Item, "by" | "time" | "score" | "descendants"> &
  Pick<ChakraTagProps, "variant">;

export function ItemData({ variant, by, time, score, descendants, ...props }: ItemDataProps) {
  const timeLabel = useMemo(() => (time ? timestampToLocaleString(time) : undefined), [time]);
  const scoreLabel = useMemo(() => (score ? numberToUnitString(score) : undefined), [score]);
  const descendantsLabel = useMemo(() => (descendants ? numberToUnitString(descendants) : undefined), [descendants]);

  const tags: [IconType, string | undefined][] = [
    [FaRegUser, by],
    [FaRegClock, timeLabel],
    [FaRegThumbsUp, scoreLabel],
    [FaRegCommentAlt, descendantsLabel],
  ];

  return (
    <Flex sx={{ gap: "16px" }} flexWrap="wrap" {...props}>
      {tags.map(([icon, label], i) => label && <Tag key={i} variant={variant} icon={icon} label={label} />)}
    </Flex>
  );
}
