import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Spinner from "./Spinner";
import AuthSocial from "../components/AuthSocial";
import { useAuth } from "../util/auth";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Alert from "./Alert";

function ReauthModal(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const { pass } = data;
    setPending(true);

    auth
      .signin(auth.user.email, pass)
      .then(() => {
        // Call failed action that originally required reauth
        props.callback();
        // Let parent know we're done so they can hide modal
        props.onDone();
      })
      .catch(error => {
        // Hide pending indicator
        setPending(false);
        // Show error alert message
        setFormAlert({
          type: "error",
          message: error.message,
        });
      });
  };

  return (
    <Modal
      open={true}
      onClose={props.onDone}
      maxSize="xl"
      headerOptions={{ header: "Please sign in again to complete this action", onClose: () => props.onDone() }}
    >
      <div className="pb-4">
        {formAlert && (
          <div className="px-4 pt-4 mb-2">
            <Alert type={formAlert.type} header={formAlert.message} />
          </div>
        )}

        {props.provider === "password" && (
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 pt-4">
            <TextInput
              name="pass"
              type="password"
              label="Password"
              required
              error={errors.pass}
              inputRef={register({
                required: "Please enter your password",
              })}
            />

            <Button type="submit" disabled={pending} className="justify-center w-full mt-4">
              <span>Submit</span>

              {pending && (
                <Spinner color="white" size={16} className="ml-1">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </Button>
          </form>
        )}

        {props.provider !== "password" && (
          <AuthSocial
            type="signin"
            buttonText="Sign in"
            providers={[props.provider]}
            showLastUsed={false}
            hideBorderSection
            onAuth={() => {
              props.callback();
              props.onDone();
            }}
            onError={message => {
              setFormAlert({
                type: "error",
                message: message,
              });
            }}
          />
        )}
      </div>
    </Modal>
  );
}

export default ReauthModal;
