import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { routes } from "src/config/routes";
import { theme } from "src/config/theme";
import { Header } from "src/layout/Header";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Header routes={routes} />
      </BrowserRouter>
    </ChakraProvider>
  );
}
