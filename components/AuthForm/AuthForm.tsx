import React, { useState } from "react";
import firebase from "firebase";
import { useAuth } from "../../util/auth";
import { useForm } from "react-hook-form";
import { FormAlertArgs } from "../FormAlert";
import { SigninValues } from "../AuthSection/AuthSection";
import Spinner from "react-bootstrap/Spinner";

type Props = {
  type: string;
  onAuth: (user: firebase.User) => void;
  onFormAlert: (data: FormAlertArgs) => void;
  typeValues: SigninValues;
};

const AuthForm: React.FC<Props> = ({ type, onAuth, onFormAlert, typeValues }) => {
  const auth = useAuth();

  const [pending, setPending] = useState(false);
  const { handleSubmit, register, errors, getValues } = useForm();

  const submitHandlersByType = {
    signin: ({ email, pass }) => {
      return auth.signin(email, pass).then(user => {
        // Call auth complete handler
        onAuth(user);
      });
    },
    signup: ({ email, pass }) => {
      return auth.signup(email, pass).then(user => {
        // Call auth complete handler
        onAuth(user);
      });
    },
    forgotpass: ({ email }) => {
      return auth.sendPasswordResetEmail(email).then(() => {
        setPending(false);
        // Show success alert message
        onFormAlert({
          type: "success",
          message: "Password reset email sent",
        });
      });
    },
    changepass: ({ pass }) => {
      return auth.confirmPasswordReset(pass).then(() => {
        setPending(false);
        // Show success alert message
        onFormAlert({
          type: "success",
          message: "Your password has been changed",
        });
      });
    },
  };

  // Handle form submission
  const onSubmit = ({ email, pass }) => {
    // Show pending indicator
    setPending(true);
    // Call submit handler for auth type
    submitHandlersByType[type]({
      email,
      pass,
    }).catch(error => {
      setPending(false);
      // Show error alert message
      onFormAlert({
        type: "error",
        message: error.message,
      });
    });
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {["signup", "signin", "forgotpass"].includes(type) && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              ref={register({
                required: "Please enter an email",
              })}
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600" id="confirm-pass-error">
              {((errors.email as unknown) as any).message}
            </p>
          )}
        </div>
      )}

      {["signup", "signin", "changepass"].includes(type) && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="pass"
              name="pass"
              type="password"
              autoComplete="current-password"
              required
              ref={register({
                required: "Please enter a password",
              })}
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {errors.pass && (
            <p className="mt-2 text-sm text-red-600" id="confirm-pass-error">
              {((errors.pass as unknown) as any).message}
            </p>
          )}
        </div>
      )}

      {["signup", "changepass"].includes(type) && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirm-password"
              name="confirmPass"
              type="password"
              ref={register({
                required: "Please enter your password again",
                validate: value => {
                  if (value === getValues().pass) {
                    return true;
                  } else {
                    return "This doesn't match your password";
                  }
                },
              })}
              required
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {errors.confirmPass && (
            <p className="mt-2 text-sm text-red-600" id="confirm-pass-error">
              {((errors.confirmPass as unknown) as any).message}
            </p>
          )}
        </div>
      )}
      <div>
        <button
          type="submit"
          disabled={pending}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {!pending && <span>{typeValues.buttonText}</span>}

          {pending && (
            <Spinner animation="border" size="sm" role="status" aria-hidden={true} className="align-baseline">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
