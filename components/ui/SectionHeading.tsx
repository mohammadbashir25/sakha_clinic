import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

/**
 * <SectionHeading
 *   eyebrow="Our Services"
 *   title="Care designed around you"
 *   description="A calm, considered approach to hair restoration and skin health."
 *   align="center"
 * />
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        isCentered && "mx-auto items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-orchid">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
