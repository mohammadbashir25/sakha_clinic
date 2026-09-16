export interface ContactHeroData {
  eyebrow: string;
  heading: string;
  description: string;
  image: { label: string; alt: string };
}

export const contactHeroData: ContactHeroData = {
  eyebrow: "Contact Sakha",
  heading: "Let's start with a conversation.",
  description:
    "Have questions about hair restoration, dermatology, skin care, or aesthetic treatments? Contact Sakha to discuss your goals and arrange a consultation.",
  image: {
    label: "Sakha clinic — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Sakha Hair Transplant, Dermatology & Beauty Center clinic",
  },
};