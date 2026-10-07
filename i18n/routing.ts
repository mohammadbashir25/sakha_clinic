import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa", "ps"],

  defaultLocale: "en",

  // Keep the locale in every public URL.
  localePrefix: "always",
});