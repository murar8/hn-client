import { Item as HNItem } from "./Item";
import { Page } from "./Page";

export function TopStoriesPage() {
  return <Page Item={HNItem} chart="top" />;
}

export function BestStoriesPage() {
  return <Page Item={HNItem} chart="best" />;
}

export function NewStoriesPage() {
  return <Page Item={HNItem} chart="new" />;
}
