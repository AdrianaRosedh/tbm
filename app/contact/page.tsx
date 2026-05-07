import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { OFFICES, SITE } from "@/lib/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/brand/TBM-C-42.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-indigo-deep/70" />
        </div>
        <div className="relative mx-auto flex min-h-[45svh] w-full max-w-7xl flex-col justify-center px-4 py-20 text-white md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg">
            Talk to a real person, in either country
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
            One number, one inbox, one accountable team — on both sides of the
            border.
          </p>
        </div>
      </section>

      {/* OFFICES */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Our Facilities
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Offices in the U.S. and Mexico
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {OFFICES.map((office, i) => (
              <Reveal as="li" key={office.region} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-black/5 bg-muted/30 p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                    {office.region}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold uppercase tracking-wider">
                    {office.legalName}
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-fg-muted">
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                        aria-hidden="true"
                      />
                      <address className="not-italic leading-relaxed">
                        {office.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                        aria-hidden="true"
                      />
                      <ul className="space-y-1">
                        {office.phones.map((p) => (
                          <li key={p}>
                            <a
                              href={`tel:${p.replace(/\D/g, "")}`}
                              className="transition-colors hover:text-brand-red"
                            >
                              {p}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${SITE.email}`}
                        className="transition-colors hover:text-brand-red"
                      >
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-muted/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Send a Message
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Tell us about your shipment
            </h2>
            <p className="mt-4 text-fg-muted">
              We respond within 24 hours, usually faster. For an instant quote,
              head to{" "}
              <a
                href="/get-a-quote"
                className="text-brand-red underline-offset-4 hover:underline"
              >
                Get a Quote
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
