import { useColorModeValue } from "@chakra-ui/react";
import { fireEvent, screen } from "@testing-library/react";
import { Renderer } from "src/testUtils";
import { ColorModeButton } from "./ColorModeButton";

const render = Renderer.create().withColorModeProvider({ initialColorMode: "light" }).render;

function Component() {
  const colorMode = useColorModeValue("light", "dark");

  return (
    <>
      <ColorModeButton />
      <p>Color mode: {colorMode}</p>
    </>
  );
}

it("toggles the color mode", async () => {
  render(<Component />);
  expect(screen.getByText("Color mode: light")).toBeVisible();
  fireEvent.click(screen.getByLabelText("Toggle color mode"));
  expect(screen.getByText("Color mode: dark")).toBeVisible();
});
