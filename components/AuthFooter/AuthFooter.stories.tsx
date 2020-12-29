import React from "react";
import AuthFooter from "./AuthFooter";

export default {
  title: "Elements/AuthFooter",
  component: AuthFooter,
};

export const basicAuthFooter: React.FC = () => (
  <AuthFooter
    type="signin"
    typeValues={{
      // Top title
      title: "Welcome back",
      // Submit button text
      buttonText: "Sign in",
      // Link text to other auth types
      linkTextSignup: "Create an account",
      linkTextForgotpass: "Forgot Password?",
    }}
  />
);
