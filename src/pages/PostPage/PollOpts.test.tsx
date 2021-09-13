import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { fetchItems } from "src/api";
import { Renderer } from "src/testUtils";
import { PollOpts } from "./PollOpts";

jest.mock("src/api", () => ({
  fetchItems: jest.fn((ids: number[]) => {
    return Promise.resolve(ids.map((id) => ({ id, text: `Poll option #${id}`, score: 200 })));
  }),
}));

async function waitForContent() {
  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
}

async function setup() {
  const renderer = Renderer.create().withQueryClient();
  renderer.render(<PollOpts ids={[1000, 1100, 1200]} />);
  await waitForContent();
}

it("displays the supplied poll options", async () => {
  await setup();
  expect(screen.getAllByText("200")).toHaveLength(3);
  expect(screen.getAllByText(/Poll option #\d+/)).toHaveLength(3);
});

it("filters empty items", async () => {
  (fetchItems as jest.Mock).mockImplementationOnce((ids: number[]) => Promise.resolve(ids.map((id) => ({ id }))));
  await setup();
  expect(screen.queryAllByText(/Poll option #\d+/).length).toEqual(0);
});

it("displays a retry button when an error occurs", async () => {
  jest.spyOn(console, "error").mockImplementationOnce(() => {});
  (fetchItems as jest.Mock).mockImplementationOnce(() => Promise.reject("API error"));
  await setup();

  fireEvent.click(screen.getByText("Retry"));
  await waitForContent();

  expect(screen.getAllByText(/Poll option #\d+/)).toHaveLength(3);
});
