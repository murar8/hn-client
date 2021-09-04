import { Icon, Link, SystemProps } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import { baseURL } from "src/util";

export type ShortLinkProps = {
  href: string;
};

export function ShortLink({ href, ...props }: ShortLinkProps & SystemProps) {
  return (
    <Link
      color="grey"
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
