import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import ProfileMenu from "./ProfileMenu";

afterEach(cleanup);

function setup(overRideProps = {}) {
  const defaultProps = { closeMenu: jest.fn(), profileMenuItems: [{ name: "something", href: "https://google.com" }] };

  const props = { ...defaultProps, ...overRideProps };

  return render(<ProfileMenu {...props} />);
}

describe("ProfileMenu", () => {
  it("Should pass accessibility testing", async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results.violations.length).toEqual(1);
  });
});
