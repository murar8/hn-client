import { ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "src/App";
import { theme } from "src/config/theme";

function Index() {
  return (
    <StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </StrictMode>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
