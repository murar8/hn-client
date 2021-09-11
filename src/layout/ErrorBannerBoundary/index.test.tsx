import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ErrorBannerBoundary } from ".";

const consoleError = jest.spyOn(console, "error").mockImplementation();

function Child() {
  if (1) throw new Error("Failed to fetch data.");
  return <></>;
}

afterAll(() => {
  consoleError.mockRestore();
});

it("renders an error boundary", async () => {
  render(
    <ErrorBannerBoundary>
      <Child />
    </ErrorBannerBoundary>
  );
  expect(screen.getByText(/Failed to fetch data./)).toBeVisible();
});
