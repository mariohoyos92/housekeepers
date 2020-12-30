import React, { useState, useRef } from "react";
import Button from "../Button";
import Steps from "../Steps";
import Modal from "./Modal";

export default {
  title: "Overlays/Modal",
  component: Modal
};

export const BasicModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show me a message
      </Button>
      <Modal
        open={isOpen}
        onBackdropClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="px-4 pt-5 pb-4 sm:p-6">This is a message</div>
      </Modal>
    </div>
  );
};

export const ModalWithHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show me a message
      </Button>
      <Modal
        open={isOpen}
        onBackdropClick={() => {
          setIsOpen(false);
        }}
        maxSize="5xl"
        headerOptions={{
          onClose: () => setIsOpen(false),
          header: "This is a header"
        }}
      >
        <div className="p-6">
          <Steps steps={["Hey", "there"]} currentStep="Hey" />
        </div>
      </Modal>
    </div>
  );
};

export const ModalSizes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            setSize("xs");
            setIsOpen(true);
          }}
        >
          xs
        </Button>
        <Button
          onClick={() => {
            setSize("sm");
            setIsOpen(true);
          }}
        >
          sm
        </Button>
        <Button
          onClick={() => {
            setSize("md");
            setIsOpen(true);
          }}
        >
          md
        </Button>
        <Button
          onClick={() => {
            setSize("lg");
            setIsOpen(true);
          }}
        >
          lg
        </Button>
        <Button
          onClick={() => {
            setSize("xl");
            setIsOpen(true);
          }}
        >
          xl
        </Button>
        <Button
          onClick={() => {
            setSize("2xl");
            setIsOpen(true);
          }}
        >
          2xl
        </Button>
        <Button
          onClick={() => {
            setSize("3xl");
            setIsOpen(true);
          }}
        >
          3xl
        </Button>
        <Button
          onClick={() => {
            setSize("4xl");
            setIsOpen(true);
          }}
        >
          4xl
        </Button>
        <Button
          onClick={() => {
            setSize("5xl");
            setIsOpen(true);
          }}
        >
          5xl
        </Button>
        <Button
          onClick={() => {
            setSize("6xl");
            setIsOpen(true);
          }}
        >
          6xl
        </Button>
        <Button
          onClick={() => {
            setSize("7xl");
            setIsOpen(true);
          }}
        >
          7xl
        </Button>
        <Button
          onClick={() => {
            setSize("full");
            setIsOpen(true);
          }}
        >
          full width
        </Button>
      </div>
      <Modal
        maxSize={size}
        open={isOpen}
        onBackdropClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="px-4 pt-5 pb-4 sm:p-6">{size} modal</div>
      </Modal>
    </div>
  );
};

export const ModalWithPortal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <div>
      <div className="border border-charcoal-600 p-2.5 mb-2.5" ref={anchorRef}>
        The modal will get appended to this container
      </div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show me a message
      </Button>
      <Modal
        container={anchorRef.current}
        open={isOpen}
        onBackdropClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="px-4 pt-5 pb-4 sm:p-6">This is a message</div>
      </Modal>
    </div>
  );
};
