import React from "react";
import Spinner from "./Spinner";

export default {
  title: "Elements/Spinner",
  component: Spinner,
};

export const basicSpinner: React.FC = () => <Spinner />;
export const differentColorSpinner: React.FC = () => <Spinner color="red" size={300} />;
