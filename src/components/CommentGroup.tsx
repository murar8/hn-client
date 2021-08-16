import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ExpandMore, Warning } from "@material-ui/icons";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useComment } from "src/context/HackerNewsContext";

const useStyles = makeStyles((theme) => ({
  group: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  accordion: {
    width: "100%",
    boxShadow: "none",

    // "&:before": {
    //   content: "none",
    // },
  },

  summary: {
    "&:hover:not(.Mui-disabled)": {
      cursor: "default",
    },
  },

  expandable: {
    "&:hover:not(.Mui-disabled)": {
      cursor: "pointer",
    },
  },

  details: {
    paddingRight: 0,
  },
}));

export type IconProps = { type: ReturnType<typeof useComment>["type"] };

export function Icon({ type, ...props }: IconProps) {
  switch (type) {
    case "data":
      return <ExpandMore />;
    case "error":
      return <Warning />;
    case "loading":
      return <CircularProgress size={24} />;
  }
}

export type ContentProps = { result: ReturnType<typeof useComment> };

export function Content({ result }: ContentProps) {
  return (
    <Typography
      variant="body1"
      dangerouslySetInnerHTML={result.type === "data" && result.data.text ? { __html: result.data.text } : undefined}
    >
      {result.type === "error" ? "Error: " + result.message : result.type === "loading" ? "Loading..." : undefined}
    </Typography>
  );
}

export type CommentProps = {
  id: number;
};

export function Comment({ id }: CommentProps) {
  const classes = useStyles();
  const result = useComment(id);
  const [expanded, setExpanded] = useState(false);
  const isExpandable = useMemo(() => result.type === "data" && (result.data.kids?.length ?? 0) > 0, [result]);

  return (
    <Accordion
      className={classes.accordion}
      elevation={0}
      expanded={expanded}
      // TransitionProps={{ mountOnEnter: false }}
      onChange={() => isExpandable && setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={(isExpandable || result.type !== "data") && <Icon type={result.type} />}
        IconButtonProps={{ disabled: true }}
        className={clsx(classes.summary, isExpandable ? classes.expandable : undefined)}
        aria-controls={`comment-content-${id}`}
        id={`comment-header-${id}`}
      >
        <Content result={result} />
      </AccordionSummary>
      {isExpandable && (
        <AccordionDetails className={classes.details}>
          <CommentGroup ids={(result as any).data.kids} />
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export type CommentGroupProps = {
  ids: number[];
};

export function CommentGroup({ ids }: CommentGroupProps) {
  const classes = useStyles();

  return (
    <div className={classes.group}>
      {ids.map((id) => (
        <Comment key={id} id={id} />
      ))}
    </div>
  );
}
