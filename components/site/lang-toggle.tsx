"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n-client";
import { localizePath, stripLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * EN / ES language switcher. Links to the same page in the other locale
 * (English at `/`, Spanish under `/es`). The active locale is highlighted.
 */
export function LangToggle({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const base = stripLocale(pathname);

  const item =
    "px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-1 backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label="Language"
    >
      <Link
        href={base}
        hrefLang="en"
        aria-current={locale === "en" ? "true" : undefined}
        className={cn(
          item,
          "rounded-full",
          locale === "en"
            ? "bg-brand-red text-white"
            : "text-white/60 hover:text-white"
        )}
      >
        EN
      </Link>
      <Link
        href={localizePath(base, "es")}
        hrefLang="es"
        aria-current={locale === "es" ? "true" : undefined}
        className={cn(
          item,
          "rounded-full",
          locale === "es"
            ? "bg-brand-red text-white"
            : "text-white/60 hover:text-white"
        )}
      >
        ES
      </Link>
    </div>
  );
}
