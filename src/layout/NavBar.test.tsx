import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import { NavBar, NavBarLink } from "./NavBar";

it("should select the tab corresponding to the current URL", async () => {
  const history = createMemoryHistory();
  // history.push("/bar");
  const { getAllByRole } = render(
    <Router history={history}>
      <NavBar>
        <NavBarLink to="/foo" label="foo" />
        <NavBarLink to="/bar" label="bar" />
      </NavBar>
    </Router>
  );

  const tabs = getAllByRole("tab");
  const tab = tabs.find((tab) => within(tab).queryByText("bar"));
  const others = tabs.filter((tab) => !within(tab).queryByText("bar"));

  expect(tab).toHaveAttribute("aria-selected", "false");

  history.push("/bar");

  expect(tab).toHaveAttribute("aria-selected", "true");
  others.forEach((other) => expect(other).toHaveAttribute("aria-selected", "false"));
});

it("should hide on scroll", async () => {
  const { container } = render(
    <MemoryRouter>
      <NavBar>
        <NavBarLink to="/foo" label="foo" />
        <NavBarLink to="/bar" label="bar" />
      </NavBar>
    </MemoryRouter>
  );

  expect(container.firstChild).toBeVisible();

  Object.defineProperty(window, "pageYOffset", { value: 400 });
  fireEvent.scroll(window);

  await waitFor(() => expect(container.firstChild).not.toBeVisible());
});
