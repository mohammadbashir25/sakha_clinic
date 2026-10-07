/**
 * Navbar-local locale helpers.
 *
 * Locale identity (codes, direction) comes from the project's existing
 * `i18n/config.ts`. Display names come from the "Navbar.languages.*"
 * translations, and URL building is handled by next-intl's navigation API
 * (`Link` with the `locale` prop), so no path helpers are needed here.
 */

import {
  locales as localeCodes,
  localeDirections,
  type Locale,
} from "@/i18n/config";

export type { Locale };

export interface LocaleOption {
  code: Locale;
  dir: "ltr" | "rtl";
}

export const locales: LocaleOption[] = localeCodes.map((code) => ({
  code,
  dir: localeDirections[code],
}));