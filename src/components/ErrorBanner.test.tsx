import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { ErrorBanner } from "./ErrorBanner";

it("displays the error string representation if the error is an object", async () => {
  render(<ErrorBanner error="Could not reach the speed of light." />);
  expect(screen.getByText(/Could not reach the speed of light./)).toBeVisible();
});

it("displays the error message if the error is an Error instance", async () => {
  render(<ErrorBanner error={new Error("Could not break the sound barrier.")} />);
  expect(screen.getByText(/Could not break the sound barrier./)).toBeVisible();
});

it("shows a retry button when the onRetry prop is specified", async () => {
  const onRetry = jest.fn();
  render(<ErrorBanner error={new Error("Could not break the sound barrier.")} onRetry={onRetry} />);
  const retryButton = screen.getByText("Retry");

  expect(retryButton).toBeVisible();

  fireEvent.click(retryButton);

  expect(onRetry).toHaveBeenCalledTimes(1);
});
