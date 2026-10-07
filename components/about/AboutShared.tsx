import Image from "next/image";
import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { AboutImageConfig } from "./data";

/**
 * Eyebrow label. Letter-spacing is disabled in RTL because tracking
 * breaks the joined letterforms of Arabic-script text.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne rtl:tracking-normal">
      {children}
    </span>
  );
}

/** Splits a translated "A · B | C" style line into its parts. */
export function splitList(value: string): string[] {
  return value
    .split(/[·|•]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

interface AboutPortraitProps {
  image: AboutImageConfig;
  alt: string;
  priority?: boolean;
}

/**
 * Shows the real portrait at its intrinsic aspect ratio (no forced crop),
 * or a placeholder while no real image path has been supplied.
 */
export function AboutPortrait({ image, alt, priority }: AboutPortraitProps) {
  if (!image.src) {
    return (
      <ImagePlaceholder label={image.placeholderLabel} className="w-full" />
    );
  }

  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 448px, 100vw"
      className="h-auto w-full"
    />
  );
}