import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";

const API_URL = "https://hacker-news.firebaseio.com";
const API_VERSION = "v0";

initializeApp({ databaseURL: API_URL });

const database = ref(getDatabase(), API_VERSION);

export type Chart = "new" | "best" | "top" | "ask" | "show" | "job";

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
  [key: string]: unknown;
};

export type User = {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
  [key: string]: unknown;
};

export async function fetchData(path: string) {
  const ref = child(database, path);
  const snap = await get(ref);
  if (!snap.exists) throw new Error(`Item at path ${path} does not exist.`);
  else return snap.val();
}

export async function fetchChart(chart: Chart) {
  return fetchData(`${chart}stories`) as Promise<number[]>;
}

export async function fetchItem(id: number) {
  return fetchData(`item/${id}`) as Promise<Item>;
}

export async function fetchItems(ids: number[]) {
  return Promise.all(ids.map(fetchItem));
}
