"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { MediaImage } from "@/types/admin";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/utils";
import { BlogFeaturedImageField } from "./BlogFeaturedImageField";
import type { BlogFormValues } from "./types";

interface BlogFormProps {
  initialValues: BlogFormValues;
  categories: string[];
  images: MediaImage[];
  submitLabel: string;
  onSubmit: (values: BlogFormValues) => void;
  onCancel: () => void;
}

type FormErrors = Partial<Record<"title" | "slug" | "content" | "category", string>>;

const inputClasses =
  "w-full rounded-lg border border-muted/20 bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid";

const errorInputClasses = "border-red-300 focus-visible:ring-red-300";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-charcoal">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function BlogForm({
  initialValues,
  categories,
  images,
  submitLabel,
  onSubmit,
  onCancel,
}: BlogFormProps) {
  const [values, setValues] = useState<BlogFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.title.trim()) nextErrors.title = "Title is required.";
    if (!values.slug.trim()) nextErrors.slug = "Slug is required.";
    if (!values.content.trim()) nextErrors.content = "Content is required.";
    if (!values.category.trim()) nextErrors.category = "Category is required.";
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    // Simulated frontend-only submit — replace with a real call later.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Field label="Title" htmlFor="blog-title" error={errors.title}>
            <input
              id="blog-title"
              value={values.title}
              onChange={(event) => {
                const title = event.target.value;
                setValues((prev) => ({
                  ...prev,
                  title,
                  slug: prev.slug === slugify(prev.title) ? slugify(title) : prev.slug,
                }));
              }}
              placeholder="e.g. What to expect after your first consultation"
              className={cn(inputClasses, errors.title && errorInputClasses)}
            />
          </Field>

          <Field label="Slug" htmlFor="blog-slug" error={errors.slug}>
            <div className="flex gap-2">
              <input
                id="blog-slug"
                value={values.slug}
                onChange={(event) => setValues((prev) => ({ ...prev, slug: event.target.value }))}
                placeholder="e.g. first-consultation"
                className={cn(inputClasses, errors.slug && errorInputClasses)}
              />
              <button
                type="button"
                onClick={() => setValues((prev) => ({ ...prev, slug: slugify(prev.title) }))}
                className="shrink-0 rounded-lg border border-muted/20 px-3 text-xs font-medium text-muted hover:bg-muted/5 hover:text-charcoal"
              >
                Generate from title
              </button>
            </div>
          </Field>

          <Field label="Excerpt" htmlFor="blog-excerpt" optional>
            <textarea
              id="blog-excerpt"
              rows={2}
              value={values.excerpt}
              onChange={(event) => setValues((prev) => ({ ...prev, excerpt: event.target.value }))}
              placeholder="A short summary shown in blog listings."
              className={cn(inputClasses, "resize-none")}
            />
          </Field>

          <Field label="Content" htmlFor="blog-content" error={errors.content}>
            <textarea
              id="blog-content"
              rows={14}
              value={values.content}
              onChange={(event) => setValues((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Write the full article here."
              className={cn(inputClasses, "resize-y font-normal leading-relaxed", errors.content && errorInputClasses)}
            />
            <p className="text-xs text-muted">Plain text for now — formatting tools can be added later.</p>
          </Field>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <Field label="Category" htmlFor="blog-category" error={errors.category}>
            <input
              id="blog-category"
              list="blog-categories"
              value={values.category}
              onChange={(event) => setValues((prev) => ({ ...prev, category: event.target.value }))}
              placeholder="e.g. Dermatology"
              className={cn(inputClasses, errors.category && errorInputClasses)}
            />
            <datalist id="blog-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </Field>

          <Field label="Author" htmlFor="blog-author" optional>
            <input
              id="blog-author"
              value={values.author}
              onChange={(event) => setValues((prev) => ({ ...prev, author: event.target.value }))}
              placeholder="e.g. Dr. Amina Rahimi"
              className={inputClasses}
            />
          </Field>

          <BlogFeaturedImageField
            coverImage={values.coverImage}
            coverImageAlt={values.coverImageAlt}
            images={images}
            onChange={({ coverImage, coverImageAlt }) =>
              setValues((prev) => ({ ...prev, coverImage, coverImageAlt }))
            }
            onRemove={() => setValues((prev) => ({ ...prev, coverImage: "", coverImageAlt: "" }))}
          />

          <Field label="Status" htmlFor="blog-status">
            <div className="flex items-center gap-1.5 rounded-lg border border-muted/15 bg-ivory p-1" id="blog-status">
              {([
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValues((prev) => ({ ...prev, status: option.value }))}
                  aria-pressed={values.status === option.value}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                    values.status === option.value
                      ? "bg-primary-dark text-ivory"
                      : "text-muted hover:text-charcoal",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Published date" htmlFor="blog-date">
            <input
              id="blog-date"
              type="date"
              value={values.date}
              onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))}
              className={inputClasses}
            />
          </Field>
        </div>
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
