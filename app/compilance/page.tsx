import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { CertGrid } from "@/components/site/cert-grid";
import { CtaBand } from "@/components/site/cta-band";
import { ParallaxLayer } from "@/components/site/parallax";
import { Reveal } from "@/components/site/reveal";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { TextReveal } from "@/components/site/text-reveal";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { COMPLIANCE_PRACTICES } from "@/lib/content/compliance";
import { SITE } from "@/lib/content/site";
import { mailtoHref } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance & Security",
  description:
    "TBM Carriers is C-TPAT, FAST, OEA, and SmartWay certified. How our supply-chain security program protects every load.",
};



export default function CompliancePage() {
  return (
    <>
      {/* HERO */}
      <section className="grain relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <ParallaxLayer amount={48} scale={1.12}>
            <Image
              src="/brand/TBM-C-35.jpg"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-indigo-deep/70" />
          <div className="animate-aurora absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        </div>
        <div className="relative mx-auto flex min-h-[45dvh] w-full max-w-screen-2xl flex-col justify-center px-4 py-16 text-white md:min-h-[55dvh] md:py-24 md:px-8">
          <p className="animate-rise text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Compliance & Security
          </p>
          <TextReveal
            as="h1"
            text="Customs Trade Partnership Against Terrorism"
            className="mt-4 max-w-4xl font-display text-display-md font-black leading-[0.95] tracking-[-0.02em] sm:text-display-lg"
          />
          <p
            className="animate-rise mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            Member-certified, audit-ready, and trusted at every U.S./Mexico/Canada
            crossing.
          </p>
        </div>
      </section>

      {/* C-TPAT / OEA EXPLAINER + SIDE PANEL */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-4 lg:grid-cols-[1fr_360px] md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              C-TPAT / OEA Certification
            </p>
            <h2 className="mt-3 font-display text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              Two programs, one security playbook
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-fg-muted md:text-lg">
              <p>
                <strong className="font-semibold text-foreground">
                  TBM Carriers Inc.
                </strong>{" "}
                and{" "}
                <strong className="font-semibold text-foreground">
                  TBM Carriers de México, S.A. de C.V.
                </strong>{" "}
                are certified participants in the Customs–Trade Partnership
                Against Terrorism (C-TPAT) and Authorized Economic Operator
                (OEA) programs — designed to enhance supply chain security
                through collaboration between private industry and customs
                authorities.
              </p>
              <p>
                As a trusted C-TPAT/OEA member, TBM Carriers meets rigorous
                security standards to ensure the integrity, reliability, and
                safety of international trade operations across North America.
              </p>
              <p className="font-medium text-foreground">
                Implementing, following, and maintaining procedures and best
                practices consistent with C-TPAT/OEA security criteria:
              </p>
            </div>
            <ul className="mt-6 space-y-4">
              {COMPLIANCE_PRACTICES.map((practice, i) => (
                <Reveal
                  as="li"
                  key={practice}
                  delay={i * 0.06}
                  y={14}
                  className="flex items-start gap-3 text-base leading-relaxed text-fg-muted md:text-lg"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                  />
                  <span>{practice}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* Side panel: CTPAT logo + safety contact */}
          <Reveal delay={0.1} as="div" className="lg:sticky lg:top-28 lg:self-start">
            <aside className="rounded-2xl border border-black/5 bg-muted/40 p-8">
              <div className="flex h-24 items-center justify-center rounded-xl bg-white p-4">
                <Image
                  src="/brand/ctpat-logo.jpg"
                  alt="C-TPAT — Customs Trade Partnership Against Terrorism"
                  width={200}
                  height={120}
                  className="h-full w-auto object-contain"
                />
              </div>
              <p className="mt-6 text-sm italic leading-relaxed text-fg-muted">
                We review and update our risk assessments and security
                procedures on a regular cadence. For questions about our C-TPAT
                or OEA program, get in touch:
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-3 text-foreground">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                    aria-hidden="true"
                  />
                  <span>
                    <a
                      href="tel:+12107323400"
                      className="font-medium hover:text-brand-red"
                    >
                      +1 (210) 732-3400
                    </a>{" "}
                    <span className="text-fg-muted">ext. 5310</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                    aria-hidden="true"
                  />
                  <a
                    href={mailtoHref(
                      SITE.safetyEmail,
                      "Compliance / C-TPAT inquiry — TBM Carriers"
                    )}
                    className="font-medium text-brand-red underline-offset-4 hover:underline"
                  >
                    Email our safety team
                  </a>
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* DETAILED CERT LIST (with descriptions per cert) */}
      <section
        id="certifications"
        className="scroll-mt-28 bg-muted/30 py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Building Experience
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              Partnerships and certifications
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal as="li" key={cert.slug} delay={i * 0.05} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-lg hover:shadow-brand-indigo/10"
                  glow="color-mix(in oklab, var(--color-brand-red) 10%, transparent)"
                >
                  <div className="flex gap-6">
                    <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg bg-muted/60 p-3">
                      <Image
                        src={cert.logo}
                        alt={cert.full}
                        width={140}
                        height={64}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-red">
                        {cert.short}
                      </p>
                      <h3 className="mt-1 font-display text-base font-extrabold uppercase tracking-wider">
                        {cert.full}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* QUICK STRIP for visual continuity with home */}
      <section className="bg-white py-16">
        <Reveal className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <CertGrid variant="strip" className="opacity-90" />
        </Reveal>
      </section>

      {/* CTA */}
      <CtaBand
        eyebrow="Audit-ready, every load"
        title="Ship with a certified, accountable carrier."
        body="C-TPAT, FAST, OEA, and SmartWay certified — security isn't a checkbox, it's the operating model."
      />
    </>
  );
}
