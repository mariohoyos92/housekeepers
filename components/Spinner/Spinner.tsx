import React from "react";

const Spinner = ({ size = 65, color = "rgb(79, 70, 229)", ...otherProps }) => (
  <div className="spinner-container" {...otherProps}>
    <svg
      className="spinner"
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="spinner-path"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        cx="25"
        cy="25"
        r="20"
      ></circle>
    </svg>
  </div>
);

export default Spinner;
