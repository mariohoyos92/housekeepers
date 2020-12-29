import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "../util/auth";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";

function SettingsPassword(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit, errors, reset, getValues } = useForm();

  const onSubmit = data => {
    // Show pending indicator
    setPending(true);

    auth
      .updatePassword(data.pass)
      .then(() => {
        // Clear form
        reset();
        // Set success status
        props.onStatus({
          type: "success",
          message: "Your password has been updated",
        });
      })
      .catch(error => {
        if (error.code === "auth/requires-recent-login") {
          // Update state to show re-authentication modal
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit({ pass: data.pass }),
          });
        } else {
          // Set error status
          props.onStatus({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="pass"
        name="pass"
        type="password"
        label="New Password"
        required
        error={errors.pass}
        inputRef={register({
          required: "Please enter a password",
        })}
      />
      <div className="my-4">
        <TextInput
          id="confirmPass"
          name="confirmPass"
          type="password"
          label="Confirm New Password"
          errorMessage={errors.confirmPass?.message}
          error={errors.confirmPass}
          inputRef={register({
            required: "Please enter your new password again",
            validate: value => {
              if (value === getValues().pass) {
                return true;
              } else {
                return "This doesn't match your password";
              }
            },
          })}
        />
      </div>
      <Button type="submit" size="lg" disabled={pending}>
        <span>Save</span>

        {pending && (
          <Spinner animation="border" size="sm" role="status" aria-hidden={true} className="ml-2 align-baseline">
            <span className="sr-only">Sending...</span>
          </Spinner>
        )}
      </Button>
    </form>
  );
}

export default SettingsPassword;
