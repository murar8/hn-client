import { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";

export type NamedRouteProps = RouteProps & { name?: string };

export function NamedRoute({ name, ...props }: NamedRouteProps) {
  useEffect(() => {
    if (name) document.title = name;
  });

  return <Route {...props} />;
}
