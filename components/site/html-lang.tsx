"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n-client";

/** Keeps <html lang> in sync with the URL locale (en at `/`, es under `/es`). */
export function HtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
