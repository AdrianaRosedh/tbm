"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FOOTER_LEGAL_ITEMS, NAV_ITEMS } from "@/lib/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-11 text-white transition-transform hover:bg-white/10 hover:text-white active:scale-95 lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72 border-l-0 bg-brand-indigo text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Mobile"
          className="mt-4 flex h-full flex-col gap-1 px-4 pb-[max(env(safe-area-inset-bottom),2rem)]"
        >
          {NAV_ITEMS.map((item) => {
            const className =
              "flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium uppercase tracking-wider transition-colors hover:bg-white/10 active:bg-white/15";

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/get-a-quote"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-center text-base font-medium text-primary-foreground transition-all hover:bg-primary/85 active:scale-[0.98]"
          >
            Free Quote
          </Link>
          <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-6">
            {FOOTER_LEGAL_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 text-xs text-fg-subtle transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
