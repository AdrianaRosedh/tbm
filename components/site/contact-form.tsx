"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";

const INITIAL: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-11 rounded-full px-6 text-base hover:bg-primary/85"
    >
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, INITIAL);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <p className="font-display text-lg font-bold uppercase tracking-wider text-green-900">
          Message sent
        </p>
        <p className="mt-2 text-sm text-green-800">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
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
          className="resize-y"
        />
      </div>
      {state.status === "error" && state.message && (
        <p
          className={cn(
            "rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          )}
          role="alert"
        >
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
