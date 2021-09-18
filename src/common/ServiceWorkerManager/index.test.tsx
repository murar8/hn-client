import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as serviceWorkerRegistration from "src/serviceWorkerRegistration";
import { ServiceWorkerManager } from ".";

const { location } = window;

function setup() {
  let onUpdate: ((registration: ServiceWorkerRegistration) => void) | undefined = undefined;
  const registerSpy = jest.spyOn(serviceWorkerRegistration, "register");

  registerSpy.mockImplementation((config?: { onUpdate?: (registration: ServiceWorkerRegistration) => void }) => {
    onUpdate = config?.onUpdate;
  });

  render(<ServiceWorkerManager />);

  return { onUpdate: onUpdate!, registerSpy };
}

async function setupWithUpdate() {
  const result = setup();
  const postMessage = jest.fn();

  act(() => {
    result.onUpdate({ waiting: { postMessage } } as unknown as ServiceWorkerRegistration);
  });

  await waitFor(() => expect(screen.getByText("An updated version of the website is available.")).toBeVisible());

  return { ...result, postMessage };
}

beforeAll(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });
});

afterAll(() => {
  window.location = location;
});

beforeEach(() => {
  jest.resetAllMocks();
});

it("registers the service worker", async () => {
  const { registerSpy } = setup();
  expect(registerSpy).toHaveBeenCalledTimes(1);
});

it("shows a banner when a service worker update is available", async () => {
  await setupWithUpdate();
});

it("hides the banner when clicking the close button", async () => {
  await setupWithUpdate();
  fireEvent.click(screen.getByLabelText("Close"));
  await waitFor(() => expect(screen.getByText("An updated version of the website is available.")).not.toBeVisible());
});

it("skips waiting and reload the window when clicking the reload button", async () => {
  const { postMessage } = await setupWithUpdate();

  fireEvent.click(screen.getByText("Reload Now"));

  expect(window.location.reload).toHaveBeenCalledTimes(1);
  expect(postMessage).toHaveBeenCalledTimes(1);
  expect(postMessage).toHaveBeenLastCalledWith({ type: "SKIP_WAITING" });
});
