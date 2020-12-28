import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LinkBase from "./LinkBase";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test("renders a div by default", () => {
  const { container } = render(<LinkBase />);
  expect(container?.firstChild?.nodeName).toEqual("DIV");
});

test("should not have a11y violations", async () => {
  const { container } = render(<LinkBase aria-label="Test" />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();

  cleanup();
});

test("renders a custom default element", () => {
  const { container } = render(<LinkBase defaultAs="span" />);
  expect(container?.firstChild?.nodeName).toEqual("SPAN");
});

test("renders a button when an onClick prop is provided", () => {
  const { container } = render(<LinkBase onClick={() => {}} />);
  expect(container?.firstChild?.nodeName).toEqual("BUTTON");
});

test("handles clicks when an onClick prop is provided", done => {
  const onClick = () => {
    done();
  };

  const { container } = render(<LinkBase onClick={onClick} />);
  if (container.firstChild) {
    fireEvent.click(container.firstChild);
  } else {
    throw Error("did not render child");
  }
});

test("renders an anchor when an href is provided", () => {
  const { container } = render(<LinkBase href="#" />);
  expect(container?.firstChild?.nodeName).toEqual("A");
});

test("renders an anchor when both an href and an onClick are provided", () => {
  const { container } = render(<LinkBase onClick={() => {}} href="#" />);
  expect(container?.firstChild?.nodeName).toEqual("A");
});

test("includes an href prop when one is provided", () => {
  const { container } = render(<LinkBase href="#" />);
  expect(container?.firstChild).toHaveAttribute("href");
});
