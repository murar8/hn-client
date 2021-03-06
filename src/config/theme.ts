import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps, transparentize } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  config: {
    initialColorMode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  },
  styles: {
    global: {
      "#root": {
        height: "100vh",
      },
    },
  },
  components: {
    Tag: {
      variants: {
        ghost: (props: StyleFunctionProps) => ({
          container: {
            textColor: mode(`${props.colorScheme}.500`, transparentize(`${props.colorScheme}.200`, 0.8))(props),
            paddingInline: 0,
            minWidth: 0,
          },
        }),
      },
    },
    Button: {
      variants: {
        round: (props: StyleFunctionProps) => ({
          ...(props.theme.components.Button.variants?.solid as Function)(props),
          borderRadius: "100%",
        }),
      },
    },
  },
});
