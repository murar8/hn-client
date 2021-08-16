import { makeStyles, Typography } from "@material-ui/core";
import { ChatBubble, Person, Schedule, ThumbUp } from "@material-ui/icons";
import { PropsWithChildren, ReactNode } from "react";
import { formatTimestamp } from "src/util";

const useStyles = makeStyles((theme) => ({
  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },

  tag: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

type TagsProps = PropsWithChildren<{}>;

function Tags(props: TagsProps) {
  const classes = useStyles();
  return <div className={classes.tags} {...props} />;
}

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

export type ItemInfoProps = {
  by?: string;
  time?: number;
  score?: number;
  descendants?: number;
};

export function ItemInfo({ by, time, score, descendants }: ItemInfoProps) {
  return (
    <Tags>
      {by && <Tag icon={<Person />} label={by} />}
      {score && <Tag icon={<ThumbUp />} label={score.toString()} />}
      {time && <Tag icon={<Schedule />} label={formatTimestamp(time)} />}
      {descendants && <Tag icon={<ChatBubble />} label={descendants.toString()} />}
    </Tags>
  );
}
