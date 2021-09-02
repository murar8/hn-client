import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ItemData } from "./ItemData";

function Component() {
  return <ItemData by="dirty_john" descendants={123} score={14} time={45800740} />;
}

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(1118805940 * 1000)); // Wednesday 15 June 2005 03:25:40
});

afterAll(() => {
  jest.useRealTimers();
});

it("displays the item data", async () => {
  render(<Component />);
  expect(screen.getByText("dirty_john")).toBeVisible();
  expect(screen.getByText("123")).toBeVisible();
  expect(screen.getByText("14")).toBeVisible();
  expect(screen.getByText("6/15/1971")).toBeVisible();
});
