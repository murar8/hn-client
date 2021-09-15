import { Button, ChakraProps, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

export function useMatchingRouteIndex(routes: { name: string; path: string }[]) {
  const { pathname } = useLocation();
  const index = useMemo(() => routes.findIndex(({ path }) => matchPath(pathname, { path })), [routes, pathname]);
  return index !== -1 ? index : undefined;
}

export type LinkBarProps = ChakraProps & {
  routes: { name: string; path: string }[];
};

export function LinkBar({ routes, ...props }: LinkBarProps) {
  const routeIndex = useMatchingRouteIndex(routes);

  return (
    <Flex justifyContent="center" {...props}>
      {routes.map(({ name, path }, i) => (
        <Button
          variant={i === routeIndex ? "outline" : "ghost"}
          aria-selected={i === routeIndex}
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
    </Flex>
  );
}
