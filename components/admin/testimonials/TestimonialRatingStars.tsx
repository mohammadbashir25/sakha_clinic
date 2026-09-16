import { LuStar } from "react-icons/lu";
import { cn } from "@/components/ui/utils";

interface TestimonialRatingStarsProps {
  rating: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

/**
 * Five small, muted marks rather than large bright stars — the brief
 * asks the CMS to avoid looking like a generic review-site widget.
 */
export function TestimonialRatingStars({ rating, className }: TestimonialRatingStarsProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <LuStar
          key={index}
          className={cn(
            "h-3.5 w-3.5",
            index < rating ? "fill-champagne text-champagne" : "fill-transparent text-muted/30",
          )}
        />
      ))}
      <span className="sr-only">{rating} out of 5</span>
    </span>
  );
}
