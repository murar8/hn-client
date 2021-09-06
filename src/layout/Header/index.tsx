import {
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link as ChakraLink,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FaGithub } from "react-icons/fa";
import { Link, matchPath, useLocation } from "react-router-dom";
import { ColorModeButton } from "./ColorModeButton";
import { NavigationMenu, NavigationMenuProps } from "./NavigationMenu";

export function useMatchingRouteIndex(routes: { name: string; path: string }[]) {
  const { pathname } = useLocation();
  const index = useMemo(() => routes.findIndex(({ path }) => matchPath(pathname, { path })), [routes, pathname]);
  return index !== -1 ? index : undefined;
}

export type LinkContainerProps = {
  routes: { name: string; path: string }[];
};

function LinkBar({ routes }: LinkContainerProps) {
  const routeIndex = useMatchingRouteIndex(routes);

  return (
    <>
      <Spacer />
      {routes.map(({ name, path }, i) => (
        <Button
          variant={i === routeIndex ? "outline" : "ghost"}
          sx={{ border: "1px solid transparent" }}
          size="lg"
          h={10}
          key={path}
          as={Link}
          to={path}
        >
          {name}
        </Button>
      ))}
      <Spacer />
    </>
  );
}

export type HeaderProps = {
  routes: { name: string; path: string }[];
};

export function Header({ routes }: HeaderProps) {
  const LinkComponent = useBreakpointValue({
    base: (props: NavigationMenuProps) => <NavigationMenu {...props} flexGrow={1} me={8} />,
    md: LinkBar,
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
