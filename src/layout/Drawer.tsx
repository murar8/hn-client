import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  IconButton,
  IconButtonProps,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";
import { useDrawer } from "./DrawerProvider";

export type NavigationDrawerProps = Omit<DrawerProps, "isOpen" | "onClose" | "children"> & {
  routes: { name: string; path: string }[];
};

export function NavigationDrawer({ routes, ...props }: NavigationDrawerProps) {
  const { isOpen, onClose } = useDrawer();
  const { pathname } = useLocation();
  const matchingRoute = useMemo(
    () => routes.findIndex(({ path }) => matchPath(path, { path: pathname }) !== null),
    [pathname] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Drawer isOpen={isOpen} onClose={onClose} {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Hacker News</DrawerHeader>
        <DrawerBody as={VStack} spacing={8} align="stretch">
          {routes.map(({ name, path }, i) => {
            return (
              <Button
                variant={i === matchingRoute ? "solid" : "outline"}
                key={path}
                as={RouterLink}
                to={path}
                onClick={onClose}
              >
                {name}
              </Button>
            );
          })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export type NavigationDrawerButtonProps = Omit<IconButtonProps, "onClick" | "aria-label" | "icon">;

export function NavigationDrawerButton({ ...props }: NavigationDrawerButtonProps) {
  const { onOpen } = useDrawer();
  return <IconButton aria-label="Open drawer" icon={<HamburgerIcon />} onClick={onOpen} {...props} />;
}
