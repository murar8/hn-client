import { fireEvent, screen, waitFor } from "@testing-library/react";
import { Renderer } from "src/testUtils";
import { NavigationMenu } from "./NavigationMenu";

function createRenderer(location: string) {
  return Renderer.create().withRouter({ initialEntries: [location] }).render;
}

const routes = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
];

it("renders a button with the label of the matching route", async () => {
  createRenderer("/about")(<NavigationMenu routes={routes} />);
  expect(screen.getByRole("menu", { hidden: true })).not.toBeVisible();
  expect(screen.getByText("About")).toBeVisible();
});

it("uses the window title as fallback button title", async () => {
  document.title = "Landing Page";
  createRenderer("/")(<NavigationMenu routes={routes} />);
  expect(screen.getByText("Landing Page")).toBeVisible();
});

it("opens the navigation menu on click", async () => {
  const { history } = createRenderer("/about")(<NavigationMenu routes={routes} />);

  fireEvent.click(screen.getByText("About"));
  fireEvent.click(screen.getByText("Home"));

  expect(history.location.pathname).toEqual("/home");
});

it("does not display the current path in the menu", async () => {
  createRenderer("/about")(<NavigationMenu routes={routes} />);

  fireEvent.click(screen.getByText("About"));

  const items = await waitFor(() => screen.getAllByRole("menuitem"));
  items.forEach((item) => expect(item).not.toHaveTextContent("About"));
});
