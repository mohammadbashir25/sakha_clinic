"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { LuStar } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/utils";
import type { TestimonialFormValues } from "./types";

interface TestimonialFormProps {
  initialValues: TestimonialFormValues;
  services: string[];
  submitLabel: string;
  onSubmit: (values: TestimonialFormValues) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full rounded-lg border border-muted/20 bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TestimonialForm({
  initialValues,
  services,
  submitLabel,
  onSubmit,
  onCancel,
}: TestimonialFormProps) {
  const [values, setValues] = useState<TestimonialFormValues>(initialValues);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto p-6">
        <Field label="Name" htmlFor="testimonial-name">
          <input
            id="testimonial-name"
            required
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="e.g. Ahmad N."
            className={inputClasses}
          />
        </Field>

        <Field label="Testimonial" htmlFor="testimonial-quote">
          <textarea
            id="testimonial-quote"
            required
            rows={5}
            value={values.quote}
            onChange={(event) => setValues((prev) => ({ ...prev, quote: event.target.value }))}
            placeholder="The client's own words, exactly as authorized for publishing."
            className={cn(inputClasses, "resize-none")}
          />
        </Field>

        <Field label="Service" htmlFor="testimonial-service">
          <input
            id="testimonial-service"
            required
            list="testimonial-services"
            value={values.treatment}
            onChange={(event) => setValues((prev) => ({ ...prev, treatment: event.target.value }))}
            placeholder="e.g. Hair Transplant"
            className={inputClasses}
          />
          <datalist id="testimonial-services">
            {services.map((service) => (
              <option key={service} value={service} />
            ))}
          </datalist>
        </Field>

        <Field label="Rating" htmlFor="testimonial-rating">
          <div className="flex items-center gap-1" id="testimonial-rating">
            {([1, 2, 3, 4, 5] as const).map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValues((prev) => ({ ...prev, rating: star }))}
                aria-label={`${star} out of 5`}
                aria-pressed={values.rating === star}
                className="p-0.5"
              >
                <LuStar
                  className={cn(
                    "h-5 w-5",
                    star <= values.rating ? "fill-champagne text-champagne" : "fill-transparent text-muted/30",
                  )}
                />
              </button>
            ))}
          </div>
        </Field>

        <Field label="Date" htmlFor="testimonial-date">
          <input
            id="testimonial-date"
            type="date"
            required
            value={values.date}
            onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))}
            className={inputClasses}
          />
        </Field>

        <Field label="Status" htmlFor="testimonial-status">
          <div className="flex items-center gap-1.5 rounded-lg border border-muted/15 bg-ivory p-1" id="testimonial-status">
            {([
              { value: false, label: "Draft" },
              { value: true, label: "Published" },
            ] as const).map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setValues((prev) => ({ ...prev, published: option.value }))}
                aria-pressed={values.published === option.value}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                  values.published === option.value
                    ? "bg-primary-dark text-ivory"
                    : "text-muted hover:text-charcoal",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">
            Only published testimonials appear on the public Sakha website.
          </p>
        </Field>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-muted/15 p-6">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
