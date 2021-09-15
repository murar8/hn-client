import { Button, ChakraProps, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, matchPath, useLocation } from "react-router-dom";

function useMatchingRouteIndex(routes: { name: string; path: string }[]) {
  const { pathname } = useLocation();
  const index = useMemo(() => routes.findIndex(({ path }) => matchPath(pathname, { path })), [routes, pathname]);
  return index !== -1 ? index : undefined;
}

export type NavigationMenuProps = ChakraProps & {
  routes: { name: string; path: string }[];
};

export function NavigationMenu({ routes, ...props }: NavigationMenuProps) {
  const routeIndex = useMatchingRouteIndex(routes);

  return (
    <Menu matchWidth>
      <MenuButton as={Button} {...props} rightIcon={<Icon as={FaChevronDown} />}>
        {routeIndex ? routes[routeIndex].name : document.title || "Hacker News"}
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
