import "@testing-library/jest-dom/extend-expect";
import { fireEvent, getAllByLabelText, screen, waitFor } from "@testing-library/react";
import { fetchItems } from "src/api";
import { Renderer } from "src/testUtils";
import { CommentTree } from "./CommentTree";

jest.mock("src/api", () => ({
  fetchItems: jest.fn((ids: number[]) =>
    Promise.resolve(
      ids.map((id) => ({
        id,
        text: `Comment #${id}`,
        kids: Array.from(new Array(Math.floor(1000 / id)), (_, i) => parseInt(id.toString() + i.toString())),
      }))
    )
  ),
}));

const ids = Array.from(new Array(100), (_, i) => i + 10);

async function waitForContent() {
  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
}

async function setup() {
  const renderer = Renderer.create().withQueryClient();
  renderer.render(<CommentTree ids={ids} />);
  await waitForContent();
}

it("displays a comment tree", async () => {
  await setup();
  expect(screen.getAllByText(/Comment #\d+/)).toHaveLength(5);
});

it("displays a retry button when an error occurs", async () => {
  jest.spyOn(console, "error").mockImplementationOnce(() => {});
  (fetchItems as jest.Mock).mockImplementationOnce(() => Promise.reject("API error"));
  await setup();

  fireEvent.click(screen.getByText("Retry"));
  await waitForContent();

  expect(screen.getAllByText(/Comment #\d+/)).toHaveLength(5);
});

it("loads more items on demand", async () => {
  await setup();

  for (let i = 0; i < 10; i++) {
    fireEvent.click(screen.getByText("Show More"));
    await waitForContent();
  }

  expect(screen.getAllByText(/Comment #\d+/)).toHaveLength(100);
  expect(screen.queryByText("Show More")).toBeNull();
});

it("shows the comment's children on click", async () => {
  await setup();

  fireEvent.click(screen.getAllByLabelText("Show children")[0]);
  await waitForContent();

  expect(screen.getByText("Comment #100")).toBeVisible();
  expect(screen.getByText("Comment #104")).toBeVisible();

  fireEvent.click(getAllByLabelText(screen.getByText("Comment #100").closest("div")!, "Show children")[0]);
  await waitForContent();

  expect(screen.getByText("Comment #1000")).toBeVisible();
  expect(screen.getByText("Comment #1004")).toBeVisible();
});
