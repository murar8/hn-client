import { Container } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { GlobalErrorBoundary } from "src/common/GlobalErrorBoundary";
import { Loader } from "src/components/Loader";
import { NamedRoute } from "src/components/NamedRoute";

const ChartPage = lazy(() => import("src/pages/ChartPage"));
const PostPage = lazy(() => import("src/pages/PostPage"));
const HomePage = lazy(() => import("src/pages/HomePage"));
const FallbackPage = lazy(() => import("src/pages/FallbackPage"));

export function Routes() {
  return (
    <GlobalErrorBoundary>
      <Suspense fallback={<Loader size="xl" />}>
        <Container maxW="container.xl" p={0} flexGrow={1}>
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
        </Container>
      </Suspense>
    </GlobalErrorBoundary>
  );
}
