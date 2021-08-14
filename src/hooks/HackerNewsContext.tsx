import firebase from "firebase/app";
import "firebase/database";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
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
    throw new Error("No HackerNewsProvider instance was found in the component tree.");
  }

  return context;
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

export function useItem(id: number): [Item | undefined, boolean, Error | undefined] {
  const db = useHackerNewsContext();
  const [item, loading, apiError] = useObjectVal(db.child("item").child(id.toString()));

  const error = apiError
    ? apiError
    : loading
    ? undefined
    : !item
    ? Error(`Invalid item ID: ${id}`)
    : item.deleted
    ? Error(`Item with ID ${id} is deleted.`)
    : undefined;

  return [item, loading, error];
}

export type Post = Omit<Item, "parent" | "poll" | "parts" | "type"> & { type: "job" | "story" | "poll" };

export function usePost(id: number): [Item | undefined, boolean, Error | undefined] {
  const [item, loading, apiError] = useItem(id);

  const error = apiError
    ? apiError
    : loading
    ? undefined
    : !["story", "job", "poll"].includes(item!.type!)
    ? Error(`Item with ID ${id} is not a post.`)
    : undefined;

  return [item, loading, error];
}

export type User = {
  id: string;
  created: number;
  karma: number;
  about: string;
  submitted: number[];
};

export function useUser(id: string): [User | undefined, boolean, Error | undefined] {
  const db = useHackerNewsContext();
  return useObjectVal(db.child("user").child(id));
}

export function useChart(chart: "new" | "best" | "top"): [number[] | undefined, boolean, Error | undefined] {
  const db = useHackerNewsContext();
  const [ids, loading, error] = useListVals<number>(db.child(chart + "stories"));
  const uniqueIds = useMemo(() => Array.from(new Set(ids)), [ids]);
  return [uniqueIds, loading, error];
}
