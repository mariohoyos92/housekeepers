import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "../util/auth";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";

function SettingsGeneral(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    // Show pending indicator
    setPending(true);

    return auth
      .updateProfile(data)
      .then(() => {
        // Set success status
        props.onStatus({
          type: "success",
          message: "Your profile has been updated",
        });
      })
      .catch(error => {
        if (error.code === "auth/requires-recent-login") {
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit(data),
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
        id="name"
        name="name"
        type="text"
        label="Name"
        defaultValue={auth.user.name}
        placeholder="Name"
        error={errors.name}
        inputRef={register({
          required: "Please enter your name",
        })}
      />
      <div className="mt-4">
        <TextInput
          name="email"
          type="email"
          label="Email Address"
          defaultValue={auth.user.email}
          placeholder="Email"
          required
          error={errors.email}
          inputRef={register({
            required: "Please enter your email",
          })}
        />
      </div>

      <Button type="submit" className="mt-1" size="lg" disabled={pending}>
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

export default SettingsGeneral;
