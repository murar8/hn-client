import { ChakraProvider, Container, CSSReset } from "@chakra-ui/react";
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
        <Container maxW="container.xl">
          <Switch>
            {routes.map(({ name, path, Component, exact }) => (
              <NamedRoute key={path} name={name} path={path} exact={exact}>
                <Component />
              </NamedRoute>
            ))}
          </Switch>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}
