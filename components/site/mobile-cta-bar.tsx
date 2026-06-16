"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, Truck } from "lucide-react";
import { ContactSalesLink, TrackShipmentLink } from "./site-links";
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
      <div className="flex w-full max-w-md items-center gap-2">
        <TrackShipmentLink
          tabIndex={visible ? 0 : -1}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-brand-indigo/90 px-4 text-sm font-medium text-white shadow-2xl shadow-brand-indigo-deep/40 backdrop-blur-sm transition-all hover:bg-brand-indigo active:scale-[0.98]"
        >
          <Truck className="h-4 w-4 text-brand-red" aria-hidden="true" />
          {ui.track}
        </TrackShipmentLink>
        <ContactSalesLink
          tabIndex={visible ? 0 : -1}
          className="shine-hover inline-flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-2xl shadow-brand-red/30 ring-1 ring-white/10 transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {ui.contactSales}
        </ContactSalesLink>
      </div>
    </div>
  );
}
