"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FooterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (submitted) {
    return (
      <div className="flex w-full max-w-md items-start gap-3 rounded-2xl border border-brand-red/30 bg-brand-red/[0.08] px-5 py-4 text-white">
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold">Thanks — we&apos;ll be in touch.</p>
          <p className="mt-1 text-xs text-fg-subtle">
            A CSR will reply within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        // Honeypot check
        if (String(fd.get("website") ?? "").trim()) {
          setSubmitted(true);
          return;
        }
        const email = String(fd.get("email") ?? "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError("Please enter a valid email address.");
          return;
        }
        setError(null);
        setPending(true);
        // Phase 3: post to /api/footer-lead or wire to Resend / HubSpot.
        console.log("[footer-form] submitted email:", email);
        setTimeout(() => {
          setPending(false);
          setSubmitted(true);
        }, 400);
      }}
      className="relative flex w-full max-w-md flex-col gap-3 sm:flex-row"
      aria-label="Quick quote request"
      noValidate
    >
      {/* Honeypot */}
      <div
        className="pointer-events-none absolute -top-[9999px] -left-[9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="flex-1">
        <Input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          aria-label="Email address"
          className="border-white/20 bg-white/10 text-white placeholder:text-fg-subtle focus-visible:ring-brand-red"
        />
        {error && (
          <p className="mt-1.5 text-xs text-brand-red" role="alert">
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="h-11 rounded-full bg-primary px-6 text-base text-primary-foreground transition-all hover:bg-primary/85 active:scale-[0.98] sm:shrink-0"
      >
        {pending ? "Sending…" : "Get a Quote"}
      </Button>
    </form>
  );
}
