export interface AboutCTAData {
  heading: string;
  description: string;
  cta: { label: string; href: string };
}

export const aboutCTAData: AboutCTAData = {
  heading: "Book a Consultation",
  description:
    "The best way to understand what's right for you is a conversation. Book a consultation with Sakha to discuss your goals.",
  cta: { label: "Book a Consultation", href: "/contact" },
};