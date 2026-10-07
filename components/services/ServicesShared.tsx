import type { ReactNode } from "react";

/** Letter-spacing is disabled in RTL: tracking breaks Arabic-script joins. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne rtl:tracking-normal">
      {children}
    </span>
  );
}

export const buttonOnLight =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-ivory transition-colors duration-200 hover:bg-orchid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orchid";

export const buttonOnDark =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-8 py-4 text-base font-medium text-primary transition-colors duration-200 hover:bg-champagne hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne";