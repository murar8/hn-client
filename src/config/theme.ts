import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  },
  components: {
    Tag: {
      variants: {
        ghost: {
          container: {
            paddingInline: 0,
          },
        },
      },
    },
  },
});
