import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: "div" | "section" | "article";
}

/**
 * Centered responsive page container.
 *
 * <Container>
 *   <SectionHeading ... />
 * </Container>
 */
export function Container({ children, as: Tag = "div", className, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
