import { screen } from "@testing-library/react";
import { mockMatchMedia, Renderer } from "src/testUtils";
import { Header } from ".";

const routes = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
];

const renderer = Renderer.create()
  .withRouter({ initialEntries: ["/about"] })
  .withColorModeProvider({ initialColorMode: "light" })
  .withChakraProvider();

function setup(width: number) {
  mockMatchMedia(width);
  return renderer.render(<Header routes={routes} />);
}

it("renders the routes as a series of links on large monitors", async () => {
  setup(1024);

  expect(screen.getByText("Home")).toBeVisible();
  expect(screen.getByText("About")).toBeVisible();
  expect(screen.getByLabelText("Toggle color mode")).toBeVisible();
});

it("renders the routes as a menu on small monitors", async () => {
  setup(368);
  expect(screen.getByText("About")).toBeVisible();
});
