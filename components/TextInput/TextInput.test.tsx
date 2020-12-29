import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import TextInput from "./TextInput";

afterEach(cleanup);

const setup = (overrideProps = {}) => {
  const defaultProps = {
    label: "something",
    value: "this or that",
    placeholder: "trying this out",
    helperText: "do this here",
    onChange: jest.fn(),
    id: "some input"
  };
  const props = { ...defaultProps, ...overrideProps };
  return render(<TextInput {...props} />);
};

describe("TextInput", () => {
  it("passes accesibility testing", async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("TextArea", () => {
  it("passes accesibility testing", async () => {
    const { container } = setup({ isTextArea: true });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
