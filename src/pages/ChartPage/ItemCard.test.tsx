import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";
import { Renderer } from "src/testUtils";
import { ItemCard } from "./ItemCard";

const { render } = Renderer.create().withRouter();

it("displays the item content", async () => {
  render(<ItemCard item={{ id: 1000, title: "Title", url: "https://github.com/", by: "jd_rockfeller" }} />);
  expect(screen.getByText("Title")).toBeVisible();
  expect(screen.getByText("github.com")).toHaveProperty("href", "https://github.com/");
  expect(screen.getByText("jd_rockfeller")).toBeVisible();
});

it("opens the item page on click", async () => {
  const { history } = render(<ItemCard item={{ id: 1000, title: "Title" }} />);
  fireEvent.click(screen.getByText("Title"));
  expect(history.location.pathname).toEqual("/post/1000");
});
