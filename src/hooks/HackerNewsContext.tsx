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

function useHackerNewsContext() {
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
  return useObjectVal(db.child("item").child(id.toString()));
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
