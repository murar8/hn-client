import { Button, makeStyles, Typography } from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";
import { baseURL } from "src/util";

export const useStyles = makeStyles((theme) => ({
  link: {
    textTransform: "none",
  },
}));

export type SubheaderProps = { url: string };

export function Subheader({ url }: SubheaderProps) {
  const classes = useStyles();
  return (
    <Button
      startIcon={<OpenInNew />}
      className={classes.link}
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <Typography color="textSecondary" variant="body1">
        {baseURL(url)}
      </Typography>
    </Button>
  );
}
