import { LuX } from "react-icons/lu";
import type { Testimonial } from "@/types/admin";
import { IconButton } from "@/components/ui/IconButton";
import { TestimonialModalBase } from "./TestimonialModalBase";
import { TestimonialRatingStars } from "./TestimonialRatingStars";
import { TestimonialStatusBadge } from "./TestimonialStatusBadge";

interface TestimonialPreviewProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

export function TestimonialPreview({ testimonial, onClose }: TestimonialPreviewProps) {
  return (
    <TestimonialModalBase
      open={testimonial !== null}
      onClose={onClose}
      ariaLabel={testimonial ? `Testimonial from ${testimonial.name}` : "Testimonial preview"}
    >
      {testimonial && (
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <TestimonialStatusBadge published={testimonial.published} />
            <IconButton
              icon={<LuX className="h-4 w-4" />}
              aria-label="Close preview"
              variant="ghost"
              onClick={onClose}
            />
          </div>

          <p className="mt-5 text-lg leading-relaxed text-charcoal">“{testimonial.quote}”</p>

          <div className="mt-6 flex items-center justify-between border-t border-muted/15 pt-4">
            <div>
              <p className="text-sm font-medium text-charcoal">{testimonial.name}</p>
              <p className="text-sm text-muted">{testimonial.treatment}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <TestimonialRatingStars rating={testimonial.rating} />
              <span className="text-xs text-muted">
                {new Date(testimonial.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </TestimonialModalBase>
  );
}
