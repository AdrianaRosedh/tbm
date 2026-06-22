import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { TrackShipmentLink } from "./site-links";
import { ContactPopupLink } from "./contact-popup-link";
import { SERVICE_DETAILS, SERVICE_DETAILS_ES } from "@/lib/content/services";
import { getContent, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";

/**
 * Shared, locale-parameterized service landing page. Rendered by both the EN
 * (/services/[slug]) and ES (/es/services/[slug]) routes. Pulls localized
 * copy/labels from the dictionary and the grounded highlights from
 * SERVICE_DETAILS(_ES). The route guarantees the slug exists.
 */
export function ServicePageView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const c = getContent(locale);
  const { ui, nav } = c;
  const service = c.services.find((s) => s.slug === slug)!;
  const detail = (locale === "es" ? SERVICE_DETAILS_ES : SERVICE_DETAILS)[slug];
  const related = c.services.filter((s) => s.slug !== slug).slice(0, 3);

  const isEs = locale === "es";
  const homeHref = isEs ? "/es" : "/";
  const servicesHref = isEs ? "/es#services" : "/#services";
  const serviceHref = (s: string) => (isEs ? `/es/services/${s}` : `/services/${s}`);
  const abs = (path: string) => `${SITE.url}${path}`;
  const pageUrl = abs(`${isEs ? "/es" : ""}/services/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.full ?? service.short,
        serviceType: detail?.keyword ?? service.title,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Mexico" },
          { "@type": "Country", name: "Canada" },
        ],
        inLanguage: isEs ? "es-MX" : "en-US",
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: nav.home, item: abs(homeHref) },
          {
            "@type": "ListItem",
            position: 2,
            name: ui.ourServices,
            item: abs(servicesHref),
          },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
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
            <Link href={servicesHref} className="transition-colors hover:text-white">
              {ui.ourServices}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-brand-red">{service.title}</span>
          </nav>

          <div className="mt-8 flex items-start gap-5">
            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg shadow-brand-red/20 ring-1 ring-brand-red/30 sm:flex">
              <Image
                src={service.image}
                alt=""
                width={131}
                height={131}
                className="h-12 w-12 object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                {detail?.keyword ?? ui.ourServices}
              </p>
              <h1 className="mt-3 font-heading text-display-sm font-black uppercase leading-[1.05] tracking-tight sm:text-display-md">
                {service.title}
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-subtle">
            {service.short}
          </p>
        </div>
      </section>

      {/* OVERVIEW + HIGHLIGHTS */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-4xl gap-12 px-4 md:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight">
              {ui.serviceOverview}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              {service.full ?? service.short}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactPopupLink className="shine-hover inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
                {ui.contactSales} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ContactPopupLink>
              <TrackShipmentLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 px-7 text-base font-medium transition-all hover:border-brand-red hover:text-brand-red active:scale-[0.98]">
                {ui.trackShipment}
              </TrackShipmentLink>
            </div>
          </div>

          {detail?.highlights && (
            <div className="rounded-2xl border border-black/5 bg-muted/30 p-7">
              <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand-red">
                {ui.serviceHighlights}
              </h2>
              <ul className="mt-5 space-y-4">
                {detail.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                  >
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
          <h2 className="font-heading text-xl font-extrabold tracking-tight">
            {ui.moreServices}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={serviceHref(r.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-lg"
                >
                  <Image
                    src={r.image}
                    alt=""
                    width={131}
                    height={131}
                    className="h-12 w-12 object-contain"
                  />
                  <h3 className="mt-4 font-display text-base font-extrabold tracking-tight">
                    {r.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-red">
                    {ui.learnMore}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href={servicesHref}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-fg-muted transition-colors hover:text-brand-red"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {ui.allServices}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
