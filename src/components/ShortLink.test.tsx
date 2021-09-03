import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ShortLink } from "./ShortLink";

function Component() {
  return <ShortLink href="https://github.com/HackerNews/API" />;
}

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(1118805940 * 1000)); // Wednesday 15 June 2005 03:25:40
});

afterAll(() => {
  jest.useRealTimers();
});

it("displays the item data", async () => {
  render(<Component />);
  expect(screen.getByText("github.com").closest("a")).toHaveProperty("href", "https://github.com/HackerNews/API");
});
