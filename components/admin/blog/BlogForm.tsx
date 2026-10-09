"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/utils";
import { BlogFeaturedImageField } from "./BlogFeaturedImageField";
import { localeLabels, type BlogFormValues, type ContentLocale } from "./types";

interface BlogFormProps {
  initialValues: BlogFormValues;
  categories: string[];
  submitLabel: string;
  onSubmit: (values: BlogFormValues) => Promise<void> | void;
  onCancel: () => void;
}

type TranslationField = "title" | "excerpt" | "content" | "author" | "coverImageAlt";
const inputClasses = "w-full rounded-lg border border-muted/20 bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid";

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: ReactNode }) {
  return <div className="flex flex-col gap-1.5"><label htmlFor={htmlFor} className="text-sm font-medium text-charcoal">{label}</label>{children}{error && <p role="alert" className="text-xs text-red-600">{error}</p>}</div>;
}

function slugify(value: string) {
  return value.toLowerCase().trim().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export function BlogForm({ initialValues, categories, submitLabel, onSubmit, onCancel }: BlogFormProps) {
  const [values, setValues] = useState<BlogFormValues>(initialValues);
  const [locale, setLocale] = useState<ContentLocale>("en");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const translation = values.translations[locale];

  function updateTranslation(field: TranslationField, value: string) {
    setValues((current) => ({ ...current, translations: { ...current.translations, [locale]: { ...current.translations[locale], [field]: value } } }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    for (const code of ["en", "fa", "ps"] as const) {
      const t = values.translations[code];
      if (![t.title, t.excerpt, t.content, t.author, t.coverImageAlt].every((item) => item.trim())) {
        setLocale(code);
        setError(`Please complete the title, excerpt, article, author, and image description in ${localeLabels[code]}.`);
        return;
      }
    }
    if (!values.slug.trim() || !values.category.trim() || !values.coverImage.trim()) {
      setError("Slug, category, and cover image are required.");
      return;
    }
    setIsSubmitting(true);
    try { await onSubmit(values); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not save this blog post."); }
    finally { setIsSubmitting(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div className="flex flex-wrap gap-2 border-b border-muted/15 pb-3" role="tablist" aria-label="Blog language">
            {(["en", "fa", "ps"] as const).map((code) => (
              <button key={code} type="button" role="tab" aria-selected={locale === code} onClick={() => setLocale(code)} className={cn("rounded-lg px-4 py-2 text-sm font-medium", locale === code ? "bg-primary-dark text-ivory" : "bg-lavender text-muted hover:text-charcoal")}>{localeLabels[code]}</button>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-muted">Enter a complete translation for each language. The public website displays the translation matching the visitor’s selected language.</p>
          <Field label={`Title · ${localeLabels[locale]}`} htmlFor={`blog-title-${locale}`}>
            <input id={`blog-title-${locale}`} required value={translation.title} onChange={(e) => updateTranslation("title", e.target.value)} placeholder="Article title" className={inputClasses} />
          </Field>
          <Field label="Excerpt" htmlFor={`blog-excerpt-${locale}`}>
            <textarea id={`blog-excerpt-${locale}`} required rows={3} value={translation.excerpt} onChange={(e) => updateTranslation("excerpt", e.target.value)} placeholder="Short summary shown in blog listings" className={cn(inputClasses, "resize-y")} />
          </Field>
          <Field label="Full article" htmlFor={`blog-content-${locale}`}>
            <textarea id={`blog-content-${locale}`} required rows={14} value={translation.content} onChange={(e) => updateTranslation("content", e.target.value)} placeholder="Write the full article in this language" className={cn(inputClasses, "resize-y leading-relaxed")} />
            <p className="text-xs text-muted">Plain text is supported. Line breaks are preserved by the article renderer.</p>
          </Field>
          <Field label="Author display name" htmlFor={`blog-author-${locale}`}>
            <input id={`blog-author-${locale}`} required value={translation.author} onChange={(e) => updateTranslation("author", e.target.value)} className={inputClasses} />
          </Field>
          <Field label="Image description (alt text)" htmlFor={`blog-alt-${locale}`}>
            <input id={`blog-alt-${locale}`} required value={translation.coverImageAlt} onChange={(e) => updateTranslation("coverImageAlt", e.target.value)} placeholder="Describe the cover image for accessibility" className={inputClasses} />
          </Field>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-1">
          <Field label="Slug (shared across languages)" htmlFor="blog-slug">
            <div className="flex gap-2"><input id="blog-slug" required value={values.slug} onChange={(e) => setValues((p) => ({ ...p, slug: slugify(e.target.value) }))} placeholder="hair-transplant-guide" className={inputClasses} /><button type="button" onClick={() => setValues((p) => ({ ...p, slug: slugify(p.translations.en.title) }))} className="shrink-0 rounded-lg border border-muted/20 px-3 text-xs font-medium text-muted hover:text-charcoal">Generate</button></div>
          </Field>
          <Field label="Category" htmlFor="blog-category">
            <input id="blog-category" required list="blog-categories" value={values.category} onChange={(e) => setValues((p) => ({ ...p, category: e.target.value }))} placeholder="e.g. Dermatology" className={inputClasses} />
            <datalist id="blog-categories">{categories.map((category) => <option key={category} value={category} />)}</datalist>
          </Field>
          <BlogFeaturedImageField coverImage={values.coverImage} coverImageAlt={translation.coverImageAlt} onChange={({ coverImage, coverImageAlt }) => setValues((p) => ({ ...p, coverImage, translations: { ...p.translations, [locale]: { ...p.translations[locale], coverImageAlt } } }))} onRemove={() => setValues((p) => ({ ...p, coverImage: "" }))} />
          <Field label="Publication status" htmlFor="blog-status">
            <div className="flex items-center gap-1.5 rounded-lg border border-muted/15 bg-ivory p-1" id="blog-status">{([{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }] as const).map((option) => <button key={option.value} type="button" onClick={() => setValues((p) => ({ ...p, status: option.value }))} aria-pressed={values.status === option.value} className={cn("flex-1 rounded-md px-3 py-1.5 text-sm font-medium", values.status === option.value ? "bg-primary-dark text-ivory" : "text-muted hover:text-charcoal")}>{option.label}</button>)}</div>
          </Field>
          <Field label="Publication date" htmlFor="blog-date"><input id="blog-date" type="date" value={values.date} onChange={(e) => setValues((p) => ({ ...p, date: e.target.value }))} className={inputClasses} /></Field>
        </div>
      </div>
      {error && <p role="alert" className="mx-6 mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="flex items-center justify-end gap-3 border-t border-muted/15 p-6"><Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>Cancel</Button><Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? "Saving…" : submitLabel}</Button></div>
    </form>
  );
}
