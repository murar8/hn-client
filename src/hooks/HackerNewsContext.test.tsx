import { render, screen } from "@testing-library/react";
import * as hooks from "react-firebase-hooks/database";
import { HackerNewsProvider, useChart, useHackerNewsContext, useItem, usePost } from "./HackerNewsContext";

describe(`${useHackerNewsContext.name}`, () => {
  const Component = () => {
    useHackerNewsContext();
    return <div />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should provide a database reference to users", async () => {
    expect(() => render(<Component />, { wrapper: (props) => <HackerNewsProvider {...props} /> })).not.toThrow();
  });

  it("should throw an error when no provider instance is in the tree", async () => {
    console.error = jest.fn();
    expect(() => render(<Component />)).toThrowError();
  });
});

describe(`${useItem.name}`, () => {
  const Component = () => {
    const [item, loading, error] = useItem(100);
    return error ? <div>Error: {error.message}</div> : loading ? <div>Loading</div> : <div>ID: {item!.id}</div>;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return the item content", async () => {
    jest.spyOn(hooks, "useObjectVal").mockReturnValue([{ id: 100 } as any, false, undefined]);
    render(<Component />, { wrapper: (props) => <HackerNewsProvider {...props} /> });
    expect(screen.queryByText("ID: 100")).toBeTruthy();
  });

  [
    { name: "should forward any error from the API", value: [undefined, false, Error("Something went wrong")] },
    { name: "should throw an error when the item is empty", value: [undefined, false, undefined] },
    {
      name: "should throw an error when the item is deleted",
      value: [{ id: 100, deleted: true }, false, undefined],
    },
  ].forEach(({ name, value }) => {
    it(`${name}`, async () => {
      jest.spyOn(hooks, "useObjectVal").mockReturnValue(value as any);
      render(<Component />, { wrapper: (props) => <HackerNewsProvider {...props} /> });
      expect(screen.queryByText(/Error: .*/)).toBeTruthy();
    });
  });
});

describe(`${usePost.name}`, () => {
  const Component = () => {
    const [item, loading, error] = usePost(100);
    return error ? <div>Error: {error.message}</div> : loading ? <div>Loading</div> : <div>ID: {item!.id}</div>;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return the item content", async () => {
    jest.spyOn(hooks, "useObjectVal").mockReturnValue([{ id: 100, type: "story" } as any, false, undefined]);
    render(<Component />, { wrapper: (props) => <HackerNewsProvider {...props} /> });
    expect(screen.queryByText("ID: 100")).toBeTruthy();
  });

  [
    { name: "should forward any error from the API", value: [undefined, false, Error("Something went wrong")] },
    {
      name: "should throw an error when the item is invalid",
      value: [{ id: 100, type: "comment" }, false, undefined],
    },
  ].forEach(({ name, value }) => {
    it(`${name}`, async () => {
      jest.spyOn(hooks, "useObjectVal").mockReturnValue(value as any);
      render(<Component />, { wrapper: (props) => <HackerNewsProvider {...props} /> });
      expect(screen.queryByText(/Error: .*/)).toBeTruthy();
    });
  });
});

describe(`${useChart.name}`, () => {
  const Component = () => {
    const [item, loading, error] = useChart("new");
    return error ? (
      <div>Error: {error.message}</div>
    ) : loading ? (
      <div>Loading</div>
    ) : (
      <div>
        {item!.map((item) => (
          <p key={item}>ID: {item}</p>
        ))}
      </div>
    );
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return only unique values", async () => {
    jest.spyOn(hooks, "useListVals").mockReturnValue([[100, 101, 102] as any, false, undefined]);
    render(<Component />, { wrapper: (props) => <HackerNewsProvider {...props} /> });
    expect(screen.queryAllByText(/ID: .+/)).toHaveLength(3);
  });
});
