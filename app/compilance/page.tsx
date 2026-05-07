import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CertGrid } from "@/components/site/cert-grid";
import { Reveal } from "@/components/site/reveal";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { SITE } from "@/lib/content/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance & Security",
  description:
    "TBM Carriers is C-TPAT, FAST, OEA, and SmartWay certified. How our supply-chain security program protects every load.",
};

const PRACTICES = [
  "Coordinated supply-chain security with U.S. Customs and Border Protection (CBP) and partner agencies on both sides of the border.",
  "Operating procedures that meet or exceed C-TPAT/OEA business and security standards across every facility and lane.",
  "Active participation in international initiatives that prevent terrorism and protect cross-border trade.",
  "Documented security training for employees, contractors, drivers, and partner service providers.",
  "Controlled, monitored facilities for everyone who works with us — staff, customers, vendors, and visitors.",
  "Defined incident response: investigate quickly, escalate to the right agencies, and update procedures based on findings.",
];

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
        <div className="relative mx-auto flex min-h-[55dvh] w-full max-w-screen-2xl flex-col justify-center px-4 py-20 text-white md:py-24 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Compliance & Security
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

      {/* C-TPAT / OEA EXPLAINER + SIDE PANEL */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-4 lg:grid-cols-[1fr_360px] md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              C-TPAT / OEA Certification
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
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
                are certified members of the Customs–Trade Partnership Against
                Terrorism (C-TPAT) and the Operador Económico Autorizado (OEA).
                Both programs strengthen supply-chain security through
                collaboration between private industry and customs authorities.
              </p>
              <p>
                As a trusted C-TPAT/OEA member, TBM Carriers meets the rigorous
                security standards required to protect the integrity,
                reliability, and safety of cross-border trade across North
                America.
              </p>
              <p className="font-medium text-foreground">
                Our day-to-day security practices, consistent with C-TPAT/OEA
                criteria:
              </p>
            </div>
            <ul className="mt-6 space-y-4">
              {PRACTICES.map((practice) => (
                <li
                  key={practice}
                  className="flex items-start gap-3 text-base leading-relaxed text-fg-muted md:text-lg"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                  />
                  <span>{practice}</span>
                </li>
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
                      (210) 732-3400
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
                    href={`mailto:${SITE.safetyEmail}`}
                    className="font-medium text-brand-red underline-offset-4 hover:underline"
                  >
                    {SITE.safetyEmail}
                  </a>
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* DETAILED CERT LIST (with descriptions per cert) */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Building Experience
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Partnerships and certifications
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal as="li" key={cert.slug} delay={i * 0.05}>
                <div className="flex h-full gap-6 rounded-2xl border border-black/5 bg-white p-6 transition-all hover:border-brand-red/40 hover:shadow-md">
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
                    <h3 className="mt-1 font-display text-base font-bold uppercase tracking-wider">
                      {cert.full}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {cert.description}
                    </p>
                  </div>
                </div>
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
      <section className="bg-white py-14 md:py-20 lg:py-24">
        <Reveal className="mx-auto flex max-w-screen-2xl flex-col items-center gap-6 px-4 text-center md:px-8">
          <h2 className="font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
            Ship with a certified, accountable carrier.
          </h2>
          <Link
            href="/get-a-quote"
            className={cn(
              buttonVariants(),
              "h-12 rounded-full px-8 text-base transition-all hover:bg-primary/85 active:scale-[0.98]"
            )}
          >
            Free Quote
          </Link>
        </Reveal>
      </section>
    </>
  );
}
