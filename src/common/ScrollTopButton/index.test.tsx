import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ScrollTopButton } from ".";

it("renders nothing when at the top of the page", async () => {
  render(<ScrollTopButton />);
  expect(screen.queryByLabelText("Scroll to top")).toBeNull();
});

it("renders a button when scrolling down", async () => {
  render(<ScrollTopButton />);
  expect(screen.queryByLabelText("Scroll to top")).toBeNull();

  fireEvent.scroll(window, { target: { scrollY: 1600 } });
  await waitFor(() => expect(screen.getByLabelText("Scroll to top")).toBeVisible());
});

it("hides the button when scrolling up", async () => {
  render(<ScrollTopButton />);

  fireEvent.scroll(window, { target: { scrollY: 1600 } });
  fireEvent.scroll(window, { target: { scrollY: 0 } });

  await waitFor(() => expect(screen.queryByLabelText("Scroll to top")).toBeNull());
});

it("scrolls the window to the top when clicked", async () => {
  const scrollTo = jest.spyOn(window, "scrollTo").mockImplementation(() => {});

  render(<ScrollTopButton />);

  fireEvent.scroll(window, { target: { scrollY: 1600 } });
  fireEvent.click(screen.getByLabelText("Scroll to top"));

  expect(scrollTo).toHaveBeenCalledWith(0, 0);
});
