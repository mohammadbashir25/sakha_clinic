import type { Testimonial } from "@/types/admin";
import { TestimonialActions } from "./TestimonialActions";
import { TestimonialStatusBadge } from "./TestimonialStatusBadge";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onView: () => void;
  onEdit: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
}

/**
 * Prioritizes name, a short excerpt, status and service, per the brief —
 * the full quote lives behind the preview, not on the card itself.
 */
export function TestimonialCard({
  testimonial,
  onView,
  onEdit,
  onTogglePublish,
  onDelete,
}: TestimonialCardProps) {
  return (
    <div className="rounded-xl border border-muted/15 bg-white/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={onView} className="text-left focus-visible:outline-none">
          <p className="text-sm font-medium text-charcoal underline-offset-2 hover:underline">
            {testimonial.name}
          </p>
          <p className="mt-0.5 text-xs text-muted">{testimonial.treatment}</p>
        </button>
        <TestimonialStatusBadge published={testimonial.published} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-charcoal/80">{testimonial.quote}</p>

      <div className="mt-4 flex items-center justify-between border-t border-muted/10 pt-3">
        <span className="text-xs text-muted">
          {new Date(testimonial.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <TestimonialActions
          name={testimonial.name}
          published={testimonial.published}
          onView={onView}
          onEdit={onEdit}
          onTogglePublish={onTogglePublish}
          onDelete={onDelete}
          className="flex items-center gap-1"
        />
      </div>
    </div>
  );
}
