import Link from "next/link";
import { ArrowLeft, MapPinned } from "lucide-react";

export const metadata = {
  title: "Page not found",
  // Don't index soft-404 content.
  robots: { index: false, follow: true },
};

/**
 * Branded 404 — rendered inside the root layout (header + footer wrap it),
 * so this is just the centerpiece. Returns a real 404 status (Next handles
 * that for not-found.tsx), keeping crawlers honest while keeping people on
 * the road with clear routes back.
 */
export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[72vh] flex-col items-center justify-center overflow-hidden bg-brand-indigo px-4 py-24 text-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo-deep via-brand-indigo to-brand-indigo-deep" />
        <div className="bg-grid absolute inset-0 opacity-[0.14]" />
        <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="animate-float-slow absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-[#3a2f6b]/45 blur-3xl" />
        <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <p className="relative font-heading text-[5.5rem] font-black leading-none text-brand-red sm:text-[8rem]">
        404
      </p>
      <h1 className="relative mt-3 font-heading text-display-sm font-extrabold uppercase tracking-tight">
        Off the route
      </h1>
      <p className="relative mt-4 max-w-md text-base leading-relaxed text-fg-subtle">
        This page took a wrong turn. Let&apos;s get you back on the road.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="shine-hover inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back home
        </Link>
        <Link
          href="/#network"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98]"
        >
          <MapPinned className="h-4 w-4 text-brand-red" aria-hidden="true" />
          Our network
        </Link>
      </div>
    </section>
  );
}
