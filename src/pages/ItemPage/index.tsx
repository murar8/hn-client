import { Container, makeStyles, Typography } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import { useRouteMatch } from "react-router-dom";
import { Banner } from "src/components/Banner";
import { CommentGroup } from "src/components/CommentGroup";
import { ItemInfo } from "src/components/ItemInfo";
import { Pollopt } from "src/components/Pollopt";
import { Subheader } from "src/components/Subheader";
import { usePost } from "src/context/HackerNewsContext";
import { rainbow } from "src/util";
import { Loading } from "../Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2),
    gap: theme.spacing(4),
  },

  link: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
  },

  disabled: {
    color: theme.palette.text.disabled,
  },
}));

export function ItemPage() {
  const classes = useStyles();
  const id = useRouteMatch<{ id: string }>("/posts/:id")!.params["id"];
  const result = usePost(parseInt(id));

  if (result.type === "loading") {
    return <Loading />;
  }

  if (result.type === "error") {
    return <Banner message={result.message} show icon={<ErrorOutline />} />;
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h5" component="h1" className={result.data.dead ? classes.disabled : undefined}>
        {result.data.title}
      </Typography>
      {result.data.url && <Subheader url={result.data.url} />}
      {result.data.text && <Typography variant="body1">{result.data.text}</Typography>}
      {result.data.type === "poll" &&
        result.data.parts &&
        result.data.parts.map((optID, i) => (
          <Pollopt key={optID} id={optID} color={rainbow(result.data.parts!.length, i)} />
        ))}
      <ItemInfo
        by={result.data.by}
        time={result.data.time}
        score={result.data.score}
        descendants={result.data.descendants}
      />
      {result.data.kids && <CommentGroup ids={result.data.kids} />}
    </Container>
  );
}
