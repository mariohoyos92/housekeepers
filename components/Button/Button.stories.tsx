import React from "react";
import Button, { ButtonSizes, ButtonVariants } from "./Button";

export default {
  title: "Elements/Button",
  component: Button,
};

export const primaryButton = () => (
  <div className="flex items-center justify-between">
    <Button onClick={() => {}} size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}}>Button</Button>
    <Button onClick={() => {}} size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const secondaryButton = () => (
  <div className="flex items-center justify-between">
    <Button onClick={() => {}} variant={ButtonVariants.secondary} size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.secondary} size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.secondary}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.secondary} size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.secondary} size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const whiteButton = () => (
  <div className="flex items-center justify-between">
    <Button onClick={() => {}} variant={ButtonVariants.white} size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.white} size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.white}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.white} size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.white} size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const transparentButton = () => (
  <div className="flex items-center justify-between p-4 bg-charcoal-200">
    <Button onClick={() => {}} variant={ButtonVariants.transparent} size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.transparent} size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.transparent}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.transparent} size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.transparent} size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const textButtons = () => (
  <div className="flex items-center justify-between">
    <Button onClick={() => {}} variant={ButtonVariants.text} size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.text} size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.text}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.text} size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.text} size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const buttonWithLeftIcon = () => (
  <div className="flex items-center justify-between">
    <Button onClick={() => {}} iconLeft="#thumb_up" size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} iconLeft="#thumb_up" size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}} iconLeft="#thumb_up">
      Button
    </Button>
    <Button onClick={() => {}} iconLeft="#thumb_up" size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} iconLeft="#thumb_up" size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const buttonWithRightIcon = () => (
  <div className="flex items-center justify-between">
    <Button onClick={() => {}} iconRight="#check" size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} iconRight="#check" size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}} iconRight="#check">
      Button
    </Button>
    <Button onClick={() => {}} iconRight="#check" size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} iconRight="#check" size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const redButton = () => (
  <div className="flex items-center justify-between p-4">
    <Button onClick={() => {}} variant={ButtonVariants.red} size={ButtonSizes.xs}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.red} size={ButtonSizes.sm}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.red}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.red} size={ButtonSizes.lg}>
      Button
    </Button>
    <Button onClick={() => {}} variant={ButtonVariants.red} size={ButtonSizes.xl}>
      Button
    </Button>
  </div>
);

export const linkButton = () => (
  <Button href="#" disabled>
    Button
  </Button>
);
