import { CssBaseline, makeStyles, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { darkTheme, lightTheme } from "src/config/themes";
import { NavBar, NavBarLink } from "src/layout/NavBar";
import { NamedRoute } from "./components/NamedRoute";
import { HackerNewsProvider } from "./context/HackerNewsContext";
import { BestStoriesPage, NewStoriesPage, TopStoriesPage } from "./pages/ChartPage";
import { ItemPage } from "./pages/ItemPage";

const tabs = [
  {
    name: "Best",
    path: "/best",
    Component: BestStoriesPage,
  },
  {
    name: "Top",
    path: "/top",
    Component: TopStoriesPage,
  },
  {
    name: "New",
    path: "/new",
    Component: NewStoriesPage,
  },
];

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: {
    ...theme.mixins.toolbar,
  },
}));

const createTabID = (path: string) => `nav-tab-${path.substr(1)}`;
const createPanelID = (path: string) => `nav-tabpanel-${path.substr(1)}`;

function Nav() {
  const classes = useStyles();

  return (
    <nav>
      <NavBar>
        {tabs.map(({ name, path }) => (
          <NavBarLink to={path} key={path} label={name} id={createTabID(path)} aria-controls={createPanelID(path)} />
        ))}
      </NavBar>
      <div className={classes.toolbarSpacer} />
    </nav>
  );
}

function Main() {
  return (
    <main>
      <Switch>
        <Redirect exact from="/" to="/best" />
        <NamedRoute name="Post" path="/posts/:id">
          <ItemPage />
        </NamedRoute>
        {tabs.map(({ name, path, Component }) => (
          <NamedRoute
            name={name}
            path={path}
            key={path}
            render={() => (
              <div id={createPanelID(path)} role="tabpanel" aria-labelledby={createTabID(path)}>
                <Component />
              </div>
            )}
          />
        ))}
      </Switch>
    </main>
  );
}

function App() {
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  return (
    <StrictMode>
      <ThemeProvider theme={prefersLightMode ? lightTheme : darkTheme}>
        <CssBaseline />
        <HelmetProvider>
          <HackerNewsProvider>
            <BrowserRouter>
              <Nav />
              <Main />
            </BrowserRouter>
          </HackerNewsProvider>
        </HelmetProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
