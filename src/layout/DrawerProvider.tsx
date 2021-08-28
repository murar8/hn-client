import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

const DrawerContext = createContext<ReturnType<typeof useDisclosure> | undefined>(undefined);

export type DrawerProviderProps = Pick<UseDisclosureProps, "isOpen"> & {
  drawerID?: UseDisclosureProps["id"];
} & {
  children?: ReactNode;
};

export function DrawerProvider({ isOpen, drawerID, ...props }: DrawerProviderProps) {
  const value = useDisclosure({ isOpen, id: drawerID });
  return <DrawerContext.Provider value={value} {...props} />;
}

export function useDrawer() {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error(`An instance of ${DrawerProvider.name} was not found in the component tree.`);
  }

  return context;
}
