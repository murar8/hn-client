import { baseURL, renameKeys, timestampToLocaleString } from "./util";

describe(`${renameKeys.name}`, () => {
  it("should return the input object with the matching keys renamed", () => {
    expect(renameKeys({}, "", "")).toEqual({});
    expect(renameKeys({ a: 1, b: { c: 2 } }, "d", "e")).toEqual({ a: 1, b: { c: 2 } });
    expect(renameKeys({ a: 1, b: { c: 2 } }, "a", "d")).toEqual({ d: 1, b: { c: 2 } });
    expect(renameKeys({ a: 1, b: { c: { d: 2 } } }, "d", "e")).toEqual({ a: 1, b: { c: { e: 2 } } });
    expect(renameKeys({ a: 1, b: { a: 2 } }, "a", "c")).toEqual({ c: 1, b: { c: 2 } });
    expect(renameKeys(["a", "b"], "a", "c")).toEqual({ "0": "a", "1": "b" });
  });
});

describe(`${baseURL.name}`, () => {
  it("should return the base address of the url", () => {
    expect(baseURL("")).toEqual("");
    expect(baseURL("github.com")).toEqual("github.com");
    expect(baseURL("github.com/")).toEqual("github.com");
    expect(baseURL("https://github.com")).toEqual("github.com");
    expect(baseURL("https://www.github.com")).toEqual("github.com");
    expect(baseURL("https://www.github.com/mylittlepony")).toEqual("github.com");
    expect(baseURL("github.com/mylittlepony")).toEqual("github.com");
  });
});

describe(`${timestampToLocaleString.name}`, () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(1118805940 * 1000)); // Wednesday 15 June 2005 03:25:40
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should format the date to a human readable fomat", () => {
    expect(timestampToLocaleString(961039540)).toEqual("6/15/2000");
  });

  it("should not display the year for dates in the present year", () => {
    expect(timestampToLocaleString(1105759540)).toEqual("1/15");
  });

  it("should display the hour and minute for dates less than a day from the present", () => {
    expect(timestampToLocaleString(1118802340)).toEqual("Today, 2:25 AM");
  });
});
