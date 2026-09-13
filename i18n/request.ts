import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const namespaces = [
  "common",
  "navigation",
  "home",
  "blog",
  "doctors",
  "specialties",
  "auth",
  "patient",
  "cases",
  "upload",
  "report",
  "validation",
  "errors",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const messages = (await import(`../messages/${locale}/${namespace}.json`)).default;
      return [namespace, messages] as const;
    }),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
  };
});
