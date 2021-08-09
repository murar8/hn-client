import { CssBaseline, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { routes } from "config/routes";
import { darkTheme, lightTheme } from "config/themes";
import { NavBar, NavBarLink } from "layout/NavBar";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const createTabID = (path: string) => `nav-tab-${path.substr(1)}`;
const createPanelID = (path: string) => `nav-tabpanel-${path.substr(1)}`;

function Nav() {
  return (
    <nav>
      <NavBar>
        {routes.map(({ name, path }) => (
          <NavBarLink to={path} key={path} label={name} id={createTabID(path)} aria-controls={createPanelID(path)} />
        ))}
      </NavBar>
    </nav>
  );
}

function Main() {
  return (
    <main>
      <Switch>
        <Redirect exact from="/" to="/best" />
        {routes.map(({ name, path, Component }) => (
          <Route
            // name={path}
            path={path}
            key={path}
            render={() => (
              <div id={createPanelID(path)} aria-labelledby={createTabID(path)}>
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
    <React.StrictMode>
      <ThemeProvider theme={prefersLightMode ? lightTheme : darkTheme}>
        <CssBaseline />
        <HelmetProvider>
          <BrowserRouter>
            <Nav />
            <Main />
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
