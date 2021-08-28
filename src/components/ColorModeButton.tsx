import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

export function ColorModeButton() {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MoonIcon, SunIcon);

  return <IconButton aria-label="Toggle color mode" icon={<Icon />} onClick={toggleColorMode} />;
}
