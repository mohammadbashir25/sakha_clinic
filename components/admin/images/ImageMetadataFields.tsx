import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils";
import type { ImageFormValues } from "./types";

interface ImageMetadataFieldsProps {
  values: ImageFormValues;
  errors: Partial<Record<"title" | "alt" | "category", string>>;
  categories: string[];
  onChange: (values: ImageFormValues) => void;
}

const inputClasses =
  "w-full rounded-lg border border-muted/20 bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid";
const errorInputClasses = "border-red-300 focus-visible:ring-red-300";

function Field({
  label,
  htmlFor,
  error,
  optional,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-charcoal">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ImageMetadataFields({ values, errors, categories, onChange }: ImageMetadataFieldsProps) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Title" htmlFor="image-title" error={errors.title}>
        <input
          id="image-title"
          value={values.title}
          onChange={(event) => onChange({ ...values, title: event.target.value })}
          placeholder="e.g. Reception, ground floor"
          className={cn(inputClasses, errors.title && errorInputClasses)}
        />
      </Field>

      <Field
        label="Alt text"
        htmlFor="image-alt"
        error={errors.alt}
        hint="Describes the image for screen readers and when it can't load."
      >
        <input
          id="image-alt"
          value={values.alt}
          onChange={(event) => onChange({ ...values, alt: event.target.value })}
          placeholder="e.g. Sakha clinic reception area"
          className={cn(inputClasses, errors.alt && errorInputClasses)}
        />
      </Field>

      <Field label="Category" htmlFor="image-category" error={errors.category}>
        <input
          id="image-category"
          list="image-categories"
          value={values.category}
          onChange={(event) => onChange({ ...values, category: event.target.value })}
          placeholder="e.g. Clinic"
          className={cn(inputClasses, errors.category && errorInputClasses)}
        />
        <datalist id="image-categories">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </Field>

      <Field label="Description" htmlFor="image-description" optional>
        <textarea
          id="image-description"
          rows={3}
          value={values.description}
          onChange={(event) => onChange({ ...values, description: event.target.value })}
          placeholder="A short internal note about this image."
          className={cn(inputClasses, "resize-none")}
        />
      </Field>
    </div>
  );
}
