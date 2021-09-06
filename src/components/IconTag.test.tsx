import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { IconTag } from "./IconTag";
import { Logo } from "./Logo";

it("renders an icon tag", async () => {
  render(<IconTag Icon={() => <Logo aria-label="Logo" />} label="Hacker News" />);
  expect(screen.getByLabelText("Logo")).toBeVisible();
  expect(screen.getByText("Hacker News")).toBeVisible();
});
