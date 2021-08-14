import { baseURL, renameKeys } from "./util";

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
