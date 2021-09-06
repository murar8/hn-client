import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

it("renders a logo", async () => {
  render(<Logo aria-label="Logo" />);
  expect(screen.getByLabelText("Logo")).toBeVisible();
});
