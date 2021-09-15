import { Divider, Flex, Icon, IconButton, Link as ChakraLink, useBreakpointValue } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { ColorModeButton } from "./ColorModeButton";
import { LinkBar, LinkBarProps } from "./LinkBar";
import { NavigationMenu, NavigationMenuProps } from "./NavigationMenu";

export type HeaderProps = {
  routes: { name: string; path: string }[];
};

export function Header({ routes }: HeaderProps) {
  const LinkComponent = useBreakpointValue({
    base: (props: NavigationMenuProps) => <NavigationMenu {...props} flexGrow={1} me={8} />,
    md: (props: LinkBarProps) => <LinkBar {...props} flexGrow={1} me={8} />,
  });

  return (
    <header>
      <Flex p={3}>
        {LinkComponent && <LinkComponent routes={routes} />}
        <ColorModeButton />
        <IconButton
          ms={2}
          as={ChakraLink}
          isExternal
          href="https://github.com/murar8/hn-client"
          aria-label="Open project source"
          icon={<Icon as={FaGithub} />}
        />
      </Flex>
      <Divider />
    </header>
  );
}
