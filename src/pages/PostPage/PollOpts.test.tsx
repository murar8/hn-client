import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor } from "@testing-library/react";
import { fetchItems } from "src/api";
import { Renderer } from "src/testUtils";
import { PollOpts } from "./PollOpts";

jest.mock("src/api");

const ids = [1000, 1100, 1200];

async function setup() {
  const renderer = Renderer.create().withSWRConfig();
  renderer.render(<PollOpts ids={ids} />);
  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
}

it("displays the supplied poll options", async () => {
  (fetchItems as jest.Mock).mockImplementation((ids: number[]) => {
    return Promise.resolve(ids.map((id) => ({ id, text: `Post #${id}`, score: id / 100 })));
  });

  await setup();

  ids.forEach((id) => {
    expect(screen.getByText(id / 100)).toBeVisible();
    expect(screen.getByText(`Post #${id}`)).toBeVisible();
  });
});

it("filters empty items", async () => {
  (fetchItems as jest.Mock).mockImplementation((ids: number[]) => {
    return Promise.resolve(ids.map((id) => ({ id })));
  });

  await setup();

  ids.forEach((id) => {
    expect(screen.queryByText(`Post #${id}`)).toBeNull();
  });
});
