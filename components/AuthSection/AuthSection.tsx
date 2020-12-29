import React from "react";
import Auth from "../Auth/Auth";

export type SigninValues = {
  title: string;
  buttonText: string;
  linkTextSignup?: string;
  linkTextForgotpass?: string;
  linkTextSignin?: string;
};

type SigninTypes = {
  [key: string]: SigninValues;
};

// Values for each auth type
const allTypeValues: SigninTypes = {
  signin: {
    // Top title
    title: "Welcome back",
    // Submit button text
    buttonText: "Sign in",
    // Link text to other auth types
    linkTextSignup: "Create an account",
    linkTextForgotpass: "Forgot Password?",
  },
  signup: {
    title: "Get yourself an account",
    buttonText: "Sign up",
    linkTextSignin: "Sign in",
  },
  forgotpass: {
    title: "Get a new password",
    buttonText: "Reset password",
  },
  changepass: {
    title: "Choose a new password",
    buttonText: "Change password",
  },
};

const AuthSection: React.FC<{ type?: string; afterAuthPath?: string; providers?: string[] }> = ({
  type,
  afterAuthPath,
  providers,
}) => {
  // Ensure we have a valid auth type
  const currentType = allTypeValues[type] ? type : "signup";

  // Get values for current auth type
  const typeValues = allTypeValues[currentType];

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">{typeValues.title}</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <Auth type={currentType} typeValues={typeValues} providers={providers} afterAuthPath={afterAuthPath} />
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
