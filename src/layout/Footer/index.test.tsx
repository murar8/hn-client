import { render, screen } from "@testing-library/react";
import { Footer } from ".";

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(1118805940 * 1000)); // Wednesday 15 June 2005 03:25:40
});

it("renders a footer", async () => {
  render(<Footer />);
  expect(screen.getByText("Contact info")).toBeVisible();
  expect(screen.getByText("Support")).toBeVisible();
  expect(screen.getByText(/Copyright © 2005/)).toBeVisible();
});
