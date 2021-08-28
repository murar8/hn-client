import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./config/routes";
import { theme } from "./config/theme";
import { NavigationDrawer } from "./layout/Drawer";
import { DrawerProvider } from "./layout/DrawerProvider";
import { Header } from "./layout/Header";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <DrawerProvider>
          <Header />
          <NavigationDrawer placement="left" routes={routes} />
        </DrawerProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
