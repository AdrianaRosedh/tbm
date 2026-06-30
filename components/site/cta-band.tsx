import { Mail, Truck } from "lucide-react";
import { ContactSalesLink, TrackShipmentLink } from "./site-links";
import { Reveal } from "./reveal";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

/**
 * Site-wide dark closer: aurora glows, grid texture, Contact Sales +
 * Track Shipment actions. Keeps every page ending on the same strong note.
 */
export function CtaBand({ eyebrow = "Ready when you are", title, body }: CtaBandProps) {
  return (
    <section className="grain relative isolate overflow-hidden bg-brand-indigo py-16 text-white md:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="animate-float-slow absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-[#3a2f6b]/40 blur-3xl" />
        <div className="bg-grid absolute inset-0 opacity-[0.15]" />
        <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center md:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand-red-bright">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
          {title}
        </h2>
        {body && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-subtle md:text-lg">
            {body}
          </p>
        )}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ContactSalesLink className="shine-hover group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact Sales
          </ContactSalesLink>
          <TrackShipmentLink className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white transition-all hover:border-brand-red hover:bg-white/10 active:scale-[0.98]">
            <Truck className="h-4 w-4 text-brand-red-bright" aria-hidden="true" />
            Track Shipment
          </TrackShipmentLink>
        </div>
      </Reveal>
    </section>
  );
}
