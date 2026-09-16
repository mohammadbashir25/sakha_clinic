import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "./utils";

export type IconButtonVariant = "primary" | "ghost" | "outline";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  "aria-label": string;
  variant?: IconButtonVariant;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary: "bg-primary text-ivory hover:bg-primary-dark",
  ghost: "bg-transparent text-charcoal hover:bg-lavender",
  outline: "border border-muted/30 text-charcoal hover:bg-lavender",
};

/**
 * Icon-only button used for mobile navigation, gallery controls,
 * social icons and close buttons. `aria-label` is required.
 *
 * <IconButton icon={<MenuIcon />} aria-label="Open menu" variant="ghost" />
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = "ghost", disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
