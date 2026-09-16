export interface Testimonial {
  /** Maps to MongoDB's _id.toString() once real records are wired in. */
  id: string;
  name: string;
  testimonial: string;
  rating?: number;
  treatment?: string;
  image?: {
    src: string;
    alt: string;
  };
  date?: string;
}

export interface TestimonialsData {
  eyebrow: string;
  heading: string;
  description: string;
  /** Shown instead of the stage when `testimonials` is empty. */
  emptyStateMessage: string;
}

/**
 * Section-level content for the Testimonials section.
 */
export const testimonialsData: TestimonialsData = {
  eyebrow: "Patient Experiences",

  heading: "Hear from people we've cared for.",

  description:
    "Real experiences can help you understand what the Sakha patient journey feels like. Testimonials shown here should reflect genuine feedback shared with the clinic.",

  emptyStateMessage:
    "Patient experiences will be shared here as approved testimonials become available.",
};

/**
 * Demo testimonials for development and UI testing.
 *
 * Replace these with real, client-approved testimonials
 * before using them on the live website. Never invent patient
 * names, quotes, ratings, treatments, dates, or photographs for
 * production use.
 */
export const testimonials: Testimonial[] = [
  {
    id: "demo-testimonial-1",
    name: "Ahmad R.",
    testimonial:
      "The consultation was comfortable and informative. I appreciated having my concerns explained clearly before discussing the available options.",
    rating: 5,
    treatment: "Hair Transplant",
    date: "2026-03",
  },

  {
    id: "demo-testimonial-2",
    name: "Maryam S.",
    testimonial:
      "The team made me feel comfortable from the beginning. Everything was explained in a simple way, and I felt listened to throughout the process.",
    rating: 5,
    treatment: "Dermatology",
    date: "2026-04",
  },

  {
    id: "demo-testimonial-3",
    name: "Farid K.",
    testimonial:
      "I had a very positive consultation experience. The staff were welcoming, and I felt comfortable asking questions about my treatment options.",
    rating: 5,
    treatment: "Skin Treatment",
    date: "2026-05",
  },

  {
    id: "demo-testimonial-4",
    name: "Sahar M.",
    testimonial:
      "What I liked most was the personal attention. The consultation felt focused on my concerns rather than being rushed.",
    rating: 5,
    treatment: "Aesthetic Treatment",
    date: "2026-06",
  },
];