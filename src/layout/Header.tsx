import { Divider, HStack } from "@chakra-ui/react";
import { DrawerButton } from "./Drawer";

export function Header() {
  return (
    <header>
      <HStack h={16} spacing={2} p={2}>
        <DrawerButton />
      </HStack>
      <Divider />
    </header>
  );
}
