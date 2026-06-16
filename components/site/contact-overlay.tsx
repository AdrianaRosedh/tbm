"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Mail, Phone, Truck, X } from "lucide-react";
import { CopyButton } from "./copy-button";
import { ContactSalesLink, TrackShipmentLink } from "./site-links";
import { OFFICES } from "@/lib/content/site";
import { useContent } from "@/lib/i18n-client";
import { telHref } from "@/lib/utils";

/** Dispatch this on `window` to open the contact overlay from anywhere. */
export const OPEN_CONTACT_EVENT = "tbm:open-contact";

/**
 * Full-screen contact takeover — the one-page site's "Contact Us".
 * Opens via OPEN_CONTACT_EVENT (navbar, mobile menu). The /contact page
 * remains live for SEO and direct links.
 */
export function ContactOverlay() {
  const [open, setOpen] = useState(false);
  const { ui } = useContent();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CONTACT_EVENT, onOpen);

    // Open from the URL on a fresh load — the /contact route redirects here
    // with ?contact=open so old links and direct visits land on the one-page
    // site with the popup already open. Strip the param so refresh/back is clean.
    if (new URLSearchParams(window.location.search).get("contact") === "open") {
      setOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }

    return () => window.removeEventListener(OPEN_CONTACT_EVENT, onOpen);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] bg-brand-indigo-deep/60 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-[80] flex flex-col overflow-y-auto overscroll-contain bg-brand-indigo-deep text-white transition-all duration-300 data-ending-style:scale-[0.985] data-ending-style:opacity-0 data-starting-style:scale-[0.985] data-starting-style:opacity-0">
          {/* Backdrop layers */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-brand-indigo-deep to-brand-indigo-deep" />
            <div className="bg-grid absolute inset-0 opacity-[0.15]" />
            <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
            <div className="animate-float-slow absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-[#3a2f6b]/50 blur-3xl" />
            <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          </div>

          <div className="relative mx-auto flex min-h-full w-full max-w-5xl flex-col px-5 pb-[max(env(safe-area-inset-bottom),2rem)] pt-[max(env(safe-area-inset-top),1.25rem)] sm:px-8">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <Image
                src="/brand/TBM-2.png"
                alt="TBM Carriers"
                width={663}
                height={204}
                sizes="140px"
                className="h-8 w-auto shrink-0"
              />
              <Dialog.Close
                aria-label="Close contact"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-brand-red active:scale-95"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Dialog.Close>
            </div>

            {/* Headline — same words as the contact page */}
            <div className="mt-10 md:mt-14">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
                {ui.contactEyebrow}
              </p>
              <Dialog.Title className="mt-3 max-w-3xl font-display text-display-md font-black leading-[0.95] tracking-[-0.02em]">
                {ui.contactTitle}
              </Dialog.Title>
              <Dialog.Description className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-subtle md:text-base">
                {ui.contactSubtitle}
              </Dialog.Description>
            </div>

            {/* Primary actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactSalesLink className="shine-hover group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {ui.contactSales}
              </ContactSalesLink>
              <TrackShipmentLink className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98]">
                <Truck className="h-4 w-4 text-brand-red" aria-hidden="true" />
                {ui.trackShipment}
              </TrackShipmentLink>
            </div>

            {/* Phones + offices */}
            <div className="mt-10 grid flex-1 grid-cols-1 content-start gap-4 sm:grid-cols-2">
              {OFFICES.map((office, i) => (
                <div
                  key={office.region}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                >
                  <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand-red">
                    <Image
                      src={
                        i === 0
                          ? "/brand/eua-flag-tbm.jpg"
                          : "/brand/mx-flag-tbm.jpg"
                      }
                      alt=""
                      width={28}
                      height={16}
                      className="h-3.5 w-6 rounded-[2px] object-cover ring-1 ring-white/20"
                    />
                    {i === 0 ? ui.regionUS : ui.regionMX}
                  </p>
                  <p className="mt-3 font-display text-base font-extrabold uppercase tracking-wider">
                    {office.legalName}
                  </p>
                  <address className="mt-2 not-italic text-sm leading-relaxed text-fg-subtle">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <ul className="mt-4 space-y-2 text-sm">
                    {office.phones.map((p) => (
                      <li
                        key={p}
                        className="flex items-center justify-between gap-2"
                      >
                        <a
                          href={telHref(p)}
                          className="inline-flex items-center gap-2 font-medium tabular-nums transition-colors hover:text-brand-red"
                        >
                          <Phone
                            className="h-3.5 w-3.5 text-brand-red"
                            aria-hidden="true"
                          />
                          {p}
                        </a>
                        <CopyButton
                          text={p}
                          label={`Copy phone number ${p}`}
                          className="border-white/15 bg-white/[0.06] text-fg-subtle hover:bg-white/10"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
              {ui.replyWithin}
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
