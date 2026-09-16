import { LuMessageCircle, LuPlus, LuSearchX } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

interface TestimonialEmptyStateProps {
  /** True when filters/search are hiding results rather than there being no data at all. */
  isFiltered: boolean;
  onAddClick: () => void;
  onClearFilters: () => void;
}

export function TestimonialEmptyState({ isFiltered, onAddClick, onClearFilters }: TestimonialEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-muted/15 bg-white/60 px-6 py-16 text-center">
        <LuSearchX className="h-8 w-8 text-muted/50" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-charcoal">No testimonials match your search</p>
          <p className="mt-1 text-sm text-muted">Try a different term or clear your filters.</p>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm font-medium text-primary hover:underline"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-muted/15 bg-white/60 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender text-primary">
        <LuMessageCircle className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-medium text-charcoal">No testimonials yet</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
          Add approved patient or client feedback to display authentic experiences on the Sakha
          website.
        </p>
      </div>
      <Button variant="primary" onClick={onAddClick}>
        <LuPlus className="h-4 w-4" aria-hidden="true" />
        Add Testimonial
      </Button>
    </div>
  );
}
