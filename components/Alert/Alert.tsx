import React from "react";
import cx from "classnames";

export enum AlertTypes {
  success = "success",
  warning = "warning",
  error = "error",
}

type Props = {
  type: AlertTypes;
  header: React.ReactNode;
  content?: React.ReactNode;
};

const Alert: React.FC<Props> = ({ header, content, type }) => {
  return (
    <div
      className={cx("p-4 rounded-md", {
        "bg-yellow-50": type === AlertTypes.warning,
        "bg-red-50": type === AlertTypes.error,
        "bg-green-50": type === AlertTypes.success,
      })}
      style={{ maxWidth: "500px" }}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === AlertTypes.warning && (
            <svg
              className="w-5 h-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === AlertTypes.success && (
            <svg
              className="w-5 h-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === AlertTypes.error && (
            <svg
              className="w-5 h-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <h3
            className={cx("text-sm font-medium leading-5", {
              "text-yellow-800": type === AlertTypes.warning,
              "text-red-800": type === AlertTypes.error,
              "text-green-800": type === AlertTypes.success,
            })}
          >
            {header}
          </h3>
          {content && (
            <div
              className={cx("mt-2 text-sm leading-5", {
                "text-yellow-700": type === AlertTypes.warning,
                "text-red-700": type === AlertTypes.error,
                "text-green-700": type === AlertTypes.success,
              })}
            >
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
