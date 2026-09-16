export type TestimonialStatusFilter = "all" | "published" | "draft";

/** Fields the Add/Edit form collects — mirrors Testimonial minus the id. */
export interface TestimonialFormValues {
  name: string;
  treatment: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  published: boolean;
  date: string;
}
