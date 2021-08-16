import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const palette: PaletteOptions = {
  primary: {
    main: "#03a9f4",
  },
  secondary: {
    main: "#00e676",
  },
};

export const lightTheme = createMuiTheme({ palette: { ...palette, type: "light" } });

export const darkTheme = createMuiTheme({ palette: { ...palette, type: "dark" } });
