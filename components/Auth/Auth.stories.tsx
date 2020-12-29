import React from "react";
import Auth from "./Auth";

export default {
  title: "Elements/Auth",
  component: Auth,
};

export const basicAuth: React.FC = () => (
  <Auth
    afterAuthPath="/dashboard"
    type="signin"
    providers={["google"]}
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
