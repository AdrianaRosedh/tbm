import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSalesLink, TrackShipmentLink } from "./site-links";
import { getContent, type Locale } from "@/lib/i18n";
import { SITE, FACILITIES } from "@/lib/content/site";

function LocationCard({
  label,
  city,
  address,
}: {
  label: string;
  city: string;
  address?: string;
}) {
  return (
    <li className="rounded-2xl border border-black/5 bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-red">
        {label}
      </p>
      <p className="mt-1.5 font-display text-base font-extrabold uppercase tracking-wide">
        {city}
      </p>
      {address && <p className="mt-1 text-sm leading-relaxed text-fg-muted">{address}</p>}
    </li>
  );
}

function ChipGroup({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand-red">
        {title}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((c) => (
          <li
            key={c}
            className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-fg-muted"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Shared Network & Coverage page (EN /network, ES /es/network). Renders the
 * full facility footprint as crawlable text — the interactive homepage map is
 * SVG/JS, so this is what search engines can actually read for location terms.
 * Reuses the network hero copy + map labels from the dictionary (no new copy).
 */
export function NetworkPageView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, nav, map } = c;
  const net = c.home.network;
  const us = FACILITIES.us;
  const mx = FACILITIES.mx;
  const isEs = locale === "es";
  const homeHref = isEs ? "/es" : "/";
  const pageUrl = `${SITE.url}${isEs ? "/es" : ""}/network`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${nav.networkServices} — ${SITE.name}`,
        description: net.body,
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
            name: nav.networkServices,
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
        <div className="relative mx-auto w-full max-w-5xl px-4 md:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle"
          >
            <Link href={homeHref} className="transition-colors hover:text-white">
              {nav.home}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-brand-red">{nav.networkServices}</span>
          </nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            {net.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-display-sm font-black uppercase leading-[1.05] tracking-tight sm:text-display-md">
            {net.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-subtle">
            {net.body}
          </p>
        </div>
      </section>

      {/* UNITED STATES */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-10 px-4 md:px-8">
          <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wider">
            {ui.regionUS}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LocationCard
              label={map.roles.hq}
              city={us.headquarters.address[0]}
              address={us.headquarters.address[1]}
            />
            {us.terminals.map((t) => (
              <LocationCard
                key={t.city}
                label={map.roles.terminal}
                city={t.city}
                address={t.address}
              />
            ))}
          </ul>
          <ChipGroup title={map.groups.dropyard} items={us.dropYards} />
          <ChipGroup title={map.groups.crossing} items={us.borderCrossings} />
        </div>
      </section>

      {/* MEXICO */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-10 px-4 md:px-8">
          <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wider">
            {ui.regionMX}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mx.facilities.map((f) => (
              <LocationCard
                key={f.city}
                label={map.roles.terminal}
                city={f.city}
                address={f.address}
              />
            ))}
            {mx.offices.map((o) => (
              <LocationCard
                key={o.city}
                label={map.roles.office}
                city={o.city}
                address={o.address}
              />
            ))}
          </ul>
          <ChipGroup title={map.groups.crossing} items={mx.terminals} />
          <ChipGroup title={map.roles.maintenance} items={mx.maintenance} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-20">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap gap-3 px-4 md:px-8">
          <ContactSalesLink className="shine-hover inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
            {ui.contactSales} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ContactSalesLink>
          <TrackShipmentLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 px-7 text-base font-medium transition-all hover:border-brand-red hover:text-brand-red active:scale-[0.98]">
            {ui.trackShipment}
          </TrackShipmentLink>
        </div>
      </section>
    </>
  );
}
