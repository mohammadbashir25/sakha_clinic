export interface TrustPoint {
  title: string;
  description: string;
  icon?: string;
}

export interface WhyChooseSakhaData {
  eyebrow: string;
  heading: string;
  description: string;
  trustPoints: TrustPoint[];
  image?: {
    src: string;
    alt: string;
  };
  cta?: {
    label: string;
    href: string;
  };
  /** Small cursive accent line near the bottom-right corner. */
  tagline?: string;
  /**
   * Short slash-separated labels in the bottom-left corner.
   * NOTE: as written these read as outcome/expertise claims
   * ("Natural Results", "Expert Care", "Lasting Confidence").
   * Confirm exact wording with the client / marketing-compliance
   * before shipping — do not present guaranteed-outcome language
   * without sign-off.
   */
  footerTags?: string[];
}

/**
 * All copy on this section is editable here.
 *
 * The trust point copy below matches the approved design reference
 * supplied by the client. If that copy was placeholder text in the
 * mockup rather than confirmed content, swap it back to
 * "[CLIENT INPUT REQUIRED]" until confirmed — do not treat mockup
 * copy as automatically final.
 */
export const whyChooseSakhaData: WhyChooseSakhaData = {
  eyebrow: "Why Sakha",
  heading: "Your goals deserve thoughtful care.",
  description:
    "Choosing a clinic is personal. Sakha's approach should make you feel informed, respected, and comfortable discussing the result you want to achieve.",
  trustPoints: [
    {
      title: "Personalized Care",
      description:
        "Care and treatment options are discussed around your individual goals and needs.",
      icon: "personalized-care",
    },
    {
      title: "Professional Environment",
      description:
        "A comfortable and welcoming environment where you can discuss your concerns openly and confidently.",
      icon: "professional-environment",
    },
    {
      title: "Modern Approach",
      description:
        "A thoughtful approach to hair, skin, and aesthetic care with attention to your individual needs.",
      icon: "modern-approach",
    },
    {
      title: "Patient-Focused Service",
      description:
        "Your comfort, questions, and expectations remain an important part of every step of your care.",
      icon: "patient-focused",
    },
    {
      title: "Clear Communication",
      description:
        "Straightforward conversations about your concerns, available options, and what you can expect from your care.",
      icon: "clear-communication",
    },
  ],
  image: {
    src: "/images/home/why-choose-sakha.jpg",
    alt: "[CLIENT INPUT REQUIRED — describe the real Sakha interior or consultation room shown in this photograph]",
  },
  cta: {
    label: "Book a Consultation",
    href: "/contact",
  },
  tagline: "Your journey. Our priority.",
  footerTags: ["Natural Results", "Expert Care", "Lasting Confidence"],
};