/**
 * Non-translatable config for the About page.
 * All visible copy lives in messages under "AboutPage".
 */

export const aboutLinks = {
  /** Appointment destination. Change this one value if you use another route. */
  primary: "/contact",
  secondary: "/services",
} as const;

export interface AboutImageConfig {
  /**
   * Path to the real Dr. Sakha portrait (e.g. "/images/dr-sakha.jpg").
   * Leave undefined until the real asset path is known — a placeholder
   * renders instead. Never invent a path.
   */
  src?: string;
  /** Intrinsic pixel size of the real image, used to keep its aspect ratio. */
  width: number;
  height: number;
  /** Dev-only label shown while no real image is set. */
  placeholderLabel: string;
}

export const aboutImages: { hero: AboutImageConfig } = {
  hero: {
    src: "/images/sakhaWork.jpeg",
    width: 1200,
    height: 1500,
    placeholderLabel:
      "Dr. Sakha portrait — [CLIENT INPUT REQUIRED: real photography]",
  },
};

export const experienceKeys = ["iran", "afghanistan"] as const;

export const principleKeys = [
  "assessment",
  "personalization",
  "natural",
  "followUp",
] as const;

export const practiceKeys = [
  "dermatology",
  "hairLoss",
  "transplant",
  "aesthetics",
  "regenerative",
  "laser",
  "acne",
  "skinQuality",
] as const;

export const journeyKeys = [
  "assessment",
  "selection",
  "treatment",
  "followUp",
] as const;