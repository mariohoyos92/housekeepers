import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Transition from "../Transition";
import useOnClickOutside from "../../util/useOnClickOutside";

type ModalMaxSizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";

type Props = {
  /**
   * Determines whether the modal is showing or not
   */
  open: boolean;
  /**
   * The DOM element to append to if the modal needs to exist somewhere else in the DOM tree
   */
  container?: HTMLElement;
  /**
   * Determines the maximum width of the modal
   */
  maxSize?: ModalMaxSizes;
  /**
   * function called when the backdrop is clicked
   */
  onBackdropClick?: () => void;
  /**
   * properties for optional modal header
   */
  headerOptions?: {
    onClose: () => void;
    header: React.ReactNode;
  };
  /**
   * Modal contents
   */
  children: React.ReactNode;
};

const Modal = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { container, onBackdropClick, children, open, maxSize, headerOptions, ...restProps } = props;
  const modalRef = useRef();

  const modalClasses = classNames(
    "inline-block align-bottom bg-white rounded-lg text-left overflow-x-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full",
    {
      [`sm:max-w-${maxSize}`]: true,
    }
  );

  useOnClickOutside(modalRef, () => {
    if (onBackdropClick) {
      onBackdropClick();
    }
  });

  const render = (
    <Transition show={open}>
      <div className="fixed inset-0 z-10 overflow-y-auto" ref={ref}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 overflow-hidden text-center sm:block sm:p-0">
          <Transition
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          </Transition>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <Transition
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={modalClasses} ref={modalRef} {...restProps}>
              {headerOptions && (
                <div className="p-6 -mx-6 border-b border-charcoal-300">
                  <div className="flex items-center">
                    <div className="flex-1 block ml-6 text-lg font-medium leading-5 text-charcoal-700">
                      {headerOptions.header}
                    </div>

                    <button
                      onClick={headerOptions.onClose}
                      data-testid="close-modal-button"
                      className="mr-6"
                      aria-label="Close modal"
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {children}
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  );

  if (container) {
    return ReactDOM.createPortal(render, container);
  }

  return render;
});

Modal.defaultProps = {
  maxSize: "sm",
};

export default Modal;
