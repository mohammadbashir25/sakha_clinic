export interface AestheticTreatmentItem {
  title: string;
  description: string;
}

export interface AestheticTreatmentsData {
  eyebrow: string;
  heading: string;
  description: string;
  items: AestheticTreatmentItem[];
  note: string;
  cta: { label: string; href: string };
  image: { label: string; alt: string };
}

export const aestheticTreatmentsData: AestheticTreatmentsData = {
  eyebrow: "Aesthetic Treatments",
  heading: "A considered approach to aesthetic care.",
  description:
    "Aesthetic treatments at Sakha are discussed in detail during consultation, so you understand the approach and what to expect before deciding whether to proceed.",
  items: [
    {
      title: "Consultation-first",
      description: "Every treatment plan starts with a conversation about your goals.",
    },
    {
      title: "Personalized",
      description: "Recommendations are based on your individual assessment, not a fixed menu.",
    },
    {
      title: "Transparent",
      description: "What each treatment involves is explained clearly before you decide.",
    },
  ],
  note: "Specific aesthetic treatments will be listed once confirmed by the clinic — [CLIENT INPUT REQUIRED].",
  cta: { label: "Book a Consultation", href: "/contact" },
  image: {
    label: "Aesthetic treatment consultation — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Aesthetic treatment consultation at Sakha",
  },
};