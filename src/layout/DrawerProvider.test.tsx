import { render, screen } from "@testing-library/react";
import { DrawerProvider, useDrawer } from "./DrawerProvider";

function Child() {
  const { isOpen } = useDrawer();
  return <div>Drawer status: {isOpen ? "opened" : "closed"}</div>;
}

function Component() {
  return (
    <DrawerProvider>
      <Child />
    </DrawerProvider>
  );
}

it("provides children with a drawer context instance", async () => {
  render(<Component />);
  expect(screen.getByText("Drawer status: closed")).toBeVisible();
});

it("throws an error when no provided is present", async () => {
  console.error = jest.fn();
  expect(() => render(<Child />)).toThrowError();
});
