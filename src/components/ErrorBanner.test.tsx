import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ErrorBanner } from "./ErrorBanner";

function Component() {
  return <ErrorBanner error="Could not reach the speed of light." />;
}

it("displays the error message", async () => {
  render(<Component />);
  expect(screen.getByText("Could not reach the speed of light.")).toBeVisible();
});
