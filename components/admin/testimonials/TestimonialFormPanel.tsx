import { LuX } from "react-icons/lu";
import { IconButton } from "@/components/ui/IconButton";
import { TestimonialForm } from "./TestimonialForm";
import { TestimonialModalBase } from "./TestimonialModalBase";
import type { TestimonialFormValues } from "./types";

interface TestimonialFormPanelProps {
  mode: "add" | "edit" | null;
  initialValues: TestimonialFormValues;
  services: string[];
  onClose: () => void;
  onSubmit: (values: TestimonialFormValues) => void;
}

export function TestimonialFormPanel({
  mode,
  initialValues,
  services,
  onClose,
  onSubmit,
}: TestimonialFormPanelProps) {
  const title = mode === "edit" ? "Edit testimonial" : "Add testimonial";

  return (
    <TestimonialModalBase open={mode !== null} onClose={onClose} ariaLabel={title} variant="drawer">
      <div className="flex items-center justify-between border-b border-muted/15 p-6 pb-5">
        <h2 className="text-lg font-semibold text-charcoal">{title}</h2>
        <IconButton
          icon={<LuX className="h-4 w-4" />}
          aria-label="Close"
          variant="ghost"
          onClick={onClose}
        />
      </div>

      <TestimonialForm
        key={mode}
        initialValues={initialValues}
        services={services}
        submitLabel={mode === "edit" ? "Save changes" : "Add testimonial"}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </TestimonialModalBase>
  );
}
