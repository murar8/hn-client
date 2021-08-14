import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ChatBubble, Person, Schedule, ThumbUp, Warning } from "@material-ui/icons";
import { ReactNode } from "react";
import { useItem } from "src/hooks/HackerNewsContext";
import { baseURL, formatTimestamp } from "src/util";

const useStyles = makeStyles((theme) => ({
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

  tags: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },

  tag: {
    paddingRight: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
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

type TagProps = {
  icon?: ReactNode;
  label?: string;
};

function Tag({ icon, label }: TagProps) {
  const classes = useStyles();

  return (
    <div className={classes.tag}>
      {icon}
      <Typography variant="body1"> {label}</Typography>
    </div>
  );
}

export type ItemProps = {
  id: number;
};

export function Item({ id }: ItemProps) {
  const classes = useStyles();
  const [item, loading, error] = useItem(id);

  const errorMessage = error
    ? error.message
    : !item
    ? `Invalid item ID: ${id}`
    : item.deleted
    ? `Item with ID ${id} is deleted.`
    : !["story", "job", "poll"].includes(item.type!)
    ? `Item with ID ${id} is not a post.`
    : undefined;

  return (
    <Card className={classes.root} onClick={() => {}}>
      {loading ? (
        <CardContent className={classes.loader}>
          <CircularProgress />
        </CardContent>
      ) : errorMessage ? (
        <CardHeader avatar={<Warning />} title="An error occured" subheader={errorMessage} />
      ) : (
        <CardActionArea href={item!.url || ""} target={item!.url ? "_blank" : undefined} className={classes.actionArea}>
          <CardHeader
            title={item!.title}
            subheader={item!.url ? baseURL(item!.url!) : undefined}
            className={item!.dead ? classes.disabled : undefined}
          />
          <CardContent className={classes.tags}>
            <Tag icon={<Person />} label={item!.by} />
            <Tag icon={<ThumbUp />} label={item!.score!.toString()} />
            <Tag icon={<Schedule />} label={formatTimestamp(item!.time!)} />
            <Tag icon={<ChatBubble />} label={item!.descendants?.toString()} />
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
}
