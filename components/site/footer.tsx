import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, Truck } from "lucide-react";
import {
  FOOTER_LEGAL_ITEMS,
  NAV_ITEMS,
  OFFICES,
  SITE,
} from "@/lib/content/site";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { ContactSalesLink, TrackShipmentLink } from "./site-links";
import { FooterNavItems } from "./footer-nav";
import { JumpLink } from "./jump-link";
import { BackToTop } from "./back-to-top";
import { Reveal } from "./reveal";
import { telHref } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-brand-indigo text-white">
      {/* Decorative background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-[0.35]" />
        <div className="animate-aurora absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="animate-float-slow absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[#3a2f6b]/40 blur-3xl" />
        <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-14 md:px-8 md:py-16">
          <Reveal
            variant="up"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-indigo-deep via-brand-indigo to-brand-indigo-deep p-6 sm:p-8 md:p-12"
          >
            {/* glow accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-red/25 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Cross-border since {SITE.foundedYear}
                </span>
                <h2 className="mt-4 font-display text-display-sm font-extrabold leading-tight">
                  Ready to ship with{" "}
                  <span className="text-gradient-brand">confidence?</span>
                </h2>
                <p className="mt-3 text-fg-subtle">
                  Talk to our cross-border specialists — we reply within 24 hours.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <ContactSalesLink className="shine-hover group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Contact Sales
                </ContactSalesLink>
                <TrackShipmentLink className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 text-base font-medium text-white transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98]">
                  <Truck className="h-4 w-4 text-brand-red" aria-hidden="true" />
                  Track Shipment
                </TrackShipmentLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Certifications trust strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-fg-subtle">
            Certified & trusted across North America
          </p>
          <ul className="mt-6 flex flex-wrap items-start justify-center gap-3 sm:gap-4">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.slug}>
                <JumpLink
                  to="compliance"
                  title={cert.full}
                  className="group/cert flex w-32 flex-col items-center gap-2"
                >
                  <span className="flex h-16 w-full items-center justify-center rounded-xl border border-white/10 bg-white/90 px-3 grayscale transition-all duration-300 group-hover/cert:-translate-y-1 group-hover/cert:border-brand-red/50 group-hover/cert:shadow-lg group-hover/cert:shadow-brand-red/10 group-hover/cert:grayscale-0">
                    <Image
                      src={cert.logo}
                      alt={cert.full}
                      width={120}
                      height={48}
                      className="h-9 w-auto object-contain"
                    />
                  </span>
                  <span className="text-center text-[10px] font-semibold uppercase tracking-widest text-fg-subtle transition-colors group-hover/cert:text-white">
                    {cert.short}
                  </span>
                </JumpLink>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center">
            <JumpLink
              to="compliance"
              className="group/all inline-flex items-center gap-1.5 text-xs font-medium text-fg-subtle transition-colors hover:text-brand-red"
            >
              See how our security program works
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5"
                aria-hidden="true"
              />
            </JumpLink>
          </p>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
        <div>
          <Image
            src="/brand/TBM-2.png"
            alt="TBM Carriers"
            width={663}
            height={204}
            sizes="180px"
            className="h-10 w-auto"
          />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-fg-subtle">
            {SITE.tagline}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-fg-subtle">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
            </span>
            Operating since {SITE.foundedYear}
          </p>
        </div>

        {OFFICES.map((office, i) => (
          <div key={office.region}>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-red">
              <Image
                src={i === 0 ? "/brand/eua-flag-tbm.jpg" : "/brand/mx-flag-tbm.jpg"}
                alt=""
                width={28}
                height={16}
                className="h-3.5 w-6 rounded-[2px] object-cover ring-1 ring-white/20"
              />
              {office.region}
            </p>
            <p className="mt-3 font-medium">{office.legalName}</p>
            <address className="mt-2 not-italic text-sm leading-relaxed text-fg-subtle">
              {office.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="mt-3 space-y-1.5 text-sm">
              {office.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telHref(phone)}
                    className="inline-flex items-center gap-2 text-fg-subtle transition-colors hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand-red/70" aria-hidden="true" />
                    <span className="tabular-nums">{phone}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
            Navigate
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <FooterNavItems />
            <li>
              <TrackShipmentLink className="group inline-flex items-center gap-2 text-fg-subtle transition-colors hover:text-white">
                <Truck className="h-3.5 w-3.5 text-brand-red" aria-hidden="true" />
                Track Shipment
              </TrackShipmentLink>
            </li>
            <li>
              <ContactSalesLink className="group inline-flex items-center gap-2 text-fg-subtle transition-colors hover:text-white">
                <Mail className="h-3.5 w-3.5 text-brand-red" aria-hidden="true" />
                Contact Sales
              </ContactSalesLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-start justify-between gap-4 px-4 py-6 text-xs text-fg-subtle md:flex-row md:items-center md:px-8">
          <p>
            © {SITE.copyrightYear} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex gap-6">
              {FOOTER_LEGAL_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
