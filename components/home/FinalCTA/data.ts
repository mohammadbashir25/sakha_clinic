export interface CtaAction {
  label: string;
  href: string;
  type: "primary" | "secondary" | "phone" | "whatsapp";
}

export interface FinalCtaData {
  eyebrow: string;
  heading: string;
  description: string;
  actions: CtaAction[];
  reassurance?: string;
}

/**
 * All copy, links, and contact details for the Final CTA live here.
 * Replace any "[CLIENT INPUT REQUIRED]" value with the real number/link
 * before launch. Never invent a phone number or WhatsApp link.
 *
 * FinalCtaActions will automatically hide any action whose href still
 * contains "[CLIENT INPUT REQUIRED]", so it is safe to leave placeholders
 * in place during development.
 */
export const finalCtaData: FinalCtaData = {
  eyebrow: "Your Next Step",
  heading: "Let's talk about what you're looking for.",
  description:
    "A consultation is the first step toward understanding your options. Share your goals with the Sakha team and discuss the care that may be right for you.",
  actions: [
    {
      label: "Book a Consultation",
      href: "/consultation",
      type: "primary",
    },
    {
      label: "Call Us — [CLIENT INPUT REQUIRED]",
      href: "tel:[CLIENT INPUT REQUIRED]",
      type: "phone",
    },
    {
      label: "WhatsApp — [CLIENT INPUT REQUIRED]",
      href: "https://wa.me/[CLIENT INPUT REQUIRED]",
      type: "whatsapp",
    },
  ],
  reassurance:
    "Ask questions, understand your options, and make an informed decision at your own pace.",
};
