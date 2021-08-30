const API_URL = "https://hacker-news.firebaseio.com";
const API_VERSION = "v0";

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
  const url = `${API_URL}/${API_VERSION}/${path}.json`;
  const response = await fetch(url);
  const json = await response.json();
  if (json === null) throw new Error("Item does not exist.");
  else return json;
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
