"use client";

import Link from "next/link";
import { useId } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n-client";
import { LOCALES, localizePath, stripLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * EN / ES segmented switcher. The active state is a single gradient pill that
 * physically slides between the two options via motion's shared-layout
 * animation — because the toggle lives in the persistent root layout, the
 * pill glides across when the locale actually changes. Unique layoutId per
 * instance so the desktop and mobile toggles don't fight over the same pill.
 */
export function LangToggle({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const reduce = useReducedMotion();
  const pillId = useId();
  const base = stripLocale(pathname);
  const hrefFor = (l: Locale) => (l === "es" ? localizePath(base, "es") : base);

  return (
    <motion.div
      role="group"
      aria-label="Language"
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] p-0.5 backdrop-blur-sm",
        className
      )}
    >
      {LOCALES.map((l) => {
        const active = locale === l;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            aria-label={l === "es" ? "Español" : "English"}
            className="relative inline-flex h-6 items-center justify-center rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60"
          >
            {active && (
              <motion.span
                aria-hidden="true"
                layoutId={`lang-pill-${pillId}`}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
                className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-red to-[#ff6a4d] shadow-[0_2px_14px_-3px_rgba(228,67,46,0.85)]"
              />
            )}
            <span
              className={cn(
                "relative transition-colors duration-200",
                active ? "text-white" : "text-white/45 hover:text-white/90"
              )}
            >
              {l}
            </span>
          </Link>
        );
      })}
    </motion.div>
  );
}
