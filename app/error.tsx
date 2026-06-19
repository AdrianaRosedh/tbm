"use client";

import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";

/**
 * Branded error boundary for route-segment errors — rendered inside the root
 * layout (header + footer stay), so people get a recoverable, on-brand screen
 * instead of a raw crash. `reset` retries the failed segment.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="grain relative isolate flex min-h-[72vh] flex-col items-center justify-center overflow-hidden bg-brand-indigo px-4 py-24 text-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo-deep via-brand-indigo to-brand-indigo-deep" />
        <div className="bg-grid absolute inset-0 opacity-[0.14]" />
        <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <h1 className="relative font-heading text-display-sm font-black uppercase tracking-tight text-brand-red sm:text-display-md">
        Something went wrong
      </h1>
      <p className="relative mt-4 max-w-md text-base leading-relaxed text-fg-subtle">
        A temporary hiccup on our end. Try again, or head back home.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="shine-hover inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 text-brand-red" aria-hidden="true" />
          Back home
        </Link>
      </div>
    </section>
  );
}
