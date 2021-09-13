import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor } from "@testing-library/react";
import { Renderer } from "src/testUtils";
import PostPage from ".";

jest.mock("src/api", () => ({
  fetchItem: jest.fn((id: number) => {
    return Promise.resolve({
      id,
      title: `Post #${id}`,
      url: `https://github.com`,
      text: `Content #${id}`,
      by: "dang",
      score: 200,
    });
  }),
}));

async function waitForContent() {
  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
}

async function setup() {
  const renderer = Renderer.create()
    .withQueryClient()
    .withRouter({ initialEntries: ["/post/1250"] });

  renderer.render(<PostPage />);

  await waitForContent();
}

it("displays the post contents", async () => {
  await setup();
  expect(screen.getByText("Post #1250")).toBeVisible();
  expect(screen.getByText("Content #1250")).toBeVisible();
  expect(screen.getByText("200")).toBeVisible();
  expect(screen.getByText("dang")).toBeVisible();
  expect(screen.getByText("github.com")).toBeVisible();
});
