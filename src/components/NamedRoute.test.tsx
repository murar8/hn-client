import {} from "@material-ui/core";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { HelmetProvider } from "react-helmet-async";
import { Router, Switch } from "react-router-dom";
import { NamedRoute } from "./NamedRoute";

it("should update the window title based on the current path", async () => {
  const history = createMemoryHistory();

  render(
    <HelmetProvider>
      <Router history={history}>
        <Switch>
          <NamedRoute name="Foo" path="/foo" />
          <NamedRoute name="Bar" path="/bar" />
        </Switch>
      </Router>
    </HelmetProvider>
  );

  await waitFor(() => expect(window.document.title).toEqual(""));

  history.push("/foo");

  await waitFor(() => expect(document.title).toEqual("Foo"));
});
