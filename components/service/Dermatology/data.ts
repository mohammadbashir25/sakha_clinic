export interface DermatologyData {
  eyebrow: string;
  heading: string;
  description: string;
  concerns: string[];
  note: string;
  cta: { label: string; href: string };
  image: { label: string; alt: string };
}

export const dermatologyData: DermatologyData = {
  eyebrow: "Dermatology",
  heading: "Skin and hair care grounded in clinical assessment.",
  description:
    "Sakha's dermatology care covers a range of common skin and hair concerns. Every visit starts with an assessment, so the plan reflects your skin rather than a standard protocol.",
  concerns: [
    "Acne & breakouts",
    "Scalp & hair health",
    "Pigmentation",
    "Sensitive skin",
    "Ongoing skin conditions",
  ],
  note: "Full list of dermatology treatments will be confirmed by the clinic — [CLIENT INPUT REQUIRED].",
  cta: { label: "Book a Consultation", href: "/contact" },
  image: {
    label: "Dermatology consultation — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Dermatology consultation room at Sakha",
  },
};