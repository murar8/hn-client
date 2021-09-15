import { ChakraProps, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ColorModeButton(props: ChakraProps) {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);
  return <IconButton aria-label="Toggle color mode" icon={<Icon />} onClick={toggleColorMode} {...props} />;
}
