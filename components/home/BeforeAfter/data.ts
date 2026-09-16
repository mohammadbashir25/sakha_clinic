export interface BeforeAfterImage {
  /** Left unset until a real, authorized patient photo is supplied — BeforeAfterComparison falls back to ImagePlaceholder. Never fabricate a src here. */
  src?: string;
  alt: string;
}

export interface BeforeAfterCase {
  id: string;
  treatment: string;
  description?: string;
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  date?: string;
  note?: string;
}

export interface BeforeAfterCta {
  label: string;
  href: string;
}

export interface BeforeAfterData {
  eyebrow: string;
  heading: string;
  description: string;
  cases: BeforeAfterCase[];
  disclaimer: string;
  cta?: BeforeAfterCta;
}

export const beforeAfterData: BeforeAfterData = {
  eyebrow: "Real Results",
  heading: "A closer look at real patient journeys.",
  description:
    "Explore selected before-and-after results from patients who have given permission for their images to be shared. Every treatment plan is individual, and results can vary from person to person.",
  cases: [
    {
      id: "hair-transplant-case-1",
      treatment: "Hair Transplant",
      description:
        "A personalized hair restoration procedure focused on improving hairline density and creating a natural-looking result.",
      date: "March 2026",
      before: {
        alt: "Authorized patient before hair transplant",
      },
      after: {
        alt: "Authorized patient after hair transplant",
      },
    },
  ],
  disclaimer:
    "Results vary between individuals. Images are shared with appropriate patient authorization.",
  cta: {
    label: "Book a Consultation",
    href: "/book-a-consultation",
  },
};
