export interface ServicesHeroData {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: {
    label: string;
    alt: string;
  };
}

export const servicesHeroData: ServicesHeroData = {
  eyebrow: "Our Services",
  heading: "Thoughtful care for hair, skin, and confidence.",
  description:
    "Explore Sakha's approach to hair restoration, dermatology, skin care, and aesthetic treatments, with every consultation centered around your individual goals.",
  primaryCta: { label: "Book a Consultation", href: "/contact" },
  secondaryCta: { label: "View Categories", href: "#categories" },
  image: {
    label: "Sakha clinic interior — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Consultation room at Sakha Hair Transplant, Dermatology & Beauty Center in Mazar-e-Sharif",
  },
};