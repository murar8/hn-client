import firebase from "firebase/app";
import "firebase/database";
import { createContext, PropsWithChildren, useContext } from "react";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";

const API_URL = "https://hacker-news.firebaseio.com";
const API_VERSION = "v0";

const HackerNewsContext = createContext<firebase.database.Reference | undefined>(undefined);

export function HackerNewsProvider(props: PropsWithChildren<{}>) {
  const name = HackerNewsProvider.name + "_" + firebase.apps.length.toString();
  const app = firebase.initializeApp({ databaseURL: API_URL }, name);
  const database = app.database().ref(API_VERSION);
  return <HackerNewsContext.Provider value={database} {...props} />;
}

export function useHackerNewsContext() {
  const context = useContext(HackerNewsContext);

  if (!context) {
    throw new Error(`No ${HackerNewsProvider.name} instance was found in the component tree.`);
  }

  return context;
}

export type Result<T> = { type: "data"; data: T } | { type: "loading" } | { type: "error"; message: string };

export function dataToResult<T>(data: T | undefined, loading: boolean, error: Error | undefined): Result<T> {
  if (loading) {
    return { type: "loading" };
  }

  if (error) {
    return { type: "error", message: error.message };
  }

  if (!data) {
    return { type: "error", message: "The item does not exist." };
  }

  return { type: "data", data };
}

export function useList<T>(path: string): Result<T[]> {
  const db = useHackerNewsContext();
  return dataToResult(...useListVals<T>(db.child(path)));
}

export function useObject<T>(path: string): Result<T> {
  const db = useHackerNewsContext();
  return dataToResult(...useObjectVal<T>(db.child(path)));
}

export type Item = {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};

export function useItem(id: number): Result<Item> {
  const result = useObject<Item>(`item/${id}`);

  if (result.type === "data" && result.data.deleted) {
    return { type: "error", message: `Item with ID ${id} is deleted.` };
  }

  return result;
}

export function useChart(chart: "new" | "best" | "top" | "ask" | "show" | "jobs"): Result<number[]> {
  const result = useList<number>(chart + "stories");
  // const uniqueIds = useMemo(() => Array.from(new Set(ids)), [ids]);
  return result;
}

export type Post = Omit<Item, "parent" | "poll" | "type"> & { type: "job" | "story" | "poll" };

function isPost(item?: Item): item is Post {
  return item !== undefined && item.type !== undefined && ["story", "job", "poll"].includes(item.type);
}

export function usePost(id: number): Result<Post> {
  const result = useItem(id);

  if (result.type === "data" && !isPost(result.data)) {
    return { type: "error", message: `Item with ID ${id} is not a post.` };
  }

  return result as Result<Post>;
}

export type Pollopt = Omit<Item, "parent" | "kids" | "url" | "title" | "type" | "descendants" | "parts"> & {
  type: "pollopt";
};

function isPollopt(item?: Item): item is Pollopt {
  return item !== undefined && item.type !== undefined && item.type === "pollopt";
}

export function usePollopt(id: number): Result<Pollopt> {
  const result = useItem(id);

  if (result.type === "data" && !isPollopt(result.data)) {
    return { type: "error", message: `Item with ID ${id} is not a pollopt.` };
  }

  return result as Result<Pollopt>;
}

export type Comment = Omit<Item, "type" | "poll" | "url" | "parts" | "title" | "descendants"> & {
  type: "comment";
};

function isComment(item?: Item): item is Comment {
  return item !== undefined && item.type !== undefined && item.type === "comment";
}

export function useComment(id: number): Result<Comment> {
  const result = useItem(id);

  if (result.type === "data" && !isComment(result.data)) {
    return { type: "error", message: `Item with ID ${id} is not a comment.` };
  }

  return result as Result<Comment>;
}

// export type User = {
//   id: string;
//   created: number;
//   karma: number;
//   about: string;
//   submitted: number[];
// };
