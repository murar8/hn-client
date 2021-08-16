import { render, RenderOptions, screen } from "@testing-library/react";
import * as databaseHooks from "react-firebase-hooks/database";
import {
  dataToResult,
  HackerNewsProvider,
  Result,
  useComment,
  useHackerNewsContext,
  useItem,
  usePollopt,
  usePost,
} from "./HackerNewsContext";

function renderWithContext(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { ...options, wrapper: (props) => <HackerNewsProvider {...props} /> });
}

function ResultView({ result }: { result: Result<any> }) {
  switch (result.type) {
    case "error":
      return <div>Error: {result.message}</div>;
    case "loading":
      return <div>Loading</div>;
    case "data":
      return <div>ID: {result.data.id}</div>;
  }
}

describe(`${useHackerNewsContext.name}`, () => {
  const Component = () => {
    useHackerNewsContext();
    return <div />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should render without crashing", async () => {
    expect(() => renderWithContext(<Component />)).not.toThrow();
  });

  it("should throw an error when no provider instance is in the tree", async () => {
    console.error = jest.fn();
    expect(() => render(<Component />)).toThrow();
  });
});

describe(`${dataToResult.name}`, () => {
  it("should return a loading result when the loading argument is true", async () => {
    expect(dataToResult(undefined, true, undefined)).toEqual({ type: "loading" });
  });

  it("should return an error result when the error argument is true", async () => {
    expect(dataToResult(undefined, false, Error("Something went wrong."))).toEqual({
      type: "error",
      message: "Something went wrong.",
    });
  });

  it("should return an error result when the item doesn't exist", async () => {
    expect(dataToResult(undefined, false, undefined)).toEqual({
      type: "error",
      message: expect.any(String),
    });
  });

  it("should return a data result when the item is valid", async () => {
    expect(dataToResult({ a: 10 }, false, undefined)).toEqual({
      type: "data",
      data: { a: 10 },
    });
  });
});

describe(`${useItem.name}`, () => {
  const Component = () => {
    const result = useItem(100);
    return <ResultView result={result} />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return the item's data", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([{ id: 100 } as any, false, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText("ID: 100")).toBeTruthy();
  });

  it("should return the item's loading status", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([undefined, true, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText("Loading")).toBeTruthy();
  });

  it("should return an error when the item is deleted", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([{ id: 100, deleted: true } as any, false, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText(/Error: .+/)).toBeTruthy();
  });
});

describe(`${usePost.name}`, () => {
  const Component = () => {
    const result = usePost(100);
    return <ResultView result={result} />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return an error when the item is invalid", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([{ id: 100, type: "comment" } as any, false, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText(/Error: .+/)).toBeTruthy();
  });
});

describe(`${usePollopt.name}`, () => {
  const Component = () => {
    const result = usePollopt(100);
    return <ResultView result={result} />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return an error when the item is invalid", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([{ id: 100, type: "comment" } as any, false, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText(/Error: .+/)).toBeTruthy();
  });
});

describe(`${usePollopt.name}`, () => {
  const Component = () => {
    const result = usePollopt(100);
    return <ResultView result={result} />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return an error when the item is invalid", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([{ id: 100, type: "comment" } as any, false, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText(/Error: .+/)).toBeTruthy();
  });
});

describe(`${usePollopt.name}`, () => {
  const Component = () => {
    const result = usePollopt(100);
    return <ResultView result={result} />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return an error when the item is invalid", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([{ id: 100, type: "comment" } as any, false, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText(/Error: .+/)).toBeTruthy();
  });
});

describe(`${useComment.name}`, () => {
  const Component = () => {
    const result = useComment(100);
    return <ResultView result={result} />;
  };

  beforeAll(() => {
    jest.mock("firebase/app");
  });

  it("should return an error when the item is invalid", async () => {
    jest.spyOn(databaseHooks, "useObjectVal").mockReturnValue([{ id: 100, type: "story" } as any, false, undefined]);
    renderWithContext(<Component />);
    expect(screen.queryByText(/Error: .+/)).toBeTruthy();
  });
});
