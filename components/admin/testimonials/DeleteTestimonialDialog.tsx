import type { Testimonial } from "@/types/admin";
import { Button } from "@/components/ui/Button";
import { TestimonialModalBase } from "./TestimonialModalBase";

interface DeleteTestimonialDialogProps {
  testimonial: Testimonial | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteTestimonialDialog({
  testimonial,
  onCancel,
  onConfirm,
}: DeleteTestimonialDialogProps) {
  return (
    <TestimonialModalBase
      open={testimonial !== null}
      onClose={onCancel}
      ariaLabel="Delete this testimonial?"
      className="max-w-sm"
    >
      {testimonial && (
        <div className="p-6">
          <h2 className="text-lg font-semibold text-charcoal">Delete this testimonial?</h2>
          <p className="mt-2 text-sm text-muted">
            Are you sure you want to remove {testimonial.name}&rsquo;s testimonial? This can&rsquo;t
            be undone.
          </p>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={onConfirm} className="bg-red-700 hover:bg-red-800">
              Delete
            </Button>
          </div>
        </div>
      )}
    </TestimonialModalBase>
  );
}
