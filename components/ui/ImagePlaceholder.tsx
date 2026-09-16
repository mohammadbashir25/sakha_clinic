import { HTMLAttributes } from "react";
import { cn } from "./utils";

export interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
}

const aspectStyles: Record<NonNullable<ImagePlaceholderProps["aspectRatio"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

/**
 * Stand-in for sections where real clinic photography hasn't been
 * added yet. Reads as an intentional editorial placeholder — a soft
 * gradient field, a restrained gold edge, and a visible caption —
 * rather than a broken or empty image.
 *
 * <ImagePlaceholder label="Clinic interior" aspectRatio="landscape" />
 */
export function ImagePlaceholder({
  label = "Image coming soon",
  aspectRatio = "landscape",
  className,
  ...props
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-lavender via-ivory to-lavender",
        aspectStyles[aspectRatio],
        className,
      )}
      {...props}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        className="text-orchid/40"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.75" />
        <path d="M3 17l5-5 4 4 3-3 6 6" />
      </svg>
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
    </div>
  );
}