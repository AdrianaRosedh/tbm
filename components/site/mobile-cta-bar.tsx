"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Sticky mobile-only CTA bar. Hidden on /get-a-quote (already on the form),
 * appears once the user has scrolled past the hero. Respects safe-area-inset.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Visible after the hero, hidden as the footer comes into view.
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

  if (pathname?.startsWith("/get-a-quote")) return null;

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
      <Link
        href="/get-a-quote"
        tabIndex={visible ? 0 : -1}
        className="inline-flex h-12 w-full max-w-md items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-primary-foreground shadow-2xl shadow-brand-indigo-deep/40 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
      >
        Free Quote
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
