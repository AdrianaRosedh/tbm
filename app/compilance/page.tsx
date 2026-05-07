import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CertGrid } from "@/components/site/cert-grid";
import { Reveal } from "@/components/site/reveal";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Compliance" };

const ctpat = CERTIFICATIONS.find((c) => c.slug === "ctpat")!;

export default function CompliancePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/brand/TBM-C-35.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-indigo-deep/70" />
        </div>
        <div className="relative mx-auto flex min-h-[55svh] w-full max-w-7xl flex-col justify-center px-4 py-24 text-white md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Compliance
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-display-md font-bold leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg">
            Customs Trade Partnership Against Terrorism
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
            Member-certified, audit-ready, and trusted at every U.S./Mexico/Canada
            crossing.
          </p>
        </div>
      </section>

      {/* C-TPAT BAND */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-4 lg:grid-cols-[auto_1fr] md:px-8">
          <Reveal className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
            <ShieldCheck className="h-10 w-10" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Building Experience
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {ctpat.full}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
              {ctpat.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-fg-muted md:text-lg">
              C-TPAT membership is voluntary, demanding, and rare. We&apos;ve
              held it because our security playbook — facility access controls,
              driver vetting, container integrity, and IT segmentation — is
              enforced, not aspirational.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CERT GRID */}
      <section className="bg-muted/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Partnerships & Certifications
            </p>
            <h2 className="mt-3 text-center font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              The full list, on the record
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <CertGrid />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-24">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center md:px-8">
          <h2 className="font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
            Ship with a certified, accountable carrier.
          </h2>
          <Link
            href="/get-a-quote"
            className={cn(
              buttonVariants(),
              "h-12 rounded-full px-8 text-base hover:bg-primary/85"
            )}
          >
            Get a Quote
          </Link>
        </Reveal>
      </section>
    </>
  );
}
