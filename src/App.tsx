import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter, Switch } from "react-router-dom";
import { chartRoutes, routes } from "src/config/routes";
import { theme } from "src/config/theme";
import { Header } from "src/layout/Header";
import { NamedRoute } from "./components/NamedRoute";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Header routes={chartRoutes} />
        <Switch>
          {routes.map(({ name, path, Component }) => (
            <NamedRoute key={path} name={name} path={path}>
              <Component />
            </NamedRoute>
          ))}
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
