import { Box, ChakraProps, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Item } from "src/api";
import { ItemData } from "src/components/ItemData";
import { ShortLink } from "src/components/ShortLink";

export function Card(props: Parameters<typeof VStack>["0"]) {
  const borderColor = useColorModeValue("gray.200", "gray.500");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  return <Box borderColor={borderColor} bgColor={bgColor} borderWidth="1px" borderRadius="lg" {...props} />;
}

export type ItemCardProps = ChakraProps & {
  item: Item;
};

export function ItemCard({ item: { title, url, id, ...item }, _hover, ...props }: ItemCardProps) {
  const history = useHistory();
  const hoverColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Card
      as={VStack}
      spacing={4}
      overflow="hidden"
      alignItems="flex-start"
      cursor="pointer"
      _hover={{ bgColor: hoverColor, ..._hover }}
      onClick={() => history.push(`/post/${id}`)}
      p={4}
      {...props}
    >
      {title && <Heading size="md">{title}</Heading>}
      {url && <ShortLink href={url} onClick={(e) => e.stopPropagation()} />}
      <ItemData variant="outline" {...item} />
    </Card>
  );
}
