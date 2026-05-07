import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/reveal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Get a Quote" };

const REASSURANCE = [
  "Response within 24 hours",
  "Asset-based, not a broker",
  "C-TPAT, FAST, OEA, SmartWay certified",
  "Door-to-door — no border handoffs",
  "Dedicated CSR for every account",
];

export default function GetAQuotePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/brand/TBM-C-41.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-indigo-deep/70" />
        </div>
        <div className="relative mx-auto flex min-h-[40svh] w-full max-w-7xl flex-col justify-center px-4 py-20 text-white md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Request a Free Quote
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg">
            Streamline your shipping with industry experts
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
            Tell us about your lane and freight — our cross-border specialists
            respond within 24 hours.
          </p>
        </div>
      </section>

      {/* FORM + SIDE PANEL */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-4 lg:grid-cols-[1fr_360px] md:px-8">
          <Reveal>
            <QuoteForm />
          </Reveal>

          <Reveal delay={0.1} as="div" className="lg:sticky lg:top-28 lg:self-start">
            <aside className="rounded-2xl border border-black/5 bg-brand-indigo p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                Why TBM
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wider text-balance">
                A carrier you don&apos;t have to chase
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-fg-subtle">
                {REASSURANCE.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
