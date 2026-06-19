"use client";

import { useContent } from "@/lib/i18n-client";

/**
 * Keyboard / screen-reader skip link. Always in the DOM + tab order but parked
 * off-screen; the first Tab focuses it and it slides into view. Uses a single
 * `top` override (not the sr-only/not-sr-only dance, which only partially
 * reverses under a focus variant).
 */
export function SkipLink() {
  const { ui } = useContent();
  return (
    <a
      href="#main-content"
      className="fixed left-4 -top-24 z-[100] inline-flex items-center rounded-full bg-brand-red px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-[top] duration-200 focus:top-4 focus:outline-none focus:ring-2 focus:ring-white/60"
    >
      {ui.skipToContent}
    </a>
  );
}
