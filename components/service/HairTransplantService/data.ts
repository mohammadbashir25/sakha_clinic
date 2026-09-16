export interface TreatmentPoint {
  label: string;
}

export interface HairTransplantData {
  eyebrow: string;
  heading: string;
  description: string;
  points: TreatmentPoint[];
  note: string;
  cta: { label: string; href: string };
  image: { label: string; alt: string };
}

export const hairTransplantData: HairTransplantData = {
  eyebrow: "Hair Transplant",
  heading: "Restoration built around how your hair actually grows.",
  description:
    "Every hair transplant plan at Sakha begins with an individual assessment — donor density, hairline shape, and the pattern of loss all inform the approach before any procedure is discussed.",
  points: [
    { label: "Individual assessment before any recommendation" },
    { label: "Technique selected for your specific case — [CLIENT INPUT REQUIRED]" },
    { label: "Planning focused on a natural-looking hairline" },
    { label: "Aftercare guidance included in every consultation" },
  ],
  note: "Specific transplant techniques and technologies will be listed once confirmed by the clinic.",
  cta: { label: "Book a Consultation", href: "/contact" },
  image: {
    label: "Hair transplant treatment room — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Hair transplant treatment room at Sakha",
  },
};