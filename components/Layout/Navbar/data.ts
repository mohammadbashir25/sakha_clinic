/**
 * Navigation structure for the Navbar.
 *
 * Holds translation KEYS and locale-agnostic PATHS only — never labels and
 * never a locale prefix. Labels are resolved at render time from
 * messages/*.json via `useTranslations("Navbar")`; the locale prefix is added
 * by the `Link` exported from "@/i18n/navigation". One shared config serves
 * all three locales (en, fa, ps).
 */

/** Keys under the "Navbar" namespace in messages/*.json */
export type NavigationKey = "home" | "about" | "services" | "blog" | "contact";

export interface NavItem {
  translationKey: NavigationKey;
  /** Locale-agnostic path, e.g. "/services". */
  path: string;
}

export interface NavCta {
  /** Key under the "Navbar" namespace in messages/*.json */
  translationKey: "bookAppointment";
  path: string;
}

export interface NavBrand {
  /** Locale-agnostic path of the homepage. */
  path: string;
}

export const brand: NavBrand = {
  path: "/",
};

export const navItems: NavItem[] = [
  { translationKey: "home", path: "/" },
  { translationKey: "about", path: "/about" },
  { translationKey: "services", path: "/services" },
  { translationKey: "blog", path: "/blog" },
  { translationKey: "contact", path: "/contact" },
];

export const primaryCta: NavCta = {
  translationKey: "bookAppointment",
  // Existing appointment destination from the previous Navbar.
  path: "/book-a-consultation",
};

/**
 * True when `pathname` (locale-less, as returned by `usePathname()` from
 * "@/i18n/navigation") belongs to the nav item at `path`.
 * "/" only matches exactly; other items also match nested routes
 * (e.g. /blog/some-post keeps "Blog" active).
 */
export function isActivePath(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}
