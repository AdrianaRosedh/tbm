import { EN, type Dictionary } from "./content/en";
import { ES } from "./content/es";

export type { Dictionary };

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

const DICTIONARIES: Record<Locale, Dictionary> = {
  en: EN,
  es: ES,
};

/** Resolve a locale's full content dictionary (works server- and client-side). */
export function getContent(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** English lives at `/`, Spanish under `/es`. Derive the locale from a path. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** Prefix an in-site path for a locale: en -> `/x`, es -> `/es/x`. */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "es") return clean === "/" ? "/es" : `/es${clean}`;
  return clean;
}

/** Strip the `/es` prefix to get the equivalent English path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}
