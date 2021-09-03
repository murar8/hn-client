import { Icon, Link } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import { baseURL } from "src/util";

export type ShortLinkProps = {
  href: string;
};

export function ShortLink({ href }: ShortLinkProps) {
  return (
    <Link
      color="grey"
      fontSize="lg"
      href={href}
      isExternal
      display="flex"
      alignItems="center"
      onClick={(e) => e.stopPropagation()}
    >
      <Icon as={FaLink} me={2} />
      {baseURL(href)}
    </Link>
  );
}
