import React from "react";
import Alert, { AlertTypes } from "./Alert";

export default {
  title: "Elements/Alert",
  component: Alert,
};

export const basicWarningAlert: React.FC = () => (
  <Alert
    type={AlertTypes.warning}
    header="This is the header"
    content="Very important content lorem ipsum dolor oh lord"
  />
);
export const basicErrorAlert: React.FC = () => (
  <Alert
    type={AlertTypes.error}
    header="This is the header"
    content="Very important content lorem ipsum dolor oh lord"
  />
);
