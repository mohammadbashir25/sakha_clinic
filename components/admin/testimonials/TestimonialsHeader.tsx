import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

interface TestimonialsHeaderProps {
  onAddClick: () => void;
}

export function TestimonialsHeader({ onAddClick }: TestimonialsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold text-charcoal sm:text-2xl">Testimonials</h2>
        <p className="max-w-xl text-sm text-muted">
          Manage the patient and client testimonials displayed across the Sakha website.
        </p>
      </div>

      <Button variant="primary" onClick={onAddClick} className="shrink-0">
        <LuPlus className="h-4 w-4" aria-hidden="true" />
        Add Testimonial
      </Button>
    </div>
  );
}
