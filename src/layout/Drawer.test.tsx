import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { ComponentType, ReactElement } from "react";
import { Router } from "react-router-dom";
import { NavigationDrawerButton, NavigationDrawer } from "./Drawer";
import * as drawerContext from "./DrawerProvider";
import { DrawerProvider } from "./DrawerProvider";

const routes = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
];

function renderWithRouter(ui: ReactElement) {
  const history = createMemoryHistory();
  const wrapper: ComponentType = ({ children }) => <Router history={history!}>{children}</Router>;
  return { history, ...render(ui, { wrapper }) };
}

function setup(options?: { isOpen?: boolean }) {
  return renderWithRouter(
    <DrawerProvider isOpen={options?.isOpen}>
      <NavigationDrawerButton />
      <NavigationDrawer routes={routes} />
    </DrawerProvider>
  );
}

it("renders a drawer", async () => {
  setup({ isOpen: true });
  expect(screen.getByText("Home")).toBeVisible();
  expect(screen.getByText("About")).toBeVisible();
});

it("renders the provided routes as links", async () => {
  const { history } = setup({ isOpen: true });

  fireEvent.click(screen.getByText("Home"));

  expect(history.location.pathname).toEqual("/home");
});

it("opens the drawer when the open button is clicked", async () => {
  const onOpen = jest.fn();
  jest.spyOn(drawerContext, "useDrawer").mockReturnValue({ onOpen } as any);
  setup({ isOpen: false });

  fireEvent.click(screen.getByLabelText("Open drawer"));

  expect(onOpen).toHaveBeenCalledTimes(1);
});
