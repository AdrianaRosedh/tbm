"use client";

import { type ReactNode } from "react";
import { OPEN_CONTACT_EVENT } from "./contact-overlay";

/**
 * Opens the contact popup from anywhere (works on every route — the overlay
 * lives in the root layout). Replaces the old links to the /contact page.
 */
export function ContactPopupLink({
  className,
  children,
  onClick,
  ...rest
}: {
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={(e) => {
        window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT));
        onClick?.(e);
      }}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}
