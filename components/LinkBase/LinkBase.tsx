import React from "react";

type Props = {
  /**
   * Default element is an anchor tag when an `href` prop is provided and a button when one is not.
   * Provide an `as` prop to override this behavior and use a different element (e.g. span, div, Next.js's Link component...)
   */
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  /**
   * LinkBase defaults to a `div` if neither a link nor an onClick handler are provided, and not custom `as` prop has been set.
   * If your component needs a different default (e.g. a `span`), specify a `defaultAs` prop.
   */
  defaultAs?: React.ElementType;
  /**
   * When an `href` prop is provided, LinkBase will render an anchor element unless an `as` prop is set.
   */
  href?: string;
  /**
   * When an `onClick` prop is provided, LinkBase will render a button element unless an `as` or `href` prop is set.
   */
  onClick?: () => void;
  /**
   * optional role
   */
  role?: string;

  type?: string;
};

const getElementType = ({ as, defaultAs, href, onClick, type }: Props): React.ElementType => {
  if (as) {
    return as;
  }

  if (href) {
    return "a";
  }

  if (type === "submit" || onClick) {
    return "button";
  }

  return defaultAs || "div";
};

/**
 * LinkBase is intended for internal use within the enterprise-components project.
 * It tries to determine semantically correct markup to use for a given element based on the provided props.
 */
const LinkBase = React.forwardRef<unknown, Props>((props, ref) => {
  const { children, href, onClick, ...others } = props;

  const Element = getElementType(props);

  const otherProps = {
    href,
    onClick,
    ...others,
  };

  return (
    <Element ref={ref} {...otherProps}>
      {children}
    </Element>
  );
});

export default LinkBase;
