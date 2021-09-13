import { fireEvent, screen, waitFor } from "@testing-library/react";
import { fetchItems } from "src/api";
import { Renderer } from "src/testUtils";
import { usePaginatedItems } from "./queries";

jest.mock("src/api");

describe(`${usePaginatedItems.name}`, () => {
  const ids = Array.from(new Array(100), (_, i) => i + 10);

  (fetchItems as jest.Mock).mockImplementation((ids: number[]) =>
    Promise.resolve(ids.map((id) => ({ id, title: `Item #${id}` })))
  );

  async function waitForContent() {
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
  }

  async function setup() {
    const renderer = Renderer.create().withQueryClient();
    renderer.render(<Component />);
    await waitForContent();
  }

  function Component() {
    const { items, error, isLoading, isError, fetchMore, hasMore } = usePaginatedItems(ids, 10, 20);

    if (isError) return <p>Error: {error}</p>;
    if (isLoading) return <p>Loading...</p>;

    return (
      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
        {hasMore && <button onClick={fetchMore}>More</button>}
      </ul>
    );
  }

  it("provides the items to the component", async () => {
    await setup();
    expect(screen.getAllByText(/Item #\d+/)).toHaveLength(20);
  });

  it("loads more items on demand", async () => {
    await setup();

    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByText("More"));
      await waitForContent();
    }

    expect(screen.getAllByText(/Item #\d+/)).toHaveLength(100);
    expect(screen.queryByText("More")).toBeNull();
  });

  it("informs the user if an error occurs", async () => {
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
    (fetchItems as jest.Mock).mockImplementation(() => Promise.reject("API error"));
    await setup();
    expect(screen.getByText(/API error/)).toBeVisible();
  });
});

describe(`${usePaginatedItems.name}`, () => {
  const ids = Array.from(new Array(100), (_, i) => i + 10);

  (fetchItems as jest.Mock).mockImplementation((ids: number[]) =>
    Promise.resolve(ids.map((id) => ({ id, title: `Item #${id}` })))
  );

  async function waitForContent() {
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
  }

  async function setup() {
    const renderer = Renderer.create().withQueryClient();
    renderer.render(<Component />);
    await waitForContent();
  }

  function Component() {
    const { items, error, isLoading, isError, fetchMore, hasMore } = usePaginatedItems(ids, 10, 20);

    if (isError) return <p>Error: {error}</p>;
    if (isLoading) return <p>Loading...</p>;

    return (
      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
        {hasMore && <button onClick={fetchMore}>More</button>}
      </ul>
    );
  }

  it("informs the user if an error occurs", async () => {
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
    (fetchItems as jest.Mock).mockImplementation(() => Promise.reject("API error"));
    await setup();
    expect(screen.getByText(/API error/)).toBeVisible();
  });
});
