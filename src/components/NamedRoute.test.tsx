import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { HelmetProvider } from "react-helmet-async";
import { Router, Switch } from "react-router-dom";
import { NamedRoute } from "./NamedRoute";

afterEach(() => {
  document.getElementsByTagName("html")[0].innerHTML = "";
});

function renderWithContext(ui: React.ReactElement, options?: Omit<RenderOptions, "">) {
  const history = createMemoryHistory();

  const result = render(ui, {
    wrapper: ({ children }) => (
      <HelmetProvider>
        <Router history={history}>
          <Switch>{children}</Switch>
        </Router>
      </HelmetProvider>
    ),
  });

  return { history, ...result };
}

it("should update the window title based on the current path when using children", async () => {
  const { history } = renderWithContext(
    <>
      <NamedRoute name="Foo" path="/foo">
        Foo
      </NamedRoute>
      <NamedRoute name="Bar" path="/bar">
        Bar
      </NamedRoute>
    </>
  );

  await waitFor(() => expect(window.document.title).toEqual(""));

  history.push("/foo");

  await waitFor(() => expect(document.title).toEqual("Foo"));
});

it("should update the window title based on the current path when using a render function", async () => {
  const { history } = renderWithContext(
    <>
      <NamedRoute name="Foo" path="/foo" render={() => "Foo"} />
      <NamedRoute name="Bar" path="/bar" render={() => "Bar"} />
    </>
  );

  await waitFor(() => expect(window.document.title).toEqual(""));

  history.push("/foo");

  await waitFor(() => expect(document.title).toEqual("Foo"));
});
