import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/react";
import { Switch } from "react-router-dom";
import { Renderer } from "src/testUtils";
import { NamedRoute } from "./NamedRoute";

const render = Renderer.create().withRouter({ initialEntries: ["/foo"] }).render;

function Component() {
  return (
    <Switch>
      <NamedRoute name="Foo" path="/foo">
        Foo
      </NamedRoute>
      <NamedRoute name="Bar" path="/bar">
        Bar
      </NamedRoute>
    </Switch>
  );
}

beforeEach(() => {
  document.title = "";
});

it("updates the document title", async () => {
  const { history } = render(<Component />);
  await waitFor(() => expect(document.title).toEqual("Foo"));
  history.push("/bar");
  await waitFor(() => expect(document.title).toEqual("Bar"));
});
