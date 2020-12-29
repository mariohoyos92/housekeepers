import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import Auth from "./Auth";

afterEach(cleanup);

function setup(overRideProps = {}) {
  const defaultProps = {
    afterAuthPath: "/dashboard",
    providers: ["google"],
    type: "signin",
    typeValues: {
      // Top title
      title: "Welcome back",
      // Submit button text
      buttonText: "Sign in",
      // Link text to other auth types
      linkTextSignup: "Create an account",
      linkTextForgotpass: "Forgot Password?",
    },
  };

  const props = { ...defaultProps, ...overRideProps };

  return render(<Auth {...props} />);
}

describe("Auth", () => {
  it("Should pass accessibility testing", async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
