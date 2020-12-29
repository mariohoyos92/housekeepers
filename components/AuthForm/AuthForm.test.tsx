import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import AuthForm from "./AuthForm";

afterEach(cleanup);

function setup(overRideProps = {}) {
  const defaultProps = {
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
    onAuth: jest.fn(),
    onFormAlert: jest.fn(),
  };

  const props = { ...defaultProps, ...overRideProps };

  return render(<AuthForm {...props} />);
}

describe("AuthForm", () => {
  it("Should pass accessibility testing", async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
