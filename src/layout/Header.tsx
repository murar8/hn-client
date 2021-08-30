import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  HStack,
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
import { Link, matchPath, useLocation } from "react-router-dom";
import { Route } from "src/config/routes";

function useMatchingRouteIndex(routes: Route[]) {
  const { pathname } = useLocation();
  const index = useMemo(() => routes.findIndex(({ path }) => matchPath(pathname, { path })), [routes, pathname]);
  return index !== -1 ? index : undefined;
}

function ColorModeButton() {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MoonIcon, SunIcon);
  return <IconButton aria-label="Toggle color mode" icon={<Icon />} onClick={toggleColorMode} />;
}

type LinkContainerProps = {
  routes: { name: string; path: string }[];
};

function LinkMenu({ routes }: LinkContainerProps) {
  const routeIndex = useMatchingRouteIndex(routes);

  return (
    <Menu matchWidth>
      <MenuButton as={Button} flexGrow={1} me={8} rightIcon={<ChevronDownIcon />}>
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
      <HStack alignItems="center" spacing={2} p={3}>
        {LinkComponent && <LinkComponent routes={routes} />}
        <ColorModeButton />
      </HStack>
      <Divider />
    </header>
  );
}
