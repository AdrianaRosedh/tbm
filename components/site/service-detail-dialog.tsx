"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowRight, Check, X } from "lucide-react";
import { ContactPopupLink } from "./contact-popup-link";
import {
  SERVICE_DETAILS,
  SERVICE_DETAILS_ES,
  type ServiceItem,
} from "@/lib/content/services";
import { useContent, useLocale } from "@/lib/i18n-client";

/**
 * Modern, on-brand service "quick view" popup. Opened from the homepage service
 * cards instead of navigating away — the underlying cards stay real links to
 * /services/[slug] (SEO + cmd-click + no-JS), this just enhances the plain
 * click. Shows the icon, full blurb, and the grounded highlights, with a
 * Contact Sales CTA and a link to the full landing page.
 */
export function ServiceDetailDialog({
  service,
  onClose,
}: {
  service: ServiceItem | null;
  onClose: () => void;
}) {
  const { ui } = useContent();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";

  // Retain the last service so content stays rendered through the close
  // animation (open is driven by `service`, content by the snapshot).
  const [snap, setSnap] = useState<ServiceItem | null>(service);
  useEffect(() => {
    if (service) setSnap(service);
  }, [service]);

  const s = snap;
  const detail = s
    ? (locale === "es" ? SERVICE_DETAILS_ES : SERVICE_DETAILS)[s.slug]
    : undefined;
  const href = s ? `${base}/services/${s.slug}` : "#";

  return (
    <Dialog.Root
      open={!!service}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[80] bg-brand-indigo-deep/70 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[90] max-h-[88dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-3xl border border-white/10 bg-brand-indigo-deep text-white shadow-2xl transition-[opacity,scale] duration-300 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          {/* Decorative backdrop — clipped so it never causes overflow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-brand-indigo-deep to-brand-indigo-deep" />
            <div className="animate-aurora absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-red/20 blur-3xl" />
            <div className="bg-grid absolute inset-0 opacity-[0.12]" />
            <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          </div>

          {s && (
            <div className="relative p-6 sm:p-8">
              <Dialog.Close
                aria-label={ui.close}
                className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-brand-red active:scale-95"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Dialog.Close>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-brand-red/20 ring-1 ring-brand-red/30">
                <Image
                  src={s.image}
                  alt=""
                  width={131}
                  height={131}
                  className="h-11 w-11 object-contain"
                />
              </div>

              {detail?.keyword && (
                <p className="mt-5 pr-12 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red-bright">
                  {detail.keyword}
                </p>
              )}
              <Dialog.Title className="mt-2 font-heading text-2xl font-extrabold uppercase tracking-wider sm:text-3xl">
                {s.title}
              </Dialog.Title>
              <Dialog.Description className="mt-4 text-sm leading-relaxed text-fg-subtle sm:text-base">
                {s.full ?? s.short}
              </Dialog.Description>

              {detail?.highlights && (
                <ul className="mt-6 space-y-3">
                  {detail.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-sm leading-relaxed text-fg-subtle"
                    >
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-bright"
                        aria-hidden="true"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ContactPopupLink
                  onClick={onClose}
                  className="shine-hover inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98] sm:text-base"
                >
                  {ui.contactSales}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ContactPopupLink>
                <Link
                  href={href}
                  onClick={onClose}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98] sm:text-base"
                >
                  {ui.viewFullService}
                </Link>
              </div>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
