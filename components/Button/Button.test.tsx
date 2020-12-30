import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import Button from "./Button";

afterEach(cleanup);

describe("Button", () => {
  it("passes accesibility testing", async () => {
    const { container } = render(<Button>test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
