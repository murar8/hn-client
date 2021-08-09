import { Helmet } from "react-helmet-async";
import { Route, RouteProps } from "react-router-dom";

type TitleProps = { name: string };

function Title({ name, ...props }: TitleProps) {
  return (
    <Helmet {...props}>
      <title>{name}</title>
    </Helmet>
  );
}

export type NamedRouteProps = RouteProps & { name: string };

export function NamedRoute({ name, children, render, ...props }: NamedRouteProps) {
  if (render) {
    return (
      <Route
        render={
          render &&
          ((props) => (
            <>
              <Title name={name} />
              {render(props)}
            </>
          ))
        }
        {...props}
      ></Route>
    );
  }

  return (
    <Route {...props}>
      <Title name={name} />
      {children}
    </Route>
  );
}
