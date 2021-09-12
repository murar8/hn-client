import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "src/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function Index() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));

serviceWorkerRegistration.register();
