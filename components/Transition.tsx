import React, { useRef, useEffect, useContext } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";

const TransitionContext = React.createContext({
  parent: {
    show: false,
    isInitialRender: true,
    appear: false,
  },
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

type CSSTransitionProps = {
  show?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  appear?: boolean;
  role?: string;
  children: React.ReactNode;
};

function CSSTransition({
  show,
  enter = "",
  enterFrom = "",
  enterTo = "",
  leave = "",
  leaveFrom = "",
  leaveTo = "",
  appear,
  children,
}: CSSTransitionProps) {
  const enterClasses = enter.split(" ").filter(s => s.length);
  const enterFromClasses = enterFrom.split(" ").filter(s => s.length);
  const enterToClasses = enterTo.split(" ").filter(s => s.length);
  const leaveClasses = leave.split(" ").filter(s => s.length);
  const leaveFromClasses = leaveFrom.split(" ").filter(s => s.length);
  const leaveToClasses = leaveTo.split(" ").filter(s => s.length);

  function addClasses(node, classes) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node, classes) {
    classes.length && node.classList.remove(...classes);
  }

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false);
      }}
      onEnter={node => {
        addClasses(node, [...enterClasses, ...enterFromClasses]);
      }}
      onEntering={node => {
        removeClasses(node, enterFromClasses);
        addClasses(node, enterToClasses);
      }}
      onEntered={node => {
        removeClasses(node, [...enterToClasses, ...enterClasses]);
      }}
      onExit={node => {
        addClasses(node, [...leaveClasses, ...leaveFromClasses]);
      }}
      onExiting={node => {
        removeClasses(node, leaveFromClasses);
        addClasses(node, leaveToClasses);
      }}
      onExited={node => {
        removeClasses(node, [...leaveToClasses, ...leaveClasses]);
      }}
    >
      {children}
    </ReactCSSTransition>
  );
}

function Transition({ show, appear, ...rest }: CSSTransitionProps) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return <CSSTransition appear={parent.appear || !parent.isInitialRender} show={parent.show} {...rest} />;
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
