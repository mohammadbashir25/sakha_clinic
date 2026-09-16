import { cn } from "@/components/ui/utils";

interface TestimonialStatusBadgeProps {
  published: boolean;
  className?: string;
}

/**
 * Deliberately quiet — a filled dot plus a label, not a bright chip.
 * Published reuses the lavender/primary pairing already used for the
 * admin identity chip in AdminHeader, so it reads as part of the same system.
 */
export function TestimonialStatusBadge({ published, className }: TestimonialStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        published
          ? "border-primary/10 bg-lavender text-primary"
          : "border-muted/20 bg-muted/10 text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", published ? "bg-primary" : "bg-muted")}
      />
      {published ? "Published" : "Draft"}
    </span>
  );
}
