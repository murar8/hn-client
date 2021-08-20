import { ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "src/App";

function Index() {
  return (
    <StrictMode>
      <ColorModeScript />
      <App />
    </StrictMode>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
