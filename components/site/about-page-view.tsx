import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TrackShipmentLink } from "./site-links";
import { ContactPopupLink } from "./contact-popup-link";
import { getContent, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";

/**
 * Shared About / Company page (EN /about, ES /es/about). Uses the fuller about
 * content (mission/vision/history, story, pillars) — more than the homepage
 * "Know Us" teaser — for entity trust / E-E-A-T. Replaces the old redirect.
 */
export function AboutPageView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, nav, about } = c;
  const isEs = locale === "es";
  const homeHref = isEs ? "/es" : "/";
  const pageUrl = `${SITE.url}${isEs ? "/es" : ""}/about`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: `${about.hero.headline} — ${SITE.name}`,
        description: about.hero.subhead,
        url: pageUrl,
        inLanguage: isEs ? "es-MX" : "en-US",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: nav.home, item: `${SITE.url}${homeHref}` },
          { "@type": "ListItem", position: 2, name: about.hero.eyebrow, item: pageUrl },
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
            <span className="text-brand-red">{about.hero.eyebrow}</span>
          </nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            {about.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-display-sm font-black uppercase leading-[1.05] tracking-tight sm:text-display-md">
            {about.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-subtle">
            {about.hero.subhead}
          </p>
        </div>
      </section>

      {/* MISSION / VISION / HISTORY */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
          <h2 className="max-w-3xl font-heading text-display-sm font-extrabold tracking-tight">
            {about.mvh.headline}
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {about.mvh.items.map((item, i) => (
              <li
                key={item.label}
                className="rounded-2xl border border-black/5 bg-muted/20 p-6"
              >
                <span className="font-display text-2xl font-extrabold tracking-[0.3em] text-brand-indigo/70">
                  {["I", "II", "III", "IV", "V", "VI"][i]}
                </span>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">
                  {item.label}
                </p>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 md:px-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={about.story.image}
              alt="TBM Carriers cross-border operations"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
              {about.story.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-display-sm font-extrabold tracking-tight">
              {about.story.headline}
            </h2>
            {about.story.body.map((p) => (
              <p key={p} className="mt-4 text-base leading-relaxed text-fg-muted">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactPopupLink className="shine-hover inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
                {ui.contactSales} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ContactPopupLink>
              <TrackShipmentLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 px-7 text-base font-medium transition-all hover:border-brand-red hover:text-brand-red active:scale-[0.98]">
                {ui.trackShipment}
              </TrackShipmentLink>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            {about.pillarsIntro.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight">
            {about.pillarsIntro.headline}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted md:text-lg">
            {about.pillarsIntro.body}
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {about.pillars.map((pillar) => (
              <li
                key={pillar.title}
                className="rounded-2xl border border-black/5 bg-muted/20 p-6"
              >
                <h3 className="font-heading text-xl font-extrabold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
