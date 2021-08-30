import { useColorModeValue } from "@chakra-ui/react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { mockMatchMedia, Renderer } from "src/testUtils";
import { Header } from "./Header";

const routes = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
];

const renderer = Renderer.create()
  .withRouter({ initialEntries: ["/About"] })
  .withColorModeProvider({ initialColorMode: "light" })
  .withChakraProvider();

function Component() {
  const colorMode = useColorModeValue("light", "dark");

  return (
    <>
      <Header routes={routes} />
      <p>Color mode: {colorMode}</p>
    </>
  );
}

function setup(width: number) {
  mockMatchMedia(width);
  return renderer.render(<Component />);
}

it("renders the routes as a series of links on large monitors", async () => {
  setup(1024);

  expect(screen.getByText("Home")).toBeVisible();
  expect(screen.getByText("About")).toBeVisible();
  expect(screen.getByLabelText("Toggle color mode")).toBeVisible();
});

it("renders the routes as a menu on small monitors", async () => {
  const { history } = setup(368);

  expect(screen.getByRole("menu", { hidden: true })).not.toBeVisible();

  fireEvent.click(screen.getByText("About"));
  const link = await waitFor(() => screen.queryByText("Home")!);
  fireEvent.click(link);

  expect(history.location.pathname).toEqual("/home");
});

it("toggles the color mode when clicking on the color mode button", async () => {
  setup(368);

  expect(screen.getByText("Color mode: light")).toBeVisible();
  fireEvent.click(screen.getByLabelText("Toggle color mode"));
  expect(screen.getByText("Color mode: dark")).toBeVisible();
});
