import React from "react";
import TextInput from "./TextInput";

export default {
  title: "Forms/TextInput-TextArea",
  component: TextInput,
};

export const textInputWithLabel = () => (
  <TextInput id="test" label="Input with placeholder" placeholder="This is some placeholder text" autoComplete="off" />
);

export const disabledTextInput = () => (
  <TextInput id="test" disabled label="Disabled Input" placeholder="Disabled input here" />
);

export const textInputWithHelperText = () => (
  <TextInput id="test" label="Input with helper text" helperText="Descriptive sentence" />
);

export const textInputWithHiddenLabel = () => (
  <TextInput id="test" label="Input with hidden label" hideLabel placeholder="Label only available to screenreaders" />
);

export const textInputWithError = () => (
  <TextInput
    id="test"
    label="Text with error"
    error
    helperText="Some helpful stuff"
    errorMessage="You messed something up dawg"
  />
);

export const TextInputWithTrailingButton = () => (
  <TextInput
    id="test"
    label="Text input with leading icon and trailing button"
    trailingButtonOptions={{
      buttonChildren: <span className="text-charcoal">Something</span>,
      buttonClickHandler: () => console.log(),
    }}
  />
);

export const TextInputWithTrailingButtonAndError = () => (
  <TextInput
    id="test"
    label="Text input with leading icon and trailing button and error"
    trailingButtonOptions={{
      buttonChildren: <span className="text-charcoal">Something</span>,
      buttonClickHandler: () => console.log(),
    }}
    error
  />
);

export const textInputWithSpinButtons = () => (
  <TextInput
    id="test"
    label="Input with spin buttons"
    placeholder="This is some placeholder text"
    autoComplete="off"
    type="number"
  />
);

export const textInputWithoutSpinButtons = () => (
  <TextInput
    id="test"
    label="Input without spin buttons"
    placeholder="This is some placeholder text"
    autoComplete="off"
    type="number"
    disableSpinButtons={true}
  />
);
