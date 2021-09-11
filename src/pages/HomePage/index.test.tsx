import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";
import { Renderer } from "src/testUtils";
import HomePage from ".";

const render = Renderer.create().withRouter().render;

it("displays the home page", async () => {
  const { history } = render(<HomePage />);
  expect(screen.getByText("HN Client")).toBeVisible();
  fireEvent.click(screen.getByText("Get Started"));
  expect(history.location.pathname).toEqual("/best");
});
