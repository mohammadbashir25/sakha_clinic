export interface BlogCTAData {
  heading: string;
  cta: { label: string; href: string };
}

export const blogCTAData: BlogCTAData = {
  heading: "Have questions about your options?",
  cta: { label: "Book a Consultation", href: "/contact" },
};