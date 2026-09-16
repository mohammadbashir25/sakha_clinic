export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroImage {
  /** Leave unset until real clinic photography is supplied — HeroVisual falls back to ImagePlaceholder. */
  src?: string;
  alt: string;
  caption?: string;
}

export interface HeroData {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  image: HeroImage;
}

export const heroData: HeroData = {
  eyebrow: "Hair Transplant • Dermatology • Beauty",
  heading: "Restore Confidence. Naturally.",
  description:
    "Personalized hair, skin, and aesthetic care designed around your goals, with a focus on natural-looking results and a comfortable patient experience.",
  primaryCta: {
    label: "Book a Consultation",
    href: "/book-a-consultation",
  },
  secondaryCta: {
    label: "Explore Services",
    href: "/services",
  },
  image: {
    alt: "A consultation room at the Sakha clinic in Mazar-e-Sharif",
  },
};
