/**
 * Structure for the Signature Services section.
 *
 * Holds translation KEYS and locale-agnostic PATHS only — never visible text.
 * All copy lives in messages/*.json under the "SignatureServices" namespace.
 * Order here is the display order (the first entry is the featured service).
 *
 * SLUGS: this is the single place where service routes are defined. Set
 * `slug` to the existing slug of the page each service should open
 * (e.g. slug: "hair-transplant" -> "/services/hair-transplant"). While a
 * slug is unset, the item links to the real services index ("/services"), so
 * no link can point to a route that does not exist.
 */

/** Keys under "SignatureServices.services". */
export type ServiceKey =
  | "hairTransplant"
  | "hairLoss"
  | "aesthetics"
  | "skin"
  | "laser"
  | "facialFillers";

export interface ServiceConfig {
  key: ServiceKey;
  /** Existing slug under /services/[slug]. Leave unset to link to /services. */
  slug?: string;
}

export const servicesIndexPath = "/services";

/** Existing appointment destination used across the site. */
export const appointmentPath = "/contact";

export const services: ServiceConfig[] = [
  { key: "hairTransplant" },
  { key: "hairLoss" },
  { key: "aesthetics" },
  { key: "skin" },
  { key: "laser" },
  { key: "facialFillers" },
];

/** Locale-agnostic href for a service; the i18n `Link` adds the locale prefix. */
export function getServiceHref(service: ServiceConfig): string {
  return service.slug
    ? `${servicesIndexPath}/${service.slug}`
    : servicesIndexPath;
}
