import { defineRouting } from "next-intl/routing";

export const locales = ["tr", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
});
