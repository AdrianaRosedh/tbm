"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { track } from "@vercel/analytics";
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
  const popupRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ y0: 0, active: false });

  // Swipe the grab-handle down to dismiss the mobile/tablet bottom-sheet.
  // Touch-only and scoped to the handle, so it never fights content scroll;
  // the sheet animates itself off-screen for a smooth, native release.
  const onDragStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch" || !popupRef.current) return;
    drag.current = { y0: e.clientY, active: true };
    popupRef.current.style.transition = "none";
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onDragMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !popupRef.current) return;
    const dy = Math.max(0, e.clientY - drag.current.y0);
    popupRef.current.style.translate = `0 ${dy}px`;
  };
  const onDragEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !popupRef.current) return;
    drag.current.active = false;
    const el = popupRef.current;
    const dy = Math.max(0, e.clientY - drag.current.y0);
    el.style.transition = "translate 260ms cubic-bezier(0.32,0.72,0,1)";
    if (dy > 120) {
      el.style.translate = "0 100%";
      window.setTimeout(() => setOpen(false), 230);
    } else {
      el.style.translate = "0 0";
    }
  };

  // Clear any leftover drag transform whenever the sheet (re)opens.
  useEffect(() => {
    if (open && popupRef.current) {
      popupRef.current.style.translate = "";
      popupRef.current.style.transition = "";
    }
  }, [open]);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      track("open_contact");
    };
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
        {/* Mobile: rises as a rounded bottom-sheet (slide-up) leaving a backdrop
            strip on top. Desktop (md+): unchanged full-screen scale/fade takeover. */}
        <Dialog.Popup ref={popupRef} className="fixed inset-x-0 bottom-0 top-0 z-[80] flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain bg-brand-indigo-deep text-white transition-[opacity,translate,scale] duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 max-lg:shadow-2xl max-lg:data-ending-style:translate-y-full max-lg:data-starting-style:translate-y-full lg:data-ending-style:scale-[0.985] lg:data-starting-style:scale-[0.985]">
          {/* Backdrop layers */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-brand-indigo-deep to-brand-indigo-deep" />
            <div className="bg-grid absolute inset-0 opacity-[0.15]" />
            <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
            <div className="animate-float-slow absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-[#3a2f6b]/50 blur-3xl" />
            <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          </div>

          <div className="relative mx-auto flex min-h-full w-full max-w-5xl flex-col px-5 pb-[max(env(safe-area-inset-bottom),2rem)] pt-5 sm:px-8">
            {/* Swipe-down-to-dismiss grab handle (mobile/tablet only) */}
            <div
              onPointerDown={onDragStart}
              onPointerMove={onDragMove}
              onPointerUp={onDragEnd}
              onPointerCancel={onDragEnd}
              className="mx-auto mb-3 flex w-32 shrink-0 cursor-grab touch-none items-center justify-center py-2.5 active:cursor-grabbing lg:hidden"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-11 rounded-full bg-white/25"
              />
            </div>
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
                aria-label={ui.close}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-brand-red active:scale-95"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Dialog.Close>
            </div>

            {/* Headline — same words as the contact page */}
            <div className="mt-4 md:mt-14">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red-bright">
                {ui.contactEyebrow}
              </p>
              <Dialog.Title className="mt-2 max-w-3xl font-heading text-[1.75rem] font-black leading-[1.02] tracking-[-0.02em] sm:mt-3 sm:text-display-md sm:leading-[0.95]">
                {ui.contactTitle}
              </Dialog.Title>
              <Dialog.Description className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-subtle sm:mt-4 md:text-base">
                {ui.contactSubtitle}
              </Dialog.Description>
            </div>

            {/* Primary actions */}
            <div className="mt-5 flex gap-3 sm:mt-8">
              <ContactSalesLink className="shine-hover group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98] sm:h-13 sm:flex-none sm:px-8 sm:text-base">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {ui.emailSales}
              </ContactSalesLink>
              <TrackShipmentLink className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98] sm:h-13 sm:flex-none sm:px-8 sm:text-base">
                <Truck className="h-4 w-4 shrink-0 text-brand-red-bright" aria-hidden="true" />
                {ui.trackShipment}
              </TrackShipmentLink>
            </div>

            {/* Phones + offices */}
            <div className="mt-4 grid flex-1 grid-cols-1 content-start gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
              {OFFICES.map((office, i) => (
                <div
                  key={office.region}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-6"
                >
                  <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand-red-bright">
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
                  <p className="mt-2.5 font-display text-base font-extrabold uppercase tracking-wider">
                    {office.legalName}
                  </p>
                  <address className="mt-1.5 not-italic text-sm leading-relaxed text-fg-subtle">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {office.phones.map((p) => (
                      <li
                        key={p}
                        className="flex items-center justify-between gap-2"
                      >
                        <a
                          href={telHref(p)}
                          className="inline-flex items-center gap-2 font-medium tabular-nums transition-colors hover:text-brand-red-bright"
                        >
                          <Phone
                            className="h-3.5 w-3.5 text-brand-red-bright"
                            aria-hidden="true"
                          />
                          {p}
                        </a>
                        <CopyButton
                          text={p}
                          label={`${ui.copyPhone} ${p}`}
                          className="border-white/15 bg-white/[0.06] text-fg-subtle hover:bg-white/10"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-fg-subtle sm:mt-8">
              {ui.replyWithin}
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
