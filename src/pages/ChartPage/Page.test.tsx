import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as HackerNewsContext from "src/context/HackerNewsContext";
import { Page } from "./Page";

const Item: Parameters<typeof Page>[0]["Item"] = ({ id }) => <div>ID: {id}</div>;

it("should forward the api error to the user", async () => {
  jest.spyOn(HackerNewsContext, "useChart").mockReturnValue({ type: "error", message: "Something went wrong." });
  const { getByText } = render(<Page Item={Item} chart={"new"}></Page>);
  await waitFor(() => expect(getByText("Something went wrong.")).toBeVisible());
});

it("should display a button for loading more items", async () => {
  jest
    .spyOn(HackerNewsContext, "useChart")
    .mockReturnValue({ type: "data", data: Array.from({ length: 30 }, (x, i) => i) });

  const { getByText, queryAllByText, queryByText } = render(<Page Item={Item} chart={"new"}></Page>);

  const initialLength = queryAllByText(/ID:/).length;
  expect(initialLength).not.toEqual(0);

  fireEvent.click(getByText("Load More"));

  const length = queryAllByText(/ID:/).length;
  expect(initialLength).toBeLessThan(length);
  expect(queryByText("Load More")).toBeFalsy();
});
