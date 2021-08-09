import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, RouteProps } from "react-router-dom";

export type NamedRouteProps = RouteProps & { name: string };

export function NamedRoute({ name, children, ...props }: NamedRouteProps) {
  return (
    <Route {...props}>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      {children}
    </Route>
  );
}
