import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config/theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <h1>Hello</h1>
    </ChakraProvider>
  );
}
