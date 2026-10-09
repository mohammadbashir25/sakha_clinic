"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { LuStar } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/utils";
import { emptyTestimonialTranslations, testimonialLocaleLabels, type TestimonialFormValues, type TestimonialLocale } from "./types";

interface TestimonialFormProps {
  initialValues: TestimonialFormValues;
  services: string[];
  submitLabel: string;
  onSubmit: (values: TestimonialFormValues) => Promise<void> | void;
  onCancel: () => void;
}
const inputClasses = "w-full rounded-lg border border-muted/20 bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne";
function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) { return <div className="flex flex-col gap-1.5"><label htmlFor={htmlFor} className="text-sm font-medium text-charcoal">{label}</label>{children}</div>; }

export function TestimonialForm({ initialValues, services, submitLabel, onSubmit, onCancel }: TestimonialFormProps) {
  const [values, setValues] = useState<TestimonialFormValues>({ ...initialValues, translations: { ...emptyTestimonialTranslations, ...initialValues.translations } });
  const [locale, setLocale] = useState<TestimonialLocale>("en");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const translation = values.translations[locale];
  function updateTranslation(field: "quote" | "treatment", value: string) {
    setValues((current) => ({ ...current, translations: { ...current.translations, [locale]: { ...current.translations[locale], [field]: value } } }));
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); setError("");
    for (const code of ["en", "fa", "ps"] as const) {
      const t = values.translations[code];
      if (!t.quote.trim() || !t.treatment.trim()) { setLocale(code); setError(`Please complete the testimonial and service in ${testimonialLocaleLabels[code]}.`); return; }
    }
    if (!values.name.trim()) { setError("Name is required."); return; }
    setIsSubmitting(true);
    try { await onSubmit(values); } catch (e) { setError(e instanceof Error ? e.message : "Could not save testimonial."); } finally { setIsSubmitting(false); }
  }

  return <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
    <div className="flex-1 space-y-5 overflow-y-auto p-6">
      <Field label="Client display name" htmlFor="testimonial-name"><input id="testimonial-name" required maxLength={120} value={values.name} onChange={(e) => setValues((p) => ({ ...p, name: e.target.value }))} placeholder="Use only a name approved for publication" className={inputClasses} /></Field>
      <div className="flex flex-wrap gap-2 border-b border-muted/15 pb-3" role="tablist" aria-label="Testimonial language">{(["en", "fa", "ps"] as const).map((code) => <button key={code} type="button" role="tab" aria-selected={locale === code} onClick={() => setLocale(code)} className={cn("rounded-lg px-4 py-2 text-sm font-medium", locale === code ? "bg-primary-dark text-ivory" : "bg-lavender text-muted hover:text-charcoal")}>{testimonialLocaleLabels[code]}</button>)}</div>
      <p className="text-xs leading-relaxed text-muted">Only publish a testimonial with the client's permission. Provide a faithful translation in each language.</p>
      <Field label={`Testimonial · ${testimonialLocaleLabels[locale]}`} htmlFor={`testimonial-quote-${locale}`}><textarea id={`testimonial-quote-${locale}`} required rows={5} value={translation.quote} onChange={(e) => updateTranslation("quote", e.target.value)} placeholder="The client's words, approved for publishing" className={cn(inputClasses, "resize-y")} /></Field>
      <Field label="Service / treatment" htmlFor={`testimonial-service-${locale}`}><input id={`testimonial-service-${locale}`} required list={`testimonial-services-${locale}`} value={translation.treatment} onChange={(e) => updateTranslation("treatment", e.target.value)} placeholder="e.g. Hair transplant" className={inputClasses} /><datalist id={`testimonial-services-${locale}`}>{services.map((service) => <option key={service} value={service} />)}</datalist></Field>
      <Field label="Rating" htmlFor="testimonial-rating"><div className="flex items-center gap-1" id="testimonial-rating">{([1, 2, 3, 4, 5] as const).map((star) => <button key={star} type="button" onClick={() => setValues((p) => ({ ...p, rating: star }))} aria-label={`${star} out of 5`} aria-pressed={values.rating === star} className="p-0.5"><LuStar className={cn("h-5 w-5", star <= values.rating ? "fill-champagne text-champagne" : "fill-transparent text-muted/30")} /></button>)}</div></Field>
      <Field label="Date" htmlFor="testimonial-date"><input id="testimonial-date" type="date" required value={values.date} onChange={(e) => setValues((p) => ({ ...p, date: e.target.value }))} className={inputClasses} /></Field>
      <Field label="Publication status" htmlFor="testimonial-status"><div className="flex items-center gap-1.5 rounded-lg border border-muted/15 bg-ivory p-1" id="testimonial-status">{([{ value: false, label: "Draft" }, { value: true, label: "Published" }] as const).map((option) => <button key={option.label} type="button" onClick={() => setValues((p) => ({ ...p, published: option.value }))} aria-pressed={values.published === option.value} className={cn("flex-1 rounded-md px-3 py-1.5 text-sm font-medium", values.published === option.value ? "bg-primary-dark text-ivory" : "text-muted hover:text-charcoal")}>{option.label}</button>)}</div><p className="text-xs text-muted">Only published testimonials appear on the public website.</p></Field>
    </div>
    {error && <p role="alert" className="mx-6 mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="flex items-center justify-end gap-3 border-t border-muted/15 p-6"><Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>Cancel</Button><Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? "Saving…" : submitLabel}</Button></div>
  </form>;
}
