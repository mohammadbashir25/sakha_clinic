import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type BadgeVariant = "default" | "gold" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-lavender text-primary",
  gold: "bg-gold/15 text-primary-dark",
  outline: "border border-muted/30 text-muted",
};

/**
 * Used for service categories, featured labels, and small trust indicators.
 *
 * <Badge>Hair Restoration</Badge>
 * <Badge variant="gold">Featured</Badge>
 */
export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
