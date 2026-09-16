export interface SkinTreatmentsData {
  eyebrow: string;
  heading: string;
  description: string;
  supportingNote: string;
  cta: { label: string; href: string };
  bannerImage: { label: string; alt: string };
  supportingImage: { label: string; alt: string };
}

export const skinTreatmentsData: SkinTreatmentsData = {
  eyebrow: "Skin Treatments",
  heading: "Care focused on texture, tone, and everyday skin health.",
  description:
    "Skin treatments at Sakha are selected after assessment, with attention to what your skin needs rather than a one-size approach. Sessions are planned around your schedule and goals.",
  supportingNote: "Specific treatments and technologies used will be listed once confirmed — [CLIENT INPUT REQUIRED].",
  cta: { label: "Book a Consultation", href: "/contact" },
  bannerImage: {
    label: "Skin treatment room — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Skin treatment room at Sakha",
  },
  supportingImage: {
    label: "Skin treatment detail — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Skin treatment products and tools at Sakha",
  },
};