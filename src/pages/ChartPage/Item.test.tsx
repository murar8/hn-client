import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import * as HackerNewsContext from "src/hooks/HackerNewsContext";
import { Item } from "./Item";

const mockStory = {
  by: "dhouston",
  descendants: 71,
  id: 8863,
  kids: [8952, 9224, 8917],
  score: 111,
  time: 1175714200,
  title: "My YC app: Dropbox",
  type: "story",
  url: "http://www.getdropbox.com",
};

const mockComment = {
  by: "norvig",
  id: 2921983,
  kids: [2922097, 2922429],
  parent: 2921506,
  text: "Aw shucks, guys ... you make me blush with your compliments.",
  time: 1314211127,
  type: "comment",
};

it("should forward the api error to the user", async () => {
  jest.spyOn(HackerNewsContext, "useItem").mockImplementation(() => [undefined, false, Error("Something went wrong")]);
  const { getByText } = render(<Item id={100}></Item>);
  expect(getByText("Something went wrong")).toBeVisible();
});

it("should display an error when an invalid item is returned", async () => {
  jest.spyOn(HackerNewsContext, "useItem").mockImplementation(() => [undefined, false, undefined]);
  const { getByText } = render(<Item id={100}></Item>);
  expect(getByText(/error/i)).toBeVisible();
});

it("should display an error when an item is deleted", async () => {
  jest.spyOn(HackerNewsContext, "useItem").mockImplementation(() => [{ id: 100, deleted: true }, false, undefined]);
  const { getByText } = render(<Item id={100}></Item>);
  expect(getByText(/error/i)).toBeVisible();
});

it("should display an error when the item has the wrong type", async () => {
  jest
    .spyOn(HackerNewsContext, "useItem")
    .mockImplementation(() => [mockComment as HackerNewsContext.Item, false, undefined]);
  const { getByText } = render(<Item id={100}></Item>);
  expect(getByText(/error/i)).toBeVisible();
});

it("should open external urls in a new tab", async () => {
  jest
    .spyOn(HackerNewsContext, "useItem")
    .mockImplementation(() => [mockStory as HackerNewsContext.Item, false, undefined]);

  const { getByText } = render(<Item id={100}></Item>);
  const link = getByText("My YC app: Dropbox").closest("a");

  expect(link).toHaveAttribute("href", "http://www.getdropbox.com");
  expect(link).toHaveAttribute("target", "_blank");
});
