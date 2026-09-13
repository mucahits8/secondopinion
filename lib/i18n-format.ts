export function formatDisplayDate(date: Date | string, locale: string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(value);
}

export function formatDisplayNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

export function localizePath(path: string, locale: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutLocale = normalized.replace(/^\/(tr|en|es)(?=\/|$)/, "") || "/";
  return `/${locale}${withoutLocale === "/" ? "" : withoutLocale}`;
}
