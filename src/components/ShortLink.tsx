import { ChakraProps, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import { baseURL } from "src/util";

export type ShortLinkProps = ChakraProps & {
  href: string;
};

export function ShortLink({ href, ...props }: ShortLinkProps) {
  const color = useColorModeValue("gray.700", "gray.300");
  return (
    <Link
      color={color}
      fontSize="lg"
      href={href}
      isExternal
      display="flex"
      alignItems="center"
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <Icon as={FaLink} me={2} />
      {baseURL(href)}
    </Link>
  );
}
