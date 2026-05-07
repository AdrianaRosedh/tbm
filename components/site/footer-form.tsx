"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FooterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get("email");
        // Phase 2: wire to /get-a-quote action or transactional email service
        console.log("[footer-form] submitted email:", email);
        setSubmitted(true);
      }}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      aria-label="Quick quote request"
    >
      <Input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        aria-label="Email address"
        className="border-white/20 bg-white/10 text-white placeholder:text-fg-subtle focus-visible:ring-brand-red"
      />
      <Button
        type="submit"
        className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90 sm:shrink-0"
      >
        {submitted ? "Thanks — we'll be in touch" : "Get a Quote"}
      </Button>
    </form>
  );
}
