import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Mail } from "lucide-react";
import { TrackShipmentLink } from "./site-links";
import { ContactPopupLink } from "./contact-popup-link";
import { getContent, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";
import { mailtoHref } from "@/lib/utils";

/**
 * Shared, locale-parameterized Compliance & Security landing page (EN
 * /compliance, ES /es/compliance). Built from the existing certifications +
 * compliance copy in the dictionary — targets "C-TPAT / FAST / OEA certified
 * carrier" intent. The misspelled legacy /compilance route still redirects to
 * the homepage section.
 */
export function CompliancePageView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, nav } = c;
  const certs = c.certifications;
  const isEs = locale === "es";
  const homeHref = isEs ? "/es" : "/";
  const pageUrl = `${SITE.url}${isEs ? "/es" : ""}/compliance`;
  const keyword = isEs
    ? "Transportista certificado C-TPAT, FAST y OEA"
    : "C-TPAT, FAST & OEA certified carrier";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${nav.compliance} — ${SITE.name}`,
        description: ui.complianceIntro,
        url: pageUrl,
        inLanguage: isEs ? "es-MX" : "en-US",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: nav.home,
            item: `${SITE.url}${homeHref}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: nav.compliance,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="grain relative isolate overflow-hidden bg-brand-indigo pb-16 pt-28 text-white md:pb-24 md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo-deep via-brand-indigo to-brand-indigo-deep" />
          <div className="bg-grid absolute inset-0 opacity-[0.14]" />
          <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        </div>
        <div className="relative mx-auto w-full max-w-4xl px-4 md:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle"
          >
            <Link href={homeHref} className="transition-colors hover:text-white">
              {nav.home}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-brand-red">{nav.compliance}</span>
          </nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            {keyword}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-display-sm font-black uppercase leading-[1.05] tracking-tight sm:text-display-md">
            {nav.compliance}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-subtle">
            {ui.complianceIntro}
          </p>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight">
            {ui.certifications}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert) => (
              <li
                key={cert.slug}
                className="flex h-full flex-col rounded-2xl border border-black/5 bg-muted/20 p-6"
              >
                <div className="flex h-14 items-center">
                  <Image
                    src={cert.logo}
                    alt={`${cert.full} (${cert.short})`}
                    width={160}
                    height={56}
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <p className="mt-5 font-display text-base font-extrabold tracking-tight">
                  {cert.short}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-red">
                  {cert.full}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {cert.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECURITY PRACTICES */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-5xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight">
              {ui.complianceHeadline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              {c.complianceLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactPopupLink className="shine-hover inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
                {ui.contactSales} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ContactPopupLink>
              <a
                href={mailtoHref(SITE.safetyEmail)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 px-7 text-base font-medium transition-all hover:border-brand-red hover:text-brand-red active:scale-[0.98]"
              >
                <Mail className="h-4 w-4 text-brand-red" aria-hidden="true" />
                {ui.emailSafetyTeam}
              </a>
            </div>
          </div>
          <ul className="space-y-4">
            {c.compliancePractices.map((practice) => (
              <li
                key={practice}
                className="flex gap-3 rounded-xl border border-black/5 bg-white p-4 text-sm leading-relaxed text-fg-muted"
              >
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                  aria-hidden="true"
                />
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
