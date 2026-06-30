"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { OPEN_CONTACT_EVENT } from "./contact-overlay";
import { NAV_ITEMS } from "@/lib/content/site";
import { useContent } from "@/lib/i18n-client";
import { cn } from "@/lib/utils";

/**
 * One-page navigation with scroll-spy: on the homepage, the item whose
 * section is in view carries the gradient underline. "Contact Us" opens
 * the full-screen overlay. On detail pages, items deep-link back to the
 * homepage sections.
 */
/** Homepage sections the spy watches; `services` rolls up into the
 *  "Network & Services" tab (section: "network"). */
const SPY_IDS = ["know-us", "network", "services", "compliance"] as const;
const SECTION_TO_TAB: Record<string, string> = {
  "know-us": "know-us",
  network: "network",
  services: "network",
  compliance: "compliance",
  top: "top",
};

export function NavLinks() {
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "/es";
  const { nav } = useContent();
  const [activeSection, setActiveSection] = useState<string>("top");

  // Scroll-spy over the homepage sections.
  useEffect(() => {
    if (!onHome) return;
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        // Always treat the hero as active when near the top of the page,
        // regardless of what the IO detects below the fold.
        if (window.scrollY < window.innerHeight * 0.6) {
          setActiveSection("top");
          return;
        }
        if (visible.size === 0) {
          return;
        }
        let best = "";
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActiveSection(best);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.4] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <nav
      aria-label="Main"
      className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.overlay
          ? !onHome && pathname.startsWith("/contact")
          : onHome
            ? item.section === (SECTION_TO_TAB[activeSection] ?? activeSection)
            : false; // detail pages: items deep-link home, none is "current"

        const label = nav[item.labelKey];

        const baseClass =
          "group/nav relative py-1.5 text-sm font-medium uppercase tracking-wider transition-colors duration-200 cursor-pointer";

        const underline = (
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-brand-red to-[#ff8a6e] transition-transform duration-300 ease-out",
              isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
            )}
          />
        );

        if (item.overlay) {
          // The overlay trigger is an action, not navigation — style it as
          // the capsule's primary pill.
          return (
            <button
              key={item.href}
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT))
              }
              className="shine-hover inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow-md shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.97] lg:h-10 lg:px-5 lg:text-sm"
            >
              {label}
            </button>
          );
        }

        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(baseClass, "text-white/85 hover:text-white")}
            >
              {label}
              {underline}
            </a>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={(e) => {
              // Smooth in-page scrolling when already on the homepage.
              if (!onHome) return;
              const behavior = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? ("auto" as const)
                : ("smooth" as const);
              if (item.href === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior });
              } else if (item.section) {
                const el = document.getElementById(item.section);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior, block: "start" });
                }
              }
            }}
            className={cn(
              baseClass,
              isActive ? "text-white" : "text-white/85 hover:text-white"
            )}
          >
            {label}
            {underline}
          </Link>
        );
      })}
    </nav>
  );
}
