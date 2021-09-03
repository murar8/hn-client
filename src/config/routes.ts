import { ComponentType } from "react";
import {
  AskChartPage,
  BestChartPage,
  JobChartPage,
  NewChartPage,
  ShowChartPage,
  TopChartPage,
} from "src/pages/ChartPage";
import { Home } from "src/pages/Home";
import { PostPage } from "src/pages/PostPage";

export type Route = {
  name: string;
  path: string;
  Component: ComponentType;
};

export const chartRoutes: Route[] = [
  {
    name: "Best",
    path: "/best",
    Component: BestChartPage,
  },
  {
    name: "New",
    path: "/new",
    Component: NewChartPage,
  },
  {
    name: "Top",
    path: "/top",
    Component: TopChartPage,
  },
  {
    name: "Ask",
    path: "/ask",
    Component: AskChartPage,
  },
  {
    name: "Show",
    path: "/show",
    Component: ShowChartPage,
  },
  {
    name: "Jobs",
    path: "/jobs",
    Component: JobChartPage,
  },
];

export const routes: Route[] = [
  ...chartRoutes,
  {
    name: "Post",
    path: "/item/:id(\\d+)",
    Component: PostPage,
  },
  {
    name: "Home",
    path: "/",
    Component: Home,
  },
];
