import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { ShortLink } from "./ShortLink";

function Component() {
  return <ShortLink href="https://github.com/HackerNews/API" />;
}

it("renders a link", async () => {
  render(<Component />);
  expect(screen.getByText("github.com").closest("a")).toHaveProperty("href", "https://github.com/HackerNews/API");
});

it("does not propagate click events to the parent element", async () => {
  const onClick = jest.fn();

  render(
    <div onClick={onClick}>
      <Component />
    </div>
  );

  fireEvent.click(screen.getByText("github.com"));

  expect(onClick).not.toHaveBeenCalled();
});
