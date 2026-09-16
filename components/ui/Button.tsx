import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium " +
  "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-ivory hover:bg-primary-dark",
  secondary: "bg-lavender text-primary hover:bg-lavender/70",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary hover:text-ivory",
  ghost: "bg-transparent text-primary hover:bg-lavender",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      disabled,
      children,
      className,
      href,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    const content = (
      <>
        {isLoading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}

        {!isLoading && icon && iconPosition === "left" && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        <span>{children}</span>

        {!isLoading && icon && iconPosition === "right" && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    );

    // Navigation button
    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    // Normal button
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";