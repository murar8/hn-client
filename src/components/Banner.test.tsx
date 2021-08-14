import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { Banner } from "./Banner";

it("should display the message to the user", async () => {
  const { queryByText } = render(<Banner message="Foo" show />);
  expect(queryByText("Foo")).toBeTruthy();
});

it("should call the action event handlers on click events", async () => {
  const onPrimaryAction = jest.fn();
  const onSecondaryAction = jest.fn();

  const { getByText } = render(
    <Banner
      message="Hi"
      show
      primaryAction="foo"
      secondaryAction="bar"
      onPrimaryAction={onPrimaryAction}
      onSecondaryAction={onSecondaryAction}
    />
  );

  fireEvent.click(getByText("foo"));
  fireEvent.click(getByText("bar"));

  expect(onPrimaryAction).toHaveBeenCalledTimes(1);
  expect(onSecondaryAction).toHaveBeenCalledTimes(1);
});

it("should be hidden when the show property is false", async () => {
  const { getByText } = render(<Banner message="Hi" show={false} />);

  expect(getByText("Hi")).not.toBeVisible();
});
