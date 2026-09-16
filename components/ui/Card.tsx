import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type CardVariant = "default" | "elevated" | "bordered";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-ivory",
  elevated: "bg-ivory shadow-md",
  bordered: "bg-ivory border border-muted/15",
};

/**
 * <Card variant="bordered">
 *   <h3>Dr. Amina Rahimi</h3>
 *   <p>Consultant Dermatologist</p>
 * </Card>
 */
export function Card({ children, variant = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-xl p-6 sm:p-8", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
