"use client";

import { type ReactNode } from "react";
import { track } from "@vercel/analytics";
import { SITE } from "@/lib/content/site";
import { useContent } from "@/lib/i18n-client";
import { cn, mailtoHref } from "@/lib/utils";

/** External "Track Shipment" link to the TMS portal. */
export function TrackShipmentLink({
  className,
  children,
  onClick,
  ...rest
}: {
  className?: string;
  children: ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={SITE.trackingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track("track_shipment");
        onClick?.(e);
      }}
      className={cn("font-display", className)}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Click-to-send "Contact Sales" link. The address is kept in code (SITE.salesEmail)
 * and never rendered — clicking opens the visitor's mail client.
 */
export function ContactSalesLink({
  className,
  children,
  subject,
  onClick,
  ...rest
}: {
  className?: string;
  children: ReactNode;
  subject?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ui } = useContent();
  return (
    <a
      href={mailtoHref(SITE.salesEmail, subject ?? ui.salesSubject)}
      onClick={(e) => {
        track("contact_sales");
        onClick?.(e);
      }}
      className={cn("font-display", className)}
      {...rest}
    >
      {children}
    </a>
  );
}
