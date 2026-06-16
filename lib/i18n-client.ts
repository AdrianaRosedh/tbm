"use client";

import { usePathname } from "next/navigation";
import { getContent, localeFromPathname, type Dictionary, type Locale } from "./i18n";

/** Client hook: current locale from the URL (en at `/`, es under `/es`). */
export function useLocale(): Locale {
  return localeFromPathname(usePathname());
}

/** Client hook: current locale's content dictionary. */
export function useContent(): Dictionary {
  return getContent(useLocale());
}
