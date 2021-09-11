import { ChakraProvider, Container, CSSReset, Flex } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Loader } from "src/components/Loader";
import { NamedRoute } from "src/components/NamedRoute";
import { theme } from "src/config/theme";
import { Footer } from "src/layout/Footer";
import { Header } from "src/layout/Header";
import { ErrorBannerBoundary } from "./layout/ErrorBannerBoundary";

const ChartPage = lazy(() => import("src/pages/ChartPage"));
const PostPage = lazy(() => import("src/pages/PostPage"));
const HomePage = lazy(() => import("src/pages/HomePage"));
const FallbackPage = lazy(() => import("src/pages/FallbackPage"));

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Flex flexDir="column" height="100%">
          <Header
            routes={[
              { name: "Best", path: "/best" },
              { name: "New", path: "/new" },
              { name: "Top", path: "/top" },
              { name: "Ask", path: "/ask" },
              { name: "Show", path: "/show" },
              { name: "Jobs", path: "/jobs" },
            ]}
          />
          <Container maxW="container.xl" p={0} flexGrow={1}>
            <ErrorBannerBoundary>
              <Suspense fallback={<Loader size="xl" p={4} />}>
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
            </ErrorBannerBoundary>
          </Container>
          <Footer />
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  );
}
