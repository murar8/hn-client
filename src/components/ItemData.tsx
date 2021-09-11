import { ChakraProps, Flex, TagProps as ChakraTagProps } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaRegClock, FaRegCommentAlt, FaRegThumbsUp, FaRegUser } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Item } from "src/api";
import { numberToUnitString, timestampToLocaleString } from "src/util";
import { IconTag } from "./IconTag";

export type ItemDataProps = ChakraProps &
  Pick<Item, "by" | "time" | "score" | "descendants"> &
  Pick<ChakraTagProps, "variant">;

export function ItemData({ variant, by, time, score, descendants, sx, ...props }: ItemDataProps) {
  const timeLabel = useMemo(() => (time ? timestampToLocaleString(time) : undefined), [time]);
  const scoreLabel = useMemo(() => (score ? numberToUnitString(score) : undefined), [score]);
  const descendantsLabel = useMemo(() => (descendants ? numberToUnitString(descendants) : undefined), [descendants]);

  const tags: [IconType, string | undefined, string][] = [
    [FaRegUser, by, "blue"],
    [FaRegClock, timeLabel, "purple"],
    [FaRegThumbsUp, scoreLabel, "green"],
    [FaRegCommentAlt, descendantsLabel, "teal"],
  ];

  return (
    <Flex sx={{ gap: "16px", ...sx }} flexWrap="wrap" {...props}>
      {tags.map(
        ([Icon, label, colorScheme], i) =>
          label && <IconTag key={i} variant={variant} Icon={Icon} label={label} colorScheme={colorScheme} />
      )}
    </Flex>
  );
}
