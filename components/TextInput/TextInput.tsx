import React, { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames";

type Props = {
  id: string;
  label: string;
  value?: string | number;
  dataTestId?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  hideLabel?: boolean;
  renderLeadingIcon?: () => React.ReactNode;
  readOnly?: boolean;
  trailingButtonOptions?: {
    buttonChildren: React.ReactNode;
    buttonClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  };
  disableSpinButtons?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

const TextInput = forwardRef<HTMLDivElement, Props & InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const {
    className,
    dataTestId,
    disabled,
    error,
    errorMessage,
    helperText,
    hideLabel,
    id,
    inputRef,
    label,
    value,
    renderLeadingIcon,
    trailingButtonOptions,
    disableSpinButtons,
    ...others
  } = props;

  const helperTextId = helperText ? `${id}-description` : "";
  const errorId = errorMessage ? `${id}-error` : "";

  const valueOrZero = value || 0;

  const inputProps = {
    id,
    ref: inputRef,
    className: classNames(
      "block w-full sm:text-sm border-gray-300 rounded-md ",
      { "focus:ring focus:ring-indigo-500 focus:border-indigo-500": !error },
      {
        "focus:ring border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500": error,
      },
      {
        "bg-gray-100 focus:outline-none focus:border-gray-100 border-gray-100 cursor-not-allowed": disabled,
      },
      {
        "block w-full transition duration-150 ease-in-out rounded-none form-input rounded-l-md sm:text-sm sm:leading-5":
          renderLeadingIcon || trailingButtonOptions,
      },
      { "pl-10": renderLeadingIcon },
      className
    ),
    disabled,
    value,
    "aria-label": label,
    "aria-invalid": error,
    "aria-describedby": error ? errorId : helperTextId,
    style: {
      caretColor: disabled ? "transparent" : "auto",
    },
    "data-testid": dataTestId,
    ...(disableSpinButtons
      ? {
          min: valueOrZero,
          max: valueOrZero,
        }
      : {}),
    ...others,
  };

  const renderInput = () => {
    if (renderLeadingIcon || trailingButtonOptions) {
      return (
        <div className="relative flex flex-grow focus-within:z-10">
          {renderLeadingIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <div className="w-5 h-5 text-gray-400">{renderLeadingIcon()}</div>
            </div>
          )}

          <input {...inputProps} />

          {trailingButtonOptions && (
            <button
              className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border border-gray-300 text-gray rounded-r-md hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray"
              onClick={trailingButtonOptions.buttonClickHandler}
            >
              {trailingButtonOptions.buttonChildren}
            </button>
          )}
        </div>
      );
    }
    return <input {...inputProps} />;
  };

  return (
    <div ref={ref}>
      <label
        htmlFor={id}
        className={classNames("block text-sm font-medium leading-5 text-gray", { "sr-only": hideLabel })}
      >
        {label}
      </label>

      {helperText ? (
        <p className="mt-0.5 text-sm text-gray-600" id={helperTextId}>
          {helperText}
        </p>
      ) : null}

      <div
        className={classNames("mt-1 rounded-md relative shadow-sm", {
          flex: renderLeadingIcon || trailingButtonOptions,
        })}
      >
        {renderInput()}
        {error && !trailingButtonOptions ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500 pointer-events-none">
            <svg height="16" width="16" fill="currentColor">
              <use href="#info-icon" xlinkHref="#info-icon" />
            </svg>
          </div>
        ) : null}
      </div>

      {error && errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}

      {disableSpinButtons && (
        <style>
          {`
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type=number] {
              -moz-appearance:textfield; /* Firefox */
            }
          `}
        </style>
      )}
    </div>
  );
});

export default TextInput;
