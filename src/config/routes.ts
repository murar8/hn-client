import { BestStoriesPage, NewStoriesPage, TopStoriesPage } from "src/pages/ChartPage/Page";

export const routes = [
  {
    name: "Best",
    path: "/best",
    Component: BestStoriesPage,
  },
  {
    name: "Top",
    path: "/top",
    Component: TopStoriesPage,
  },
  {
    name: "New",
    path: "/new",
    Component: NewStoriesPage,
  },
];
