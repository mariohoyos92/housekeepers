import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import LinkBase from "../LinkBase";

export enum ButtonSizes {
  xs = "xs",
  sm = "sm",
  base = "base",
  lg = "lg",
  xl = "xl",
}

export enum ButtonVariants {
  primary = "primary",
  secondary = "secondary",
  white = "white",
  transparent = "transparent",
  text = "text",
  red = "red",
}

export type Props = {
  /**
   * Specifies a tag to use other than the default button or anchor
   */
  as?: React.ElementType;
  /**
   * Button contents (usually text)
   */
  children: React.ReactNode;
  /**
   * Additional classnames for the button
   */
  className?: string;
  /**
   * URL button should link to. If provided, button will use an anchor tag.
   */
  href?: string;
  /**
   * Click handler for the button
   */
  onClick?: () => void;
  /**
   * The ID of the icon to show on the left side of the button, ex: `#thumb_up`
   */
  iconLeft?: string;
  /**
   * The ID of the icon to show on the left side of the button, ex: `#thumb_up`
   */
  iconRight?: string;
  /**
   * Specify a variant if you need buttons with a different color than the default.
   */
  variant?: ButtonVariants;
  /**
   * Specify a size if you need buttons smaller than the default.
   */
  size?: ButtonSizes;
  /**
   * Whether buttong is disabled or not
   */
  disabled?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, Props & ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  const { className, children, size, variant = ButtonVariants.primary, iconLeft, iconRight, ...others } = props;

  const classes = classNames(
    "inline-flex items-center border font-medium transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "border-transparent": [
        ButtonVariants.primary,
        ButtonVariants.secondary,
        ButtonVariants.text,
        ButtonVariants.red,
      ].includes(variant),
      "border-indigo": [ButtonVariants.white, ButtonVariants.transparent].includes(variant),
    },
    {
      "text-white": variant === ButtonVariants.primary || variant === ButtonVariants.red,
      "text-indigo-700":
        variant !== ButtonVariants.red &&
        variant !== ButtonVariants.primary &&
        !(variant === ButtonVariants.white || variant === ButtonVariants.transparent),
      "text-gray-700": variant === ButtonVariants.white || variant === ButtonVariants.transparent,
    },
    {
      "bg-indigo-600": variant === ButtonVariants.primary,
      "bg-indigo-100": variant === ButtonVariants.secondary,
      "bg-white": variant === ButtonVariants.white,
      "bg-transparent": variant === ButtonVariants.transparent,
      "bg-red-700": variant === ButtonVariants.red,
    },
    {
      "hover:bg-indigo-700": variant === ButtonVariants.primary,
      "hover:bg-indigo-300": variant === ButtonVariants.secondary,
      "hover:bg-gray-50": [ButtonVariants.white, ButtonVariants.transparent].includes(variant),
      "hover:text-indigo": [ButtonVariants.white, ButtonVariants.transparent].includes(variant),
      "hover:bg-red-500": variant === ButtonVariants.red,
    },
    {
      "focus:border-indigo": variant === ButtonVariants.primary,
      "focus:border-indigo-600": variant === ButtonVariants.secondary,
      "focus:border-indigo-300": variant === ButtonVariants.white,
      "focus:border-red-700": variant === ButtonVariants.red,
    },
    {
      "active:bg-indigo": variant === ButtonVariants.primary,
      "active:bg-indigo-600": variant === ButtonVariants.secondary,
      "active:bg-indigo-100": variant === ButtonVariants.white,
      "active:text-indigo": variant === ButtonVariants.white,
    },
    {
      "focus:shadow-outline-indigo": variant !== ButtonVariants.text && variant !== ButtonVariants.red,
      "focus:shadow-outline-red": variant === ButtonVariants.red,
    },
    {
      underline: variant === ButtonVariants.text,
      "no-underline": variant !== ButtonVariants.text,
    },
    variant !== ButtonVariants.text && {
      "px-2.5": size === ButtonSizes.xs,
      "px-3": size === ButtonSizes.sm,
      "px-4": size === ButtonSizes.base || size === ButtonSizes.lg,
      "px-6": size === ButtonSizes.xl,
    },
    variant !== ButtonVariants.text && {
      "py-1.5": size === ButtonSizes.xs,
      "py-2": size === ButtonSizes.sm || size === ButtonSizes.base || size === ButtonSizes.lg,
      "py-3": size === ButtonSizes.xl,
    },
    {
      "text-base": size === ButtonSizes.lg || size === ButtonSizes.xl,
      "text-sm": size === ButtonSizes.sm || size === ButtonSizes.base,
      "text-xs": size === ButtonSizes.xs,
    },
    {
      "leading-6": size === ButtonSizes.lg || size === ButtonSizes.xl,
      "leading-5": size === ButtonSizes.base,
      "leading-4": size === ButtonSizes.xs || size === ButtonSizes.sm,
    },
    {
      "rounded-md": size !== ButtonSizes.xs,
      rounded: size === ButtonSizes.xs,
    },
    className
  );

  const iconSizeClasses = classNames({
    "h-4 w-4": size === ButtonSizes.xs || size === ButtonSizes.sm,
    "h-5 w-5": size === ButtonSizes.base || size === ButtonSizes.lg || size === ButtonSizes.xl,
  });

  const iconLeftClasses = classNames(iconSizeClasses, {
    "mr-2": size === ButtonSizes.xs || size === ButtonSizes.sm,
    "mr-3": size === ButtonSizes.base || size === ButtonSizes.lg || size === ButtonSizes.xl,
  });

  const iconRightClasses = classNames(iconSizeClasses, {
    "ml-2": size === ButtonSizes.xs || size === ButtonSizes.sm,
    "ml-3": size === ButtonSizes.base || size === ButtonSizes.lg || size === ButtonSizes.xl,
  });

  return (
    <LinkBase ref={ref} className={classes} {...others}>
      {iconLeft && (
        <svg className={iconLeftClasses}>
          <use href={iconLeft} xlinkHref={iconLeft} />
        </svg>
      )}
      {children}
      {iconRight && (
        <svg className={iconRightClasses}>
          <use href={iconRight} xlinkHref={iconRight} />
        </svg>
      )}
    </LinkBase>
  );
});

Button.defaultProps = {
  variant: ButtonVariants.primary,
  size: ButtonSizes.base,
};

export default Button;
