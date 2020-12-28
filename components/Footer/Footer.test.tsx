import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import Footer from "./Footer";

afterEach(cleanup);

function setup(overRideProps = {}) {
  const defaultProps = {};

  const props = { ...defaultProps, ...overRideProps };

  return render(<Footer {...props} />);
}

describe("Footer", () => {
  it("Should pass accessibility testing", async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
