import Link from "next/link";
import Image from "next/image";
import {
  FOOTER_LEGAL_ITEMS,
  NAV_ITEMS,
  OFFICES,
  SITE,
} from "@/lib/content/site";
import { FooterForm } from "./footer-form";

export function Footer() {
  return (
    <footer className="bg-brand-indigo text-white">
      {/* CTA band */}
      <div className="border-b border-white/10 bg-brand-indigo-deep">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-4 py-12 md:flex-row md:items-center md:px-8">
          <div className="max-w-md">
            <h2 className="font-display text-display-sm font-bold leading-tight">
              Ready to ship with confidence?
            </h2>
            <p className="mt-2 text-fg-subtle">
              Get a quote in under 24 hours from our cross-border specialists.
            </p>
          </div>
          <FooterForm />
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
        <div>
          <Image
            src="/brand/TBM-Carriers-Logo.jpg"
            alt="TBM Carriers"
            width={120}
            height={48}
            className="h-10 w-auto brightness-0 invert"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="mt-6 text-sm leading-relaxed text-fg-subtle">
            {SITE.tagline}
          </p>
        </div>

        {OFFICES.map((office) => (
          <div key={office.region}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
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
            <ul className="mt-3 space-y-1 text-sm">
              {office.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="text-fg-subtle transition-colors hover:text-white"
                  >
                    {phone}
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
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-fg-subtle transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-fg-subtle transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-fg-subtle md:flex-row md:items-center md:px-8">
          <p>
            © {SITE.copyrightYear} {SITE.name}. All rights reserved.
          </p>
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
        </div>
      </div>
    </footer>
  );
}
