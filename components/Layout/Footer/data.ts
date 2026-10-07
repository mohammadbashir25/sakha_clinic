export type FooterNavKey = "home" | "about" | "services" | "blog" | "contact";

export interface FooterNavItem {
  key: FooterNavKey;
  href: string;
}

/**
 * Non-translatable footer config. All visible copy lives in messages
 * under "Footer". Only real, approved destinations are listed here.
 */
export const footerNav: FooterNavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

/** Appointment destination. Change this one value if you use a different route. */
export const footerAppointmentHref = "/contact";

/** Contact page link for the "Get in Touch" action. */
export const footerContactHref = "/contact";
