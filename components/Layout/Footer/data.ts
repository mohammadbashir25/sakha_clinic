export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  phone?: string;
  whatsapp?: string;
  location?: string;
  socialLinks?: {
    label: string;
    href: string;
  }[];
}

export interface FooterData {
  brand: {
    name: string;
    description: string;
    logo?: string;
    logoAlt?: string;
  };
  navigation: FooterLinkGroup;
  services: FooterLinkGroup;
  contact: FooterContact;
  copyright: string;
  legalLinks?: FooterLink[];
}

/**
 * All footer copy and contact details live here. Replace any
 * "[CLIENT INPUT REQUIRED]" value with the real data before launch.
 * Never invent a phone number, WhatsApp link, or social URL.
 *
 * Contact fields left as "[CLIENT INPUT REQUIRED]" (or omitted) are
 * automatically hidden by FooterLinks — leaving placeholders in place
 * during development is safe.
 */
export const footerData: FooterData = {
  brand: {
    name: "SAKHA",
    description:
      "Hair Transplant, Dermatology & Beauty Center. Personalized hair, skin, and aesthetic care in Mazar-e-Sharif.",
    // logo: "/images/sakha-logo.svg",
    // logoAlt: "Sakha logo",
  },
  navigation: {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Gallery", href: "/gallery" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { label: "Hair Transplant", href: "/services/hair-transplant" },
      { label: "Dermatology", href: "/services/dermatology" },
      { label: "Skin Treatments", href: "/services/skin-treatments" },
      { label: "Aesthetic Treatments", href: "/services/aesthetic-treatments" },
    ],
  },
  contact: {
    phone: "[CLIENT INPUT REQUIRED]",
    whatsapp: "[CLIENT INPUT REQUIRED]",
    location: "Mazar-e-Sharif, Afghanistan",
    socialLinks: [
      // { label: "Instagram", href: "[CLIENT INPUT REQUIRED]" },
      // { label: "Facebook", href: "[CLIENT INPUT REQUIRED]" },
    ],
  },
  copyright: "© 2026 Sakha. All rights reserved.",
  // legalLinks: [
  //   { label: "Privacy Policy", href: "/privacy" },
  //   { label: "Terms of Service", href: "/terms" },
  // ],
};
