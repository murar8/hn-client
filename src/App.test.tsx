import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import App from "App";
import axe from "axe-core";

it("should have no axe a11y violations", (done) => {
  const { baseElement } = render(<App />);

  const config = {
    rules: {
      // "color-contrast": { enabled: false },
    },
  };

  axe.run(baseElement, config, (err, { violations }) => {
    expect(err).toBe(null);
    expect(violations).toHaveLength(0);
    done();
  });
});
