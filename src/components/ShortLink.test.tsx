import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ShortLink } from "./ShortLink";

function Component() {
  return <ShortLink href="https://github.com/HackerNews/API" />;
}

it("renders a link", async () => {
  render(<Component />);
  expect(screen.getByText("github.com").closest("a")).toHaveProperty("href", "https://github.com/HackerNews/API");
});
