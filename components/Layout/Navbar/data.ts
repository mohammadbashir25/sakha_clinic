export interface NavItem {
  label: string;
  href: string;
}

export interface NavCta {
  label: string;
  href: string;
}

export interface NavBrand {
  name: string;
  href: string;
  /** Set once a real logo asset exists; falls back to a text mark until then. */
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  alt: string;
}

export const brand: NavBrand = {
  name: "SAKHA",
  href: "/",
  alt: "Sakha Hair Transplant, Dermatology & Beauty Center",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavCta = {
  label: "Book a Consultation",
  href: "/book-a-consultation",
};
