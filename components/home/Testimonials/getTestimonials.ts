import type { Locale } from "@/i18n/config";
import { sampleTestimonials } from "./sampleTestimonials";
import type { Testimonial } from "./types";

/**
 * The ONE place the Testimonials section gets its data.
 *
 * TODAY: returns invented sample testimonials in development only. In a
 * production build it returns an empty list (the section then shows its
 * translated empty state), so fake reviews can never reach real visitors.
 *
 * LATER: replace the body with the real query against the existing
 * testimonial data layer (published testimonials only), mapped to the
 * `Testimonial` shape, and delete ./sampleTestimonials.ts. Throwing here
 * makes the section show its translated error state.
 */
export async function getTestimonials(locale: Locale): Promise<Testimonial[]> {
  if (process.env.NODE_ENV === "production") return [];

  return sampleTestimonials.map((item) => ({
    id: item.id,
    name: item.name[locale] ?? item.name.en,
    content: item.content[locale] ?? item.content.en,
    treatment: item.treatment ? (item.treatment[locale] ?? item.treatment.en) : undefined,
  }));
}
