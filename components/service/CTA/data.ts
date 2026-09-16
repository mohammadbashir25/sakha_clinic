export interface ServicesCTAData {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const servicesCTAData: ServicesCTAData = {
  heading: "Start with a consultation.",
  description:
    "Every treatment at Sakha begins with an individual assessment. Book a consultation to discuss your goals and what approach may be right for you.",
  primaryCta: { label: "Book a Consultation", href: "/contact" },
  secondaryCta: { label: "Contact the Clinic", href: "/contact#location" },
};