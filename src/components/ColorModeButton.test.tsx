import { ColorModeProvider, useColorModeValue } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { ColorModeButton } from "./ColorModeButton";

function Wrapper(props: { children?: ReactNode }) {
  return <ColorModeProvider options={{ initialColorMode: "light" }} {...props} />;
}

function Component() {
  const colorMode = useColorModeValue("light", "dark");
  return (
    <div>
      <ColorModeButton />
      <p>Color mode: {colorMode}</p>
    </div>
  );
}

it("toggles the color mode", async () => {
  render(<Component />, { wrapper: Wrapper });
  expect(screen.getByText("Color mode: light")).toBeVisible();
  fireEvent.click(screen.getByLabelText("Toggle color mode"));
  expect(screen.getByText("Color mode: dark")).toBeVisible();
});
