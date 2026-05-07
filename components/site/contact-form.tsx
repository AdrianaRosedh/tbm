"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact, type ContactState } from "@/lib/actions/contact";

const INITIAL: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-full px-6 text-base transition-all hover:bg-primary/85 active:scale-[0.98] sm:h-11 sm:w-auto"
    >
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

/** Off-screen honeypot — bots fill any field, humans can't see it. */
function HoneyPot() {
  return (
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
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, INITIAL);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-red/20 bg-brand-red/[0.04] p-8 text-center sm:text-left">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/15 sm:mx-0">
          <CheckCircle2
            className="h-7 w-7 text-brand-red"
            aria-hidden="true"
          />
        </div>
        <p className="mt-6 font-display text-2xl font-bold uppercase tracking-wider text-foreground">
          Message sent
        </p>
        <p className="mt-3 text-fg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="relative space-y-5" noValidate>
      <HoneyPot />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Full name</Label>
          <Input id="contact-name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input id="contact-subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          className="resize-y"
        />
      </div>
      {state.status === "error" && state.message && (
        <p
          className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {state.message}
        </p>
      )}
      <SubmitButton />
      <p className="text-xs text-fg-muted">
        We&apos;ll never share your details. Replies usually within 24 hours.
      </p>
    </form>
  );
}
