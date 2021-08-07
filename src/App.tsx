import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Box minW="xs">
          <Header />
        </Box>
        <Switch>
          <Redirect exact from="/" to="/best" />
          <Route path="/best">Best</Route>
          <Route path="/new">New</Route>
          <Route path="/top">Top</Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
