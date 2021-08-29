import { fireEvent, screen, waitFor } from "@testing-library/react";
import { mockMatchMedia, Renderer } from "src/testUtils";
import { Header } from "./Header";

const routes = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
];

const render = Renderer.create()
  .withRouter({ initialEntries: ["/About"] })
  .withChakraProvider().render;

it("renders a header", async () => {
  mockMatchMedia(1024);
  render(<Header routes={routes} />);
  expect(screen.getByLabelText("Toggle color mode")).toBeVisible();
});

it("renders the routes as a series of links on large monitors", async () => {
  mockMatchMedia(1024);
  render(<Header routes={routes} />);

  expect(screen.getByText("Home")).toBeVisible();
  expect(screen.getByText("About")).toBeVisible();
  expect(screen.getByLabelText("Toggle color mode")).toBeVisible();
});

it("renders the routes as a menu on small monitors", async () => {
  mockMatchMedia(368);
  const { history } = render(<Header routes={routes} />);

  fireEvent.click(screen.getByText("About"));
  const link = await waitFor(() => screen.queryByText("Home")!);
  fireEvent.click(link);

  expect(history.location.pathname).toEqual("/home");
});
