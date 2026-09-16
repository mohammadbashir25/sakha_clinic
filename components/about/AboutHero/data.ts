export interface AboutHeroData {
  eyebrow: string;
  heading: string;
  description: string;
  image: { label: string; alt: string };
}

export const aboutHeroData: AboutHeroData = {
  eyebrow: "About Sakha",
  heading: "A more personal approach to care.",
  description:
    "Sakha brings together hair restoration, dermatology, skin, and aesthetic care in a setting designed around thoughtful consultation and individual needs.",
  image: {
    label: "Sakha clinic — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Entrance and interior of Sakha Hair Transplant, Dermatology & Beauty Center in Mazar-e-Sharif",
  },
};