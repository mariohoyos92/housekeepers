import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import AuthSocial from "./AuthSocial";

afterEach(cleanup);

function setup(overRideProps = {}) {
  const defaultProps = {
    onAuth: jest.fn(),
    showLastUsed: true,
    onError: jest.fn(),
    type: "signin",
    providers: ["google"],
  };

  const props = { ...defaultProps, ...overRideProps };

  return render(<AuthSocial {...props} />);
}

describe("AuthSocial", () => {
  it("Should pass accessibility testing", async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
