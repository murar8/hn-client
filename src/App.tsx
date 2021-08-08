import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/best" />
          <Route path="/best">Best</Route>
          <Route path="/new">New</Route>
          <Route path="/top">Top</Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
