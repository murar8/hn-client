import { CircularProgress, makeStyles } from "@material-ui/core";
import { renameKeys } from "src/util";

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

export function Loading() {
  const classes = useStyles();
  return <CircularProgress className={classes.spinnerBox} />;
}
