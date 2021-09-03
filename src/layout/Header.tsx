import {
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import { Link, matchPath, useLocation } from "react-router-dom";

function useMatchingRouteIndex(routes: { name: string; path: string }[]) {
  const { pathname } = useLocation();
  const index = useMemo(() => routes.findIndex(({ path }) => matchPath(pathname, { path })), [routes, pathname]);
  return index !== -1 ? index : undefined;
}

function ColorModeButton() {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);
  return <IconButton aria-label="Toggle color mode" icon={<Icon />} onClick={toggleColorMode} />;
}

type LinkContainerProps = {
  routes: { name: string; path: string }[];
};

function LinkMenu({ routes }: LinkContainerProps) {
  const routeIndex = useMatchingRouteIndex(routes);

  return (
    <Menu matchWidth>
      <MenuButton as={Button} flexGrow={1} me={8} rightIcon={<Icon as={FaChevronDown} />}>
        {routeIndex ? routes[routeIndex].name : "Hacker News"}
      </MenuButton>
      <MenuList>
        {routes
          .filter((_, i) => i !== routeIndex)
          .map(({ name, path }) => (
            <MenuItem key={path} as={Link} to={path}>
              {name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}

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
    base: LinkMenu,
    md: LinkBar,
  });

  return (
    <header>
      <Flex p={3}>
        {LinkComponent && <LinkComponent routes={routes} />}
        <ColorModeButton />
      </Flex>
      <Divider />
    </header>
  );
}
