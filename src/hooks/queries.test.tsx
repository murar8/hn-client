import { fireEvent, screen, waitFor } from "@testing-library/react";
import { ReactElement } from "react";
import { fetchItems } from "src/api";
import { Renderer } from "src/testUtils";
import { useChart, useItem, useItems, usePaginatedItems } from "./queries";

jest.mock("src/api", () => ({
  fetchChart: jest.fn(() => Promise.resolve([1000, 1001, 1002])),
  fetchItem: jest.fn((id: number) => Promise.resolve({ id, title: `Post #${id}` })),
  fetchItems: jest.fn((ids: number[]) => Promise.resolve(ids.map((id) => ({ id, title: `Post #${id}` })))),
}));

async function waitForContent() {
  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
}

async function setup(component: ReactElement) {
  const renderer = Renderer.create().withQueryClient();
  renderer.render(component);
  await waitForContent();
}

describe(`${useItem.name}`, () => {
  function Component() {
    const { data, isLoading } = useItem(1200);
    if (isLoading) return <p>Loading...</p>;
    return <p>{data?.title}</p>;
  }

  it("provides the item to the component", async () => {
    await setup(<Component />);
    expect(screen.getByText("Post #1200")).toBeVisible();
  });
});

describe(`${useChart.name}`, () => {
  function Component() {
    const { data, isLoading } = useChart("ask");
    if (isLoading) return <p>Loading...</p>;

    return (
      <ul>
        {data!.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    );
  }

  it("provides the chart to the component", async () => {
    await setup(<Component />);
    expect(screen.getByText("1000")).toBeVisible();
    expect(screen.getByText("1001")).toBeVisible();
    expect(screen.getByText("1002")).toBeVisible();
  });
});

describe(`${useItems.name}`, () => {
  function Component() {
    const { data, isLoading } = useItems([1000, 1001, 1002]);

    if (isLoading) return <p>Loading...</p>;

    return (
      <ul>
        {data!.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    );
  }

  it("provides the ids to the component", async () => {
    await setup(<Component />);
    expect(screen.getByText("Post #1000")).toBeVisible();
    expect(screen.getByText("Post #1001")).toBeVisible();
    expect(screen.getByText("Post #1002")).toBeVisible();
  });
});

describe(`${usePaginatedItems.name}`, () => {
  const ids = Array.from(new Array(100), (_, i) => i + 10);

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
    await setup(<Component />);
    expect(screen.getAllByText(/Post #\d+/)).toHaveLength(20);
  });

  it("loads more items on demand", async () => {
    await setup(<Component />);

    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByText("More"));
      await waitForContent();
    }

    expect(screen.getAllByText(/Post #\d+/)).toHaveLength(100);
    expect(screen.queryByText("More")).toBeNull();
  });

  it("informs the user if an error occurs", async () => {
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
    (fetchItems as jest.Mock).mockImplementation(() => Promise.reject("API error"));
    await setup(<Component />);
    expect(screen.getByText(/API error/)).toBeVisible();
  });
});
