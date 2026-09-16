import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

interface SectionShellProps {
  title: string;
  /** Optional trailing link, e.g. "View all blogs". */
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Rule + heading + optional trailing link. Deliberately flat rather
 * than a card, so the page isn't a grid of boxes.
 */
export function SectionShell({
  title,
  actionLabel,
  actionHref,
  children,
  className,
}: SectionShellProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-baseline justify-between gap-4 border-b border-muted/15 pb-3">
        <h2 className="text-base font-semibold text-charcoal">{title}</h2>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="shrink-0 rounded text-sm font-medium text-orchid transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            {actionLabel}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
