import fetchMock from "jest-fetch-mock";
import { fetchChart, fetchData, fetchItem, fetchItems } from "./api";

const responses: Record<string, any> = {
  "https://hacker-news.firebaseio.com/v0/topstories.json": [1000, 1001, 1002],
  "https://hacker-news.firebaseio.com/v0/item/1000.json": { id: 1000, type: "story" },
  "https://hacker-news.firebaseio.com/v0/item/1001.json": { id: 1001, deleted: true },
  "https://hacker-news.firebaseio.com/v0/item/1002.json": { id: 1002 },
  "https://hacker-news.firebaseio.com/v0/item/1003.json": { id: 1003 },
  "https://hacker-news.firebaseio.com/v0/item/1004.json": { id: 1004 },
};

function mockFetch() {
  fetchMock.mockResponse((request) => Promise.resolve(JSON.stringify(responses[request.url])));
}

describe(`${fetchData.name}`, () => {
  beforeAll(mockFetch);

  it("fetches the data", async () => {
    await expect(fetchData("topstories")).resolves.toEqual([1000, 1001, 1002]);
  });

  it("forwards fetch errors", async () => {
    fetchMock.mockReject(new Error());
    await expect(fetchData("topstories")).rejects.toThrowError();
    fetchMock.mockRestore();
  });

  it("throws an error if the item does not exist", async () => {
    await expect(fetchData("lamestories")).rejects.toThrowError();
  });
});

describe(`${fetchChart.name}`, () => {
  beforeAll(mockFetch);

  it("fetches the chart", async () => {
    await expect(fetchChart("top")).resolves.toEqual([1000, 1001, 1002]);
  });
});

describe(`${fetchItem.name}`, () => {
  beforeAll(mockFetch);

  it("fetches the item", async () => {
    await expect(fetchItem(1000)).resolves.toEqual({ id: 1000, type: "story" });
  });
});

describe(`${fetchItems.name}`, () => {
  beforeAll(mockFetch);

  it("fetches the items", async () => {
    await expect(fetchItems([1002, 1003, 1004])).resolves.toEqual([{ id: 1002 }, { id: 1003 }, { id: 1004 }]);
  });
});
