import React from "react";
import AuthSocial from "./AuthSocial";

export default {
  title: "Elements/AuthSocial",
  component: AuthSocial,
};

export const basicAuthSocial: React.FC = () => (
  <AuthSocial onAuth={console.log} showLastUsed={true} onError={console.log} type="signin" />
);
