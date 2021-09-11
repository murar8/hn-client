import { Tag as ChakraTag, TagLabel, TagLeftIcon, TagProps as ChakraTagProps } from "@chakra-ui/react";
import { ComponentType } from "react";

export type IconTagProps = Omit<ChakraTagProps, "children"> & {
  Icon?: ComponentType;
  label?: string;
};

export function IconTag({ Icon, label, variant, ...props }: IconTagProps) {
  return (
    <ChakraTag size="lg" variant={variant} {...props}>
      {Icon && <TagLeftIcon as={Icon} />}
      {label && <TagLabel overflow="visible">{label}</TagLabel>}
    </ChakraTag>
  );
}
