import { ChakraProps, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import { ShortLink } from "src/components/ShortLink";

export type ItemCardProps = ChakraProps & {
  item: Item;
};

export function ItemCard({ item: { title, url, id, ...item }, _hover, _active, ...props }: ItemCardProps) {
  const history = useHistory();
  const borderColor = useColorModeValue("gray.200", "gray.500");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const hoverColor = useColorModeValue("gray.100", "gray.600");
  const activeColor = useColorModeValue("gray.200", "gray.500");

  return (
    <VStack
      borderColor={borderColor}
      bgColor={bgColor}
      borderWidth="1px"
      borderRadius="lg"
      spacing={4}
      overflow="hidden"
      alignItems="flex-start"
      cursor="pointer"
      p={4}
      _hover={{ bgColor: hoverColor, ..._hover }}
      _active={{ bgColor: activeColor, ..._active }}
      sx={{ WebkitTapHighlightColor: "transparent" }}
      as={Link}
      to={`/post/${id}`}
      {...props}
    >
      {title && <Heading size="md">{title}</Heading>}
      {url && <ShortLink href={url} onClick={(e) => e.stopPropagation()} />}
      <ItemData variant="outline" {...item} />
    </VStack>
  );
}
