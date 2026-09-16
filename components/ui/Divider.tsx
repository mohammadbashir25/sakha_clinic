import { HTMLAttributes } from "react";
import { cn } from "./utils";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

/**
 * <Divider />
 * <Divider orientation="vertical" className="h-8" />
 */
export function Divider({ orientation = "horizontal", className, ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <hr
        role="separator"
        aria-orientation="vertical"
        className={cn("w-px self-stretch border-0 bg-muted/15", className)}
        {...props}
      />
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full border-0 bg-muted/15", className)}
      {...props}
    />
  );
}
