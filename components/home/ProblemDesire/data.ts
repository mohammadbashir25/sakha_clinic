export type ConcernIcon = "hairLoss" | "skinConcerns" | "aestheticGoals";

export interface ConcernItem {
  icon: ConcernIcon;
  title: string;
  description: string;
}

export interface ProblemDesireCta {
  label: string;
  href: string;
}

export interface ProblemDesireImageBadge {
  title: string;
  description: string;
}

export interface ProblemDesireImage {
  /** Leave unset until real photography is supplied — ProblemDesireVisual falls back to ImagePlaceholder. */
  src?: string;
  alt: string;
  badge?: ProblemDesireImageBadge;
}

export interface ProblemDesireData {
  eyebrow: string;
  heading: string;
  description: string;
  concerns: ConcernItem[];
  transition: string;
  image: ProblemDesireImage;
  cta?: ProblemDesireCta;
}

export const problemDesireData: ProblemDesireData = {
  eyebrow: "Your Concerns Matter",
  heading: "Care that starts with understanding.",
  description:
    "Every patient is different. We take the time to understand your concerns, goals, and what feels right for you before recommending the right path forward.",
  concerns: [
    {
      icon: "hairLoss",
      title: "Hair Loss",
      description: "Personalized guidance for hair thinning and loss.",
    },
    {
      icon: "aestheticGoals",
      title: "Aesthetic Goals",
      description: "Subtle changes designed around your goals.",
    },
  ],
  transition: "Natural-looking care. Personal attention.",
  image: {
    alt: "A calm consultation between a Sakha patient and clinician",
    badge: {
      title: "Personalized Care",
      description: "Designed around you",
    },
  },
  cta: {
    label: "Explore Services",
    href: "/services",
  },
};