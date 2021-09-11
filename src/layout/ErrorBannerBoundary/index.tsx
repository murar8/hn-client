import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ErrorBanner } from "src/components/ErrorBanner";

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return <ErrorBanner error={error} onRetry={resetErrorBoundary} />;
}

export type ErrorBannerBoundaryProps = {
  children?: ReactNode;
};

export function ErrorBannerBoundary(props: ErrorBannerBoundaryProps) {
  return <ErrorBoundary FallbackComponent={Fallback} {...props} />;
}
