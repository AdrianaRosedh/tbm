"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OPEN_CONTACT_EVENT } from "./contact-overlay";
import { ContactSalesLink, TrackShipmentLink } from "./site-links";
import { LangToggle } from "./lang-toggle";
import { FOOTER_LEGAL_ITEMS, NAV_ITEMS, OFFICES } from "@/lib/content/site";
import { useContent } from "@/lib/i18n-client";
import { cn, telHref } from "@/lib/utils";

/**
 * Full-screen mobile navigation takeover. Oversized numbered links stagger in
 * with a blur-settle, over an aurora + dot-grid backdrop. Slides from the
 * right; respects reduced motion and safe-area insets.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { nav, ui } = useContent();

  const list = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
  };
  const itemVariants = reduce
    ? undefined
    : {
        hidden: { opacity: 0, x: 44, filter: "blur(6px)" },
        show: {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-9 text-white transition-transform hover:bg-white/10 hover:text-white active:scale-95 lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        // Inline width: the base sheet's `data-[side=right]:w-3/4` variant
        // outranks utility overrides (class+attribute specificity).
        style={{ width: "100%", maxWidth: "none" }}
        className="h-dvh overflow-y-auto overscroll-contain border-l-0 bg-brand-indigo-deep p-0 text-base text-white"
      >
        {/* Backdrop — aurora, dot grid, grain */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-brand-indigo-deep to-brand-indigo-deep" />
          <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
          <div className="animate-float-slow absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-[#3a2f6b]/50 blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-[0.16]" />
          <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        </div>

        <div className="relative flex min-h-full flex-col px-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-[max(env(safe-area-inset-top),1.25rem)] sm:px-10">
          {/* Top bar: logo + glass close */}
          <SheetHeader className="flex-row items-center justify-between p-0">
            <Image
              src="/brand/TBM-2.png"
              alt="TBM Carriers"
              width={663}
              height={204}
              sizes="140px"
              className="h-8 w-auto shrink-0 self-start"
            />
            <SheetTitle className="sr-only">Main menu</SheetTitle>
            <div className="flex items-center gap-3">
              <LangToggle />
              <SheetClose
                render={
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-brand-red active:scale-95"
                  />
                }
              >
                <X className="h-5 w-5" />
              </SheetClose>
            </div>
          </SheetHeader>

          {/* Oversized nav */}
          <motion.nav
            aria-label="Mobile"
            variants={list}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col justify-center py-8"
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive =
                !item.external &&
                item.href.startsWith("/") &&
                !item.href.includes("#") &&
                (item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href));

              const inner = (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-8 shrink-0 font-display text-xs font-extrabold tracking-[0.2em] transition-colors",
                      isActive ? "text-brand-red" : "text-white/30 group-hover/m:text-brand-red"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "relative font-display text-[2rem] font-extrabold uppercase leading-[1.15] tracking-tight transition-colors sm:text-display-md",
                      isActive ? "text-white" : "text-white/75 group-hover/m:text-white"
                    )}
                  >
                    {nav[item.labelKey]}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-brand-red to-[#ff8a6e] transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover/m:w-full"
                      )}
                    />
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "ml-auto h-6 w-6 shrink-0 text-brand-red transition-all duration-300",
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover/m:translate-x-0 group-hover/m:opacity-100"
                    )}
                    aria-hidden="true"
                  />
                </>
              );

              const className =
                "group/m flex min-h-14 items-center gap-4 py-2";

              return (
                <motion.div key={item.href} variants={itemVariants}>
                  {item.overlay ? (
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        window.dispatchEvent(
                          new CustomEvent(OPEN_CONTACT_EVENT)
                        );
                      }}
                      className={cn(className, "w-full text-left")}
                    >
                      {inner}
                    </button>
                  ) : item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {inner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Action cluster */}
          <motion.div
            variants={itemVariants}
            initial={reduce ? false : "hidden"}
            animate="show"
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <TrackShipmentLink
                onClick={() => setOpen(false)}
                className="shine-hover flex min-h-13 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                {ui.trackShipment}
              </TrackShipmentLink>
              <ContactSalesLink
                onClick={() => setOpen(false)}
                className="flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-white/[0.08] active:scale-[0.98]"
              >
                {ui.contactSales}
              </ContactSalesLink>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={telHref(OFFICES[0].phones[0])}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 text-sm text-fg-subtle transition-colors hover:border-white/30 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-brand-red" aria-hidden="true" />
                <span className="font-semibold text-white/90">US</span>
                <span className="truncate tabular-nums">{OFFICES[0].phones[0]}</span>
              </a>
              <a
                href={telHref(OFFICES[1].phones[0])}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 text-sm text-fg-subtle transition-colors hover:border-white/30 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-brand-red" aria-hidden="true" />
                <span className="font-semibold text-white/90">MX</span>
                <span className="truncate tabular-nums">{OFFICES[1].phones[0]}</span>
              </a>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-fg-subtle">
              {FOOTER_LEGAL_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-1.5 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
