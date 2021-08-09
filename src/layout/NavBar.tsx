import { AppBar, makeStyles, Slide, SvgIcon, Tab, TabProps, Tabs, Toolbar, useScrollTrigger } from "@material-ui/core";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Children, isValidElement, PropsWithChildren, useMemo } from "react";
import { Link, LinkProps, matchPath, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tabs: {
    flexGrow: 1,
    width: "100%",
    marginLeft: theme.spacing(2),
  },

  logo: {
    color: theme.palette.background.default,
  },
}));

export type NavBarProps = PropsWithChildren<{}>;

export function NavBar({ children, ...props }: NavBarProps) {
  const trigger = useScrollTrigger();
  const { pathname } = useLocation();
  const classes = useStyles();

  const value = useMemo(
    () =>
      Children.toArray(children)
        .map((child) =>
          isValidElement(child) && "to" in child.props && typeof child.props.to === "string"
            ? child.props.to
            : undefined
        )
        .findIndex((path) => matchPath(pathname, { path })),
    [pathname, children]
  );

  return (
    <Slide appear={false} direction="down" in={!trigger} {...props}>
      <AppBar>
        <Toolbar>
          <SvgIcon className={classes.logo}>
            <Logo />
          </SvgIcon>
          <Tabs centered aria-label="navigation tabs" value={value !== -1 ? value : false} className={classes.tabs}>
            {children}
          </Tabs>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export type NavBarLinkProps = Omit<TabProps<Link>, "component"> & Pick<LinkProps, "to" | "replace">;

export function NavBarLink({ to, replace, ...props }: NavBarLinkProps) {
  return <Tab component={Link} to={to} replace={replace} {...props} />;
}
