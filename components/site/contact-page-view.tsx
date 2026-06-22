import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, Truck } from "lucide-react";
import { ContactSalesLink, TrackShipmentLink } from "./site-links";
import { getContent, type Locale } from "@/lib/i18n";
import { OFFICES, SITE } from "@/lib/content/site";
import { telHref } from "@/lib/utils";

/**
 * Shared Contact page (EN /contact, ES /es/contact). A crawlable, NAP-rich
 * contact page for direct/search visits (the slick overlay stays for in-flow
 * CTAs). Replaces the old redirect.
 */
export function ContactPageView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, nav } = c;
  const isEs = locale === "es";
  const homeHref = isEs ? "/es" : "/";
  const pageUrl = `${SITE.url}${isEs ? "/es" : ""}/contact`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: `${ui.contactTitle} — ${SITE.name}`,
        description: ui.contactSubtitle,
        url: pageUrl,
        inLanguage: isEs ? "es-MX" : "en-US",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: nav.home, item: `${SITE.url}${homeHref}` },
          { "@type": "ListItem", position: 2, name: nav.contact, item: pageUrl },
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
            <span className="text-brand-red">{nav.contact}</span>
          </nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            {ui.contactEyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-display-md font-black leading-[0.95] tracking-[-0.02em]">
            {ui.contactTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-subtle">
            {ui.contactSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ContactSalesLink className="shine-hover inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {ui.emailSales}
            </ContactSalesLink>
            <TrackShipmentLink className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98]">
              <Truck className="h-4 w-4 text-brand-red" aria-hidden="true" />
              {ui.trackShipment}
            </TrackShipmentLink>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 md:px-8 sm:grid-cols-2">
          {OFFICES.map((office, i) => (
            <div
              key={office.region}
              className="rounded-2xl border border-black/5 bg-muted/20 p-7"
            >
              <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand-red">
                <Image
                  src={i === 0 ? "/brand/eua-flag-tbm.jpg" : "/brand/mx-flag-tbm.jpg"}
                  alt=""
                  width={28}
                  height={16}
                  className="h-3.5 w-6 rounded-[2px] object-cover ring-1 ring-black/10"
                />
                {i === 0 ? ui.regionUS : ui.regionMX}
              </p>
              <p className="mt-3 font-display text-lg font-extrabold tracking-tight">
                {office.legalName}
              </p>
              <address className="mt-2 not-italic text-sm leading-relaxed text-fg-muted">
                {office.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <ul className="mt-4 space-y-2 text-sm">
                {office.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={telHref(p)}
                      className="inline-flex items-center gap-2 font-medium tabular-nums text-fg-muted transition-colors hover:text-brand-red"
                    >
                      <Phone className="h-3.5 w-3.5 text-brand-red" aria-hidden="true" />
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-5xl px-4 text-center text-xs uppercase tracking-[0.2em] text-fg-subtle md:px-8">
          {ui.replyWithin}
        </p>
      </section>
    </>
  );
}
