import React from "react";
import Spinner from "./Spinner";

function PageLoader(props) {
  const { style, children, ...otherProps } = props;

  return (
    <section
      bg="white"
      className="flex items-center justify-center w-full"
      style={{
        height: "400px",
        ...style,
      }}
      {...otherProps}
    >
      {!props.children && <Spinner />}

      {props.children && <>{props.children}</>}
    </section>
  );
}

export default PageLoader;
