import type { Testimonial } from "@/types/admin";
import { TestimonialActions } from "./TestimonialActions";
import { TestimonialRatingStars } from "./TestimonialRatingStars";
import { TestimonialStatusBadge } from "./TestimonialStatusBadge";

interface TestimonialRowProps {
  testimonial: Testimonial;
  onView: () => void;
  onEdit: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
}

export function TestimonialRow({
  testimonial,
  onView,
  onEdit,
  onTogglePublish,
  onDelete,
}: TestimonialRowProps) {
  return (
    <tr className="border-b border-muted/10 last:border-b-0 hover:bg-lavender/30">
      <td className="py-4 pl-5 pr-3 align-top">
        <button
          type="button"
          onClick={onView}
          className="text-left text-sm font-medium text-charcoal hover:text-primary focus-visible:outline-none focus-visible:underline"
        >
          {testimonial.name}
        </button>
      </td>
      <td className="max-w-md py-4 pr-3 align-top">
        <p className="line-clamp-2 text-sm leading-relaxed text-charcoal/80">{testimonial.quote}</p>
      </td>
      <td className="py-4 pr-3 align-top">
        <span className="text-sm text-muted">{testimonial.treatment}</span>
      </td>
      <td className="py-4 pr-3 align-top">
        <TestimonialRatingStars rating={testimonial.rating} />
      </td>
      <td className="py-4 pr-3 align-top">
        <TestimonialStatusBadge published={testimonial.published} />
      </td>
      <td className="py-4 pr-3 align-top">
        <span className="text-sm text-muted">
          {new Date(testimonial.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </td>
      <td className="py-4 pl-3 pr-5 align-top">
        <TestimonialActions
          name={testimonial.name}
          published={testimonial.published}
          onView={onView}
          onEdit={onEdit}
          onTogglePublish={onTogglePublish}
          onDelete={onDelete}
          className="flex items-center justify-end gap-1"
        />
      </td>
    </tr>
  );
}
