import { Box, Button, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { ErrorOutline, GetApp } from "@material-ui/icons";
import { ReactElement, useMemo, useState } from "react";
import { Banner } from "src/components/Banner";
import { useChart } from "src/context/HackerNewsContext";
import { Loading } from "../Loading";

const BATCH_SIZE_XS = 20;
const BATCH_SIZE_MD = 40;

export type PageProps = {
  chart: "new" | "best" | "top";
  Item: (props: { id: number }) => ReactElement;
};

export function Page({ chart, Item }: PageProps) {
  const result = useChart(chart);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));
  const itemsPerBatch = useMemo(() => (isLarge ? BATCH_SIZE_MD : BATCH_SIZE_XS), [isLarge]);
  const [limit, setLimit] = useState(itemsPerBatch);

  if (result.type === "loading") {
    return <Loading />;
  }

  if (result.type === "error") {
    return <Banner message={result.message} show icon={<ErrorOutline />} />;
  }

  return (
    <Box p={2}>
      <Grid container justifyContent="center" spacing={2}>
        {result.data.slice(0, limit).map((id) => (
          <Grid key={id} item xs={12} md={6}>
            <Item id={id} />
          </Grid>
        ))}
      </Grid>
      {limit < result.data.length && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Button variant="contained" startIcon={<GetApp />} onClick={() => setLimit(limit + itemsPerBatch)}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}
