import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

it("renders a spinner", async () => {
  render(<Loader size="md" />);
  expect(screen.getByText("Loading...")).toBeVisible();
});
