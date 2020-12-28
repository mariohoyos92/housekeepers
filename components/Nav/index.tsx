import React from "react";
import { PreparedUser, useAuth } from "../../util/auth";
import Nav from "./Nav";

const ConnectedNav = () => {
  const auth = useAuth();
  return <Nav user={auth.user as PreparedUser} signOut={() => auth.signout()} />;
};
export default ConnectedNav;
