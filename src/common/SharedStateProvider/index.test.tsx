import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { SharedState, SharedStateProvider, useSharedState } from ".";

function Show() {
  const [value] = useSharedState("value");
  return <p>Value: {value ?? 0}</p>;
}

function Increase() {
  const [value, setValue] = useSharedState("value") as SharedState<number>;
  return <button onClick={() => setValue(value ?? 0 + 1)}>Increase</button>;
}

function Component() {
  return (
    <SharedStateProvider>
      <Show />
      <Increase />
    </SharedStateProvider>
  );
}

it("provides consumers with a shared state instance", async () => {
  render(<Component />);
  expect(screen.getByText("Value: 0")).toBeVisible();
  fireEvent.click(screen.getByText("Increase"));
  expect(screen.getByText("Value: 1")).toBeVisible();
});
