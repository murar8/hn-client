import { Avatar, Button, Divider, Grid, makeStyles, Slide, Typography } from "@material-ui/core";
import { ReactNode } from "react";

export type BannerProps = {
  message: string;
  show: boolean;
  primaryAction?: string;
  secondaryAction?: string;
  onPrimaryAction?: React.MouseEventHandler<HTMLButtonElement>;
  onSecondaryAction?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  buttonRoot: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

export function Banner({
  message,
  show,
  icon,
  primaryAction,
  secondaryAction,
  onPrimaryAction,
  onSecondaryAction,
  ...props
}: BannerProps) {
  const classes = useStyles();

  return (
    <Slide in={show}>
      <div>
        <div className={classes.root}>
          <Grid container spacing={4} alignItems="center" {...props}>
            {icon && (
              <Grid item xs="auto">
                <Avatar>{icon}</Avatar>
              </Grid>
            )}
            <Grid item xs>
              <Typography variant="body1" align="left">
                {message}
              </Typography>
            </Grid>
            {(primaryAction || secondaryAction) && (
              <Grid item xs={12} sm="auto" className={classes.buttonRoot}>
                {secondaryAction && <Button onClick={onSecondaryAction}>{secondaryAction}</Button>}
                {primaryAction && (
                  <Button onClick={onPrimaryAction} variant="outlined">
                    {primaryAction}
                  </Button>
                )}
              </Grid>
            )}
          </Grid>
        </div>
        <Divider variant="fullWidth" />
      </div>
    </Slide>
  );
}
