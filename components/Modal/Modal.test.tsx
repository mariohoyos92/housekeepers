import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { axe } from "jest-axe";
import { render, cleanup } from "@testing-library/react";

import Modal from "./Modal";

afterEach(cleanup);

describe("Modal", () => {
  it("passes accesibility testing", async () => {
    const { container } = render(
      <Modal open={true}>
        <div>This is a modal</div>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
