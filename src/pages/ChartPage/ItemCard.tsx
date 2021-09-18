import { ChakraProps, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import { ShortLink } from "src/components/ShortLink";

export type ItemCardProps = ChakraProps & {
  item: Item;
};

export function ItemCard({ item: { title, url, id, ...item }, _hover, ...props }: ItemCardProps) {
  const history = useHistory();
  const borderColor = useColorModeValue("gray.200", "gray.500");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const hoverColor = useColorModeValue("gray.100", "gray.600");

  return (
    <VStack
      spacing={4}
      borderRadius="lg"
      overflow="hidden"
      alignItems="flex-start"
      cursor="pointer"
      borderWidth="1px"
      borderColor={borderColor}
      bgColor={bgColor}
      _hover={{ bgColor: hoverColor, ..._hover }}
      onClick={() => history.push(`/post/${id}`)}
      p={4}
      {...props}
    >
      {title && <Heading size="md">{title}</Heading>}
      {url && <ShortLink href={url} onClick={(e) => e.stopPropagation()} />}
      <ItemData variant="outline" {...item} />
    </VStack>
  );
}
