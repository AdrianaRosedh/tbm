"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitQuote, type QuoteState } from "@/lib/actions/quote";

const INITIAL: QuoteState = { status: "idle" };

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
      {children}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-full px-6 text-base transition-all hover:bg-primary/85 active:scale-[0.98] sm:w-auto"
    >
      {pending ? "Submitting…" : "Submit quote request"}
    </Button>
  );
}

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

export function QuoteForm() {
  const [state, action] = useActionState(submitQuote, INITIAL);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-red/20 bg-brand-red/[0.04] p-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/15">
          <CheckCircle2
            className="h-8 w-8 text-brand-red"
            aria-hidden="true"
          />
        </div>
        <p className="mt-6 font-display text-3xl font-bold uppercase tracking-wider text-foreground">
          Quote request received
        </p>
        <p className="mt-3 text-fg-muted">{state.message}</p>
        <p className="mt-6 text-sm text-fg-muted">
          You&apos;ll hear from a dedicated CSR — they&apos;ll review your lane,
          confirm equipment availability, and reply with a quote.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="relative space-y-10" noValidate>
      <HoneyPot />

      {/* Contact */}
      <fieldset className="space-y-5">
        <SectionTitle>Your contact info</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="q-fullName" label="Full name">
            <Input id="q-fullName" name="fullName" required autoComplete="name" />
          </Field>
          <Field id="q-company" label="Company name">
            <Input
              id="q-company"
              name="company"
              required
              autoComplete="organization"
            />
          </Field>
          <Field id="q-email" label="Email">
            <Input
              id="q-email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </Field>
          <Field id="q-phone" label="Phone">
            <Input
              id="q-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
            />
          </Field>
        </div>
      </fieldset>

      {/* Shipment */}
      <fieldset className="space-y-5">
        <SectionTitle>Shipment</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field id="q-commodity" label="Commodity">
            <Input id="q-commodity" name="commodity" required />
          </Field>
          <Field id="q-weight" label="Weight">
            <Input
              id="q-weight"
              name="weight"
              required
              placeholder="lbs or kg"
            />
          </Field>
          <Field id="q-volume" label="Weekly load volume">
            <Input
              id="q-volume"
              name="volume"
              required
              placeholder="loads / week"
            />
          </Field>
        </div>
      </fieldset>

      {/* Origin */}
      <fieldset className="space-y-5">
        <SectionTitle>Origin</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field id="q-originCity" label="City">
            <Input
              id="q-originCity"
              name="originCity"
              required
              autoComplete="address-level2"
            />
          </Field>
          <Field id="q-originState" label="State">
            <Input
              id="q-originState"
              name="originState"
              required
              autoComplete="address-level1"
            />
          </Field>
          <Field id="q-originZip" label="ZIP / postal code">
            <Input
              id="q-originZip"
              name="originZip"
              required
              autoComplete="postal-code"
            />
          </Field>
        </div>
      </fieldset>

      {/* Destination */}
      <fieldset className="space-y-5">
        <SectionTitle>Destination</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field id="q-destCity" label="City">
            <Input id="q-destCity" name="destCity" required />
          </Field>
          <Field id="q-destState" label="State">
            <Input id="q-destState" name="destState" required />
          </Field>
          <Field id="q-destZip" label="ZIP / postal code">
            <Input id="q-destZip" name="destZip" required />
          </Field>
        </div>
      </fieldset>

      {/* Timing + notes */}
      <fieldset className="space-y-5">
        <SectionTitle>Timing</SectionTitle>
        <Field id="q-shipDate" label="Estimated ship date">
          <Input id="q-shipDate" name="shipDate" type="date" required />
        </Field>
        <Field id="q-notes" label="Anything else we should know?">
          <Textarea
            id="q-notes"
            name="notes"
            rows={4}
            maxLength={5000}
            placeholder="Special handling, lane history, packaging notes…"
          />
        </Field>
      </fieldset>

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
        Required fields are marked with an asterisk. We&apos;ll never share your
        details — see our{" "}
        <a
          href="/privacy-policy"
          className="text-brand-red underline-offset-4 hover:underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
