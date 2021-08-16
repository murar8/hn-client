import { makeStyles, Typography } from "@material-ui/core";
import { usePollopt } from "src/context/HackerNewsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

export type PolloptProps = {
  id: number;
  color: string;
};

export function Pollopt({ id, color }: PolloptProps) {
  const classes = useStyles();
  const result = usePollopt(id);

  return (
    <div className={classes.root}>
      <Typography variant="h5" style={{ color }}>
        {result.type === "data" && result.data.score ? result.data.score : "-"}
      </Typography>
      <Typography variant="body1">{result.type === "data" && result.data.text}</Typography>
    </div>
  );
}
