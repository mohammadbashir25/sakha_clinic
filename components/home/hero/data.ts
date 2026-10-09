/**
 * Non-text configuration for the Hero.
 *
 * All visible copy lives in messages/*.json under the "Hero" namespace and is
 * read with `useTranslations("Hero")`. Only locale-agnostic paths and the
 * portrait asset live here. Paths are prefixed with the locale by the `Link`
 * exported from "@/i18n/navigation".
 */

export interface HeroLink {
  /** Locale-agnostic path, e.g. "/services". */
  href: string;
}

export interface HeroImage {
  /**
   * Path to the portrait of Dr. Sakha (e.g. "/images/dr-sakha.jpg").
   * Leave unset until the real photograph is supplied — HeroVisual falls back
   * to ImagePlaceholder.
   */
  src?: string;
}

export interface HeroData {
  primaryCta: HeroLink;
  secondaryCta: HeroLink;
  image: HeroImage;
}

export const heroData: HeroData = {
  primaryCta: { href: "/contact" },
  secondaryCta: { href: "/services" },
  image: { src: "/images/sakh-img.png" },
};
