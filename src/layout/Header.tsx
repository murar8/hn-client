import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Divider, Flex, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import { NavigationDrawerButton } from "./Drawer";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Flex alignItems="center" h={16} p={2}>
        <NavigationDrawerButton />
        <Spacer />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
      <Divider />
    </header>
  );
}
