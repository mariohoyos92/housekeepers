import React from "react";
import Alert from "react-bootstrap/Alert";

export type FormAlertArgs = {
  type: string;
  message: string;
}

const FormAlert:React.FC<FormAlertArgs> = (props) => {
  const { type, message, ...otherProps } = props;

  return (
    <Alert variant={type === "error" ? "danger" : "success"} {...otherProps}>
      {message}
    </Alert>
  );
}

export default FormAlert;
