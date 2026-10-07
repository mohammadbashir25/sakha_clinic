/**
 * Shape the Testimonials UI expects: one testimonial, already in a single
 * language (the visitor's), with only the fields the UI can display.
 *
 * When the real MongoDB model exists, map each document to this shape inside
 * `getTestimonials.ts` — the UI components do not need to change. Optional
 * fields are simply not rendered when absent.
 */
export interface Testimonial {
  id: string;
  /** Author name, as intentionally stored/displayed. */
  name: string;
  /** The testimonial text. */
  content: string;
  /** Optional treatment/service label. */
  treatment?: string;
}
