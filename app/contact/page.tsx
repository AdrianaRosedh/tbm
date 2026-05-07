import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { DEPARTMENTS, FACILITIES, OFFICES, SITE } from "@/lib/content/site";
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
        <div className="relative mx-auto flex min-h-[45dvh] w-full max-w-screen-2xl flex-col justify-center px-4 py-16 text-white md:py-20 md:px-8">
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

      {/* DEPARTMENTS */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Contact Our Team
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Talk to the right person, fast
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DEPARTMENTS.map((dept, i) => (
              <Reveal as="li" key={dept.name} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-8 transition-colors hover:border-brand-red/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-red/10">
                    <Image
                      src={dept.icon}
                      alt=""
                      width={64}
                      height={64}
                      className="h-10 w-10"
                    />
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-red">
                    {dept.name}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {dept.contacts.map((c) => (
                      <li key={c.email}>
                        <p className="font-display text-base font-bold uppercase tracking-wider text-foreground">
                          {c.name}
                        </p>
                        <a
                          href={`mailto:${c.email}`}
                          className="mt-1 block text-sm text-fg-muted transition-colors hover:text-brand-red"
                        >
                          {c.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* OFFICES */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
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

      {/* FACILITIES (extended) */}
      <section className="bg-brand-indigo py-16 text-white md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Our Facilities
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Where TBM operates
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* US */}
            <Reveal>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                  {FACILITIES.us.region}
                </p>
                <p className="mt-3 font-display text-2xl font-bold uppercase tracking-wider">
                  {FACILITIES.us.legalName}
                </p>

                <div className="mt-8 space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">
                      Terminals
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {FACILITIES.us.terminals.map((t) => (
                        <li key={t.city} className="text-sm">
                          <span className="font-medium">{t.city}</span>
                          {t.address && (
                            <span className="block text-fg-subtle">
                              {t.address}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">
                      Drop Yards
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {FACILITIES.us.dropYards.map((y) => (
                        <li
                          key={y}
                          className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs"
                        >
                          {y}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">
                      Border Crossings
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {FACILITIES.us.borderCrossings.map((b) => (
                        <li
                          key={b}
                          className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* MX */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                  {FACILITIES.mx.region}
                </p>
                <p className="mt-3 font-display text-2xl font-bold uppercase tracking-wider">
                  {FACILITIES.mx.legalName}
                </p>

                <div className="mt-8 space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">
                      Offices
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {FACILITIES.mx.offices.map((o) => (
                        <li key={o.city} className="text-sm">
                          <span className="font-medium">{o.city}</span>
                          <span className="block text-fg-subtle">
                            {o.address}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">
                      Border Crossings
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {FACILITIES.mx.borderCrossings.map((b) => (
                        <li
                          key={b}
                          className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-fg-subtle">
                      Maintenance
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {FACILITIES.mx.maintenance.map((m) => (
                        <li
                          key={m}
                          className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
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
