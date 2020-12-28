import React from "react";
import Nav from "./Nav";

export default {
  title: "Elements/Nav",
  component: Nav,
};

export const basicNav: React.FC = () => (
  <Nav
    user={{
      uid: "asdfasdfasdf",
      email: "lkjlkj@lkjlkj.com",
      emailVerified: true,
      name: "Mary Clark",
      picture: null,
      providers: [],
      planId: "Someplandid",
      planIsActive: true,
    }}
    signOut={console.log}
  />
);
