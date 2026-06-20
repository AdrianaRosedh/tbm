"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, Truck } from "lucide-react";
import { TrackShipmentLink } from "./site-links";
import { ContactPopupLink } from "./contact-popup-link";
import { useContent } from "@/lib/i18n-client";

/**
 * Sticky mobile-only action bar. Appears once the user scrolls past the hero
 * and hides as the footer comes into view. Respects safe-area-inset.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const { ui } = useContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > 600 && y < max - 280);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The contact page already surfaces these actions prominently.
  if (pathname?.startsWith("/contact")) return null;

  return (
    <div
      aria-hidden={!visible}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(1rem)",
        transition: "opacity 300ms ease, transform 300ms ease",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] lg:hidden"
    >
      {/* Frosted-glass action dock — a single floating bar (iOS-style) holding
          a subtle Track segment + the prominent Contact Sales primary. */}
      <div className="flex w-full max-w-md items-stretch gap-1.5 rounded-[1.4rem] border border-white/12 bg-brand-indigo-deep/80 p-1.5 shadow-[0_12px_44px_-12px_rgba(6,4,20,0.9)] backdrop-blur-xl">
        <TrackShipmentLink
          tabIndex={visible ? 0 : -1}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[1rem] bg-white/[0.06] text-sm font-medium text-white/90 transition-all hover:bg-white/[0.1] active:scale-[0.96]"
        >
          <Truck className="h-4 w-4 text-brand-red" aria-hidden="true" />
          {ui.track}
        </TrackShipmentLink>
        <ContactPopupLink
          tabIndex={visible ? 0 : -1}
          className="shine-hover inline-flex h-12 flex-[1.5] items-center justify-center gap-2 rounded-[1rem] bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-red/30 transition-all hover:bg-primary/90 active:scale-[0.96]"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {ui.contactSales}
        </ContactPopupLink>
      </div>
    </div>
  );
}
