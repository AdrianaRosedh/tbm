"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { OPEN_CONTACT_EVENT } from "./contact-overlay";
import { NAV_ITEMS } from "@/lib/content/site";
import { cn } from "@/lib/utils";

/**
 * One-page navigation with scroll-spy: on the homepage, the item whose
 * section is in view carries the gradient underline. "Contact Us" opens
 * the full-screen overlay. On detail pages, items deep-link back to the
 * homepage sections.
 */
export function NavLinks() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("top");

  // Scroll-spy over the homepage sections.
  useEffect(() => {
    if (!onHome) return;
    const ids = NAV_ITEMS.map((i) => i.section).filter(
      (s): s is string => !!s && s !== "top"
    );
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0) {
          if (window.scrollY < 400) setActiveSection("top");
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
            ? item.section === activeSection
            : false; // detail pages: items deep-link home, none is "current"

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
          return (
            <button
              key={item.href}
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT))
              }
              className={cn(
                baseClass,
                isActive ? "text-white" : "text-white/85 hover:text-white"
              )}
            >
              {item.label}
              {underline}
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
              {item.label}
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
            {item.label}
            {underline}
          </Link>
        );
      })}
    </nav>
  );
}
