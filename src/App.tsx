import { ChakraProvider, Container, CSSReset, Flex } from "@chakra-ui/react";
import { BrowserRouter, Switch } from "react-router-dom";
import { NamedRoute } from "src/components/NamedRoute";
import { chartRoutes, routes } from "src/config/routes";
import { theme } from "src/config/theme";
import { Footer } from "src/layout/Footer";
import { Header } from "src/layout/Header";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Flex flexDir="column" minHeight="100%" boxSizing="border-box">
          <Header routes={chartRoutes} />
          <Container maxW="container.xl" p={0} flexGrow={1}>
            <Switch>
              {routes.map(({ name, path, Component, exact }) => (
                <NamedRoute key={path} name={name} path={path} exact={exact}>
                  <Component />
                </NamedRoute>
              ))}
            </Switch>
          </Container>
          <Footer />
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  );
}
