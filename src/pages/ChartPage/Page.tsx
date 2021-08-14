import { Box, Button, CircularProgress, Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { ErrorOutline, GetApp } from "@material-ui/icons";
import { ReactElement, useMemo, useState } from "react";
import { Banner } from "src/components/Banner";
import { useChart } from "src/hooks/HackerNewsContext";
import { renameKeys } from "src/util";
import { Item as HNItem } from "./Item";

const BATCH_SIZE_XS = 20;
const BATCH_SIZE_MD = 40;

const useStyles = makeStyles((theme) => ({
  spinnerBox: {
    ...renameKeys(theme.mixins.toolbar, "minHeight", "top"),
    position: "fixed",
    left: "0",
    right: "0",
    bottom: "0",
    margin: "auto",
  },
}));

export type PageProps = {
  chart: "new" | "best" | "top";
  Item: (props: { id: number }) => ReactElement;
};

export function Page({ chart, Item }: PageProps) {
  const classes = useStyles();
  const [ids, loading, error] = useChart(chart);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));
  const itemsPerBatch = useMemo(() => (isLarge ? BATCH_SIZE_MD : BATCH_SIZE_XS), [isLarge]);
  const [limit, setLimit] = useState(itemsPerBatch);

  if (loading) {
    return <CircularProgress className={classes.spinnerBox} />;
  }

  if (error || !ids) {
    return (
      <Banner
        message={error ? error.message : "An error occured while retrieving the data."}
        show
        icon={<ErrorOutline />}
      />
    );
  }

  return (
    <Box p={2}>
      <Grid container justifyContent="center" spacing={2}>
        {ids?.slice(0, limit).map((id) => (
          <Grid key={id} item xs={12} md={6}>
            <Item id={id} />
          </Grid>
        ))}
      </Grid>
      {limit < ids.length && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Button variant="contained" startIcon={<GetApp />} onClick={() => setLimit(limit + itemsPerBatch)}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export function TopStoriesPage() {
  return <Page Item={HNItem} chart="top" />;
}

export function BestStoriesPage() {
  return <Page Item={HNItem} chart="best" />;
}

export function NewStoriesPage() {
  return <Page Item={HNItem} chart="new" />;
}
