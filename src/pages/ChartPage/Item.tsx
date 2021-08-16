import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ItemInfo } from "src/components/ItemInfo";
import { usePost } from "src/context/HackerNewsContext";
import { Subheader } from "../../components/Subheader";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  spacer: {
    padding: theme.spacing(0.5),
  },

  disabled: {
    color: theme.palette.text.disabled,
  },

  actionArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "100%",
  },
}));

export type ItemProps = {
  id: number;
};

export function Item({ id }: ItemProps) {
  const classes = useStyles();
  const history = useHistory();
  const result = usePost(id);

  return (
    <Card className={classes.root}>
      {result.type === "loading" ? (
        <CardContent className={classes.loader}>
          <CircularProgress />
        </CardContent>
      ) : result.type === "error" ? (
        <CardHeader avatar={<Warning />} title="An error occured" subheader={result.message} />
      ) : (
        <CardActionArea className={classes.actionArea} onClick={() => history.push(`/posts/${id}`)}>
          <CardHeader
            disableTypography
            title={<Typography variant="h5">{result.data.title}</Typography>}
            subheader={result.data.url ? <Subheader url={result.data.url} /> : undefined}
            className={result.data.dead ? classes.disabled : undefined}
          />
          <CardContent className={classes.content}>
            <ItemInfo
              by={result.data.by}
              time={result.data.time}
              score={result.data.score}
              descendants={result.data.descendants}
            />
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
}
