"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";
import { TrackShipmentLink } from "./site-links";
import { LangToggle } from "./lang-toggle";
import { useContent } from "@/lib/i18n-client";
import { cn } from "@/lib/utils";

/**
 * Floating glass capsule navbar. Sits in-flow (h-18/h-20) so heroes can
 * size against it; the visible pill tightens and glows once scrolled.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { ui } = useContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Fixed overlay: the capsule floats over the hero (no in-flow strip).
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 w-full items-center md:h-24">
      <div className="mx-auto w-full max-w-[88rem] px-3 sm:px-5">
        <div
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-6",
            scrolled
              ? "h-14 border-white/15 bg-brand-indigo/85 shadow-[0_14px_44px_-14px_rgba(0,0,0,0.75)] backdrop-blur-xl backdrop-saturate-150 md:h-[3.75rem]"
              : "h-16 border-white/10 bg-brand-indigo/70 shadow-[0_10px_36px_-16px_rgba(0,0,0,0.6)] backdrop-blur-lg md:h-[4.25rem]"
          )}
        >
          {/* Brand hairline that wakes up on scroll */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-red/70 to-transparent transition-opacity duration-700",
              scrolled ? "opacity-100" : "opacity-0"
            )}
          />

          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="TBM Carriers — home"
          >
            <Image
              src="/brand/TBM-2.png"
              alt="TBM Carriers"
              width={663}
              height={204}
              sizes="(max-width: 768px) 132px, 156px"
              className={cn(
                "w-auto transition-all duration-500",
                scrolled ? "h-8" : "h-9 md:h-10"
              )}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          <NavLinks />

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <LangToggle className="hidden md:flex" />
            <span
              aria-hidden="true"
              className="hidden h-5 w-px bg-white/15 md:block"
            />
            <TrackShipmentLink className="shine-hover group/cta hidden h-10 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.05] px-5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:border-brand-red hover:bg-brand-red md:inline-flex lg:px-6 lg:text-sm">
              <Truck
                className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              />
              {ui.trackShipment}
            </TrackShipmentLink>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
