import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import Alert, { AlertTypes } from "./Alert";

afterEach(cleanup);

describe("Alert", () => {
  it("passes accesibility testing", async () => {
    const { container } = render(
      <Alert type={AlertTypes.warning} header="Header text" content="This is some content to warn about">
        <div>This is a Alert</div>
      </Alert>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
