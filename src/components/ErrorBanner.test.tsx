import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ErrorBanner } from "./ErrorBanner";

it("displays the error message", async () => {
  render(<ErrorBanner error={new Error("Could not break the sound barrier.")} />);
  expect(screen.getByText("Could not break the sound barrier.")).toBeVisible();
  render(<ErrorBanner error="Could not reach the speed of light." />);
  expect(screen.getByText("Could not reach the speed of light.")).toBeVisible();
});
