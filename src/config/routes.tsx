function Placeholder(value: string) {
  return () => (
    <div>
      {[...Array(200)].map((_, i) => (
        <div key={i}>{value}</div>
      ))}
    </div>
  );
}

export const routes = [
  {
    name: "Best",
    path: "/best",
    Component: Placeholder("Best"),
  },
  {
    name: "Top",
    path: "/top",
    Component: Placeholder("Top"),
  },
  {
    name: "New",
    path: "/new",
    Component: Placeholder("New"),
  },
];
