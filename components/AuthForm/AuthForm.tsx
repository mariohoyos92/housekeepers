import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useAuth } from "../../util/auth";
import { useForm } from "react-hook-form";
import { SigninValues } from "../AuthSection/AuthSection";
import Spinner from "react-bootstrap/Spinner";
import TextInput from "../TextInput";
import Button from "../Button";

type Props = {
  type: string;
  onAuth: (user: firebase.User) => void;
  onFormAlert: (data: any) => void;
  typeValues: SigninValues;
};

const AuthForm: React.FC<Props> = ({ type, onAuth, onFormAlert, typeValues }) => {
  const auth = useAuth();

  const [pending, setPending] = useState(false);
  const { handleSubmit, register, errors, getValues, reset } = useForm();

  useEffect(() => {
    reset();
  }, [type]);

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
          <div className="mt-1">
            <TextInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              label="Email Address"
              required
              inputRef={register({
                required: "Please enter an email",
              })}
              error={!!errors.email}
              errorMessage={((errors.email as unknown) as any)?.message as string}
            />
          </div>
        </div>
      )}

      {["signup", "signin", "changepass"].includes(type) && (
        <div>
          <div className="mt-1">
            <TextInput
              id="pass"
              name="pass"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
              inputRef={register({
                required: "Please enter a password",
              })}
              error={!!errors.pass}
              errorMessage={((errors.pass as unknown) as any)?.message as string}
            />
          </div>
        </div>
      )}

      {["signup", "changepass"].includes(type) && (
        <div>
          <div className="mt-1">
            <TextInput
              id="confirm-password"
              name="confirmPass"
              label="Confirm password"
              type="password"
              inputRef={register({
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
              error={!!errors.confirmPass}
              errorMessage={((errors.confirmPass as unknown) as any)?.message as string}
            />
          </div>
        </div>
      )}
      <div>
        <Button type="submit" disabled={pending} className="justify-center w-full">
          {!pending && <span>{typeValues.buttonText}</span>}

          {pending && (
            <Spinner animation="border" size="sm" role="status" aria-hidden={true} className="align-baseline">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
