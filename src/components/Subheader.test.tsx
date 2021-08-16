import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Subheader } from "./Subheader";

it("should open external urls in a new tab", async () => {
  const { getByText } = render(<Subheader url={"http://www.getdropbox.com"}></Subheader>);
  const link = getByText("getdropbox.com").closest("a");

  expect(link).toHaveProperty("href", "http://www.getdropbox.com/");
  expect(link).toHaveProperty("target", "_blank");
});
