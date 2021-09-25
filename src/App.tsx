import { ChakraProvider, CSSReset, Flex } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "src/common/Footer";
import { Header } from "src/common/Header";
import { Routes } from "src/common/Routes";
import { ServiceWorkerManager } from "src/common/ServiceWorkerManager";
import { SharedStateProvider } from "src/common/SharedStateProvider";
import { theme } from "src/config/theme";
import { queryClient } from "src/queryClient";

const headerRoutes = [
  { name: "Best", path: "/best" },
  { name: "New", path: "/new" },
  { name: "Top", path: "/top" },
  { name: "Ask", path: "/ask" },
  { name: "Show", path: "/show" },
  { name: "Jobs", path: "/jobs" },
];

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <BrowserRouter>
          <SharedStateProvider>
            <Flex flexDir="column" height="100%">
              <Header routes={headerRoutes} />
              <ServiceWorkerManager />
              <Routes />
              <Footer />
            </Flex>
          </SharedStateProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
