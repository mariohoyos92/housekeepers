import React from "react";
import AuthForm from "./AuthForm";

export default {
  title: "Elements/AuthForm",
  component: AuthForm,
};

export const basicAuthForm: React.FC = () => (
  <AuthForm
    type="signin"
    onAuth={console.log}
    onFormAlert={console.log}
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
