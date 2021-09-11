import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { fetchChart, fetchItem } from "src/api";
import { Renderer } from "src/testUtils";
import { useChart } from "./useChart";

jest.mock("src/api");

function Component() {
  const { items, error, loading, loadMore } = useChart("top", 5, 20);

  return (
    <div>
      {items?.map(({ id, title }) => (
        <p key={id} role="listitem">
          {title}
        </p>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={loadMore}>Load more</button>
    </div>
  );
}

async function setup() {
  const renderer = Renderer.create().withSWRConfig();
  renderer.render(<Component />);
  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
}

beforeAll(() => {
  (fetchChart as jest.Mock).mockImplementation(() => {
    return Promise.resolve(Array.from(new Array(100), (_, i) => i * 1000));
  });

  (fetchItem as jest.Mock).mockImplementation((id: number) => {
    return Promise.resolve({ id, title: `Post #${id}` });
  });
});

it("provides a list of items", async () => {
  await setup();
  await waitFor(() => expect(screen.getAllByText(/Post #\d+/)).toHaveLength(20));
  expect(screen.getByText("Post #0")).toBeVisible();
  expect(screen.getByText("Post #19000")).toBeVisible();
});

it("provides more items on demand", async () => {
  await setup();
  fireEvent.click(screen.getByText("Load more"));
  await waitFor(() => expect(screen.getAllByText(/Post #\d+/)).toHaveLength(25));
  expect(screen.getByText("Post #20000")).toBeVisible();
  expect(screen.getByText("Post #24000")).toBeVisible();
});

it("does not load more items when the bottom of the list is reached", async () => {
  await setup();

  for (let i = 0; i < 30; i++) {
    fireEvent.click(screen.getByText("Load more"));
  }

  await waitFor(() => expect(screen.getAllByText(/Post #\d+/)).toHaveLength(100));
});

it("stops loading if the amount of ids is less than the initial batch size", async () => {
  (fetchChart as jest.Mock).mockImplementation(() => {
    return Promise.resolve(Array.from(new Array(10), (_, i) => i * 1000));
  });

  await setup();
});

[fetchChart, fetchItem].forEach((fetchFn) => {
  it(`provides the ${fetchFn.name} error to the user`, async () => {
    (fetchFn as jest.Mock).mockImplementationOnce(() => Promise.reject("Internal error"));
    await setup();
    await waitFor(() => expect(screen.getByText("Error: Internal error")).toBeVisible());
  });
});
