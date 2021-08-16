import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as HackerNewsContext from "src/context/HackerNewsContext";
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

it("should forward the api error to the user", async () => {
  jest.spyOn(HackerNewsContext, "usePost").mockReturnValue({ type: "error", message: "Something went wrong." });
  const { getByText } = render(<Item id={100}></Item>);
  expect(getByText("Something went wrong.")).toBeVisible();
});

it("should navigate to the item's page when clicking on the card", async () => {
  jest.spyOn(HackerNewsContext, "usePost").mockReturnValue({ type: "data", data: mockStory as any });

  const history = createMemoryHistory();

  const { getByText } = render(<Item id={100}></Item>, {
    wrapper: (props) => <Router history={history} {...props} />,
  });

  const link = getByText("My YC app: Dropbox");

  fireEvent.click(link);

  await waitFor(() => expect(history.location.pathname).toEqual("/posts/100"));
});
