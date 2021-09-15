import { screen } from "@testing-library/react";
import { Renderer } from "src/testUtils";
import { LinkBar } from "./LinkBar";

const routes = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
];

function setup(location: string) {
  const renderer = Renderer.create().withRouter({ initialEntries: [location] });
  renderer.render(<LinkBar routes={routes} />);
}

it("renders the supplied routes as links", async () => {
  setup("/");
  expect(screen.getByText("Home")).toBeVisible();
  expect(screen.getByText("About")).toBeVisible();
});

it("highlights the current route", async () => {
  setup("/about");
  expect(screen.getByText("Home").closest("a")).toHaveAttribute("aria-selected", "false");
  expect(screen.getByText("About").closest("a")).toHaveAttribute("aria-selected", "true");
});
