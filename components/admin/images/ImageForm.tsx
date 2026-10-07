"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ImageMetadataFields } from "./ImageMetadataFields";
import { ImageUploadField } from "./ImageUploadField";
import type { ImageFormValues } from "./types";

interface ImageFormProps {
  mode: "add" | "edit";
  initialValues: ImageFormValues;
  categories: string[];
  submitLabel: string;
  onSubmit: (values: ImageFormValues) => void;
  onCancel: () => void;
}

type FormErrors = Partial<Record<"image" | "title" | "alt" | "category", string>>;

export function ImageForm({ mode, initialValues, categories, submitLabel, onSubmit, onCancel }: ImageFormProps) {
  const [values, setValues] = useState<ImageFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (mode === "add" && !values.url) nextErrors.image = "Choose an image to upload.";
    if (!values.title.trim()) nextErrors.title = "Title is required.";
    if (!values.alt.trim()) nextErrors.alt = "Alt text is required.";
    if (!values.category.trim()) nextErrors.category = "Category is required.";
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    // Simulated frontend-only submit — nothing is uploaded or persisted yet.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 sm:grid-cols-2">
        <ImageUploadField
          previewUrl={values.url}
          filename={values.filename}
          error={errors.image}
          onSelect={({ url, filename }) => {
            setValues((prev) => ({ ...prev, url, filename }));
            setErrors((prev) => ({ ...prev, image: undefined }));
          }}
          onRemove={() => setValues((prev) => ({ ...prev, url: "", filename: "" }))}
        />

        <ImageMetadataFields
          values={values}
          errors={errors}
          categories={categories}
          onChange={setValues}
        />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-muted/15 p-6">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
