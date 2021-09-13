import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import FallbackPage from ".";

it("displays the fallback page", async () => {
  render(<FallbackPage />);
  expect(screen.getByText(/404/)).toBeVisible();
});
