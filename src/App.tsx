import { ChakraProvider, Container, CSSReset, Flex } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Switch } from "react-router-dom";
import { Loader } from "src/components/Loader";
import { NamedRoute } from "src/components/NamedRoute";
import { theme } from "src/config/theme";
import { Footer } from "src/layout/Footer";
import { Header } from "src/layout/Header";
import { GlobalErrorBoundary } from "./layout/GlobalErrorBoundary";

const ChartPage = lazy(() => import("src/pages/ChartPage"));
const PostPage = lazy(() => import("src/pages/PostPage"));
const HomePage = lazy(() => import("src/pages/HomePage"));
const FallbackPage = lazy(() => import("src/pages/FallbackPage"));

const headerRoutes = [
  { name: "Best", path: "/best" },
  { name: "New", path: "/new" },
  { name: "Top", path: "/top" },
  { name: "Ask", path: "/ask" },
  { name: "Show", path: "/show" },
  { name: "Jobs", path: "/jobs" },
];

const queryClient = new QueryClient();

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <BrowserRouter>
          <Flex flexDir="column" height="100%">
            <Header routes={headerRoutes} />
            <Container maxW="container.xl" p={0} flexGrow={1}>
              <GlobalErrorBoundary>
                <Suspense fallback={<Loader size="xl" />}>
                  <Switch>
                    <NamedRoute name="Top" path="/top">
                      <ChartPage chart="top" />
                    </NamedRoute>
                    <NamedRoute name="Best" path="/best">
                      <ChartPage chart="best" />
                    </NamedRoute>
                    <NamedRoute name="New" path="/new">
                      <ChartPage chart="new" />
                    </NamedRoute>
                    <NamedRoute name="Ask" path="/ask">
                      <ChartPage chart="ask" />
                    </NamedRoute>
                    <NamedRoute name="Show" path="/show">
                      <ChartPage chart="show" />
                    </NamedRoute>
                    <NamedRoute name="Jobs" path="/jobs">
                      <ChartPage chart="job" />
                    </NamedRoute>
                    <NamedRoute name="Post" path="/post/:id(\d+)">
                      <PostPage />
                    </NamedRoute>
                    <NamedRoute name="Home" path="/" exact>
                      <HomePage />
                    </NamedRoute>
                    <NamedRoute name="Page not found" path={"*"}>
                      <FallbackPage />
                    </NamedRoute>
                  </Switch>
                </Suspense>
              </GlobalErrorBoundary>
            </Container>
            <Footer />
          </Flex>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
