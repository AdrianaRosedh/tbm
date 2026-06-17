"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { Reveal } from "./reveal";
import { TextReveal } from "./text-reveal";
import { ContactSalesLink } from "./site-links";
import { useContent } from "@/lib/i18n-client";

/**
 * One-page FAQ. Oswald carries the questions (structure), Fraunces the
 * answers (reading). Single-open accordion; the panel animates height via
 * Base UI's --accordion-panel-height with the same transition system the
 * contact overlay uses. Localized via the active locale's dictionary.
 */
export function Faq() {
  const { faq } = useContent().home;
  const { eyebrow, headline, body, items } = faq;

  // FAQPage structured data — same Q&A as the visible accordion, so the
  // answers are eligible for rich results even while collapsed.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
          {eyebrow}
        </p>
        <TextReveal
          as="h2"
          text={headline}
          className="mt-3 font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
        />
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          {body}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Accordion.Root
          multiple={false}
          className="border-t border-border"
        >
          {items.map((item) => (
            <Accordion.Item key={item.q} className="border-b border-border">
              <Accordion.Header className="m-0">
                <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left transition-colors hover:text-brand-red focus-visible:outline-none focus-visible:text-brand-red">
                  <span className="font-display text-base font-semibold leading-snug tracking-tight md:text-lg">
                    {item.q}
                  </span>
                  <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-border text-brand-red transition-all group-hover:border-brand-red group-data-[panel-open]:border-brand-red group-data-[panel-open]:bg-brand-red group-data-[panel-open]:text-white">
                    <Plus
                      className="size-4 transition-transform duration-300 group-data-[panel-open]:rotate-45"
                      aria-hidden="true"
                    />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                <p className="pb-6 pr-12 text-base leading-relaxed text-fg-muted">
                  {item.a}
                </p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Reveal>

      <Reveal
        delay={0.15}
        className="mt-12 flex flex-col items-center gap-4 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-fg-subtle">
          Still have a question?
        </p>
        <ContactSalesLink className="shine-hover group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
          Contact Sales
        </ContactSalesLink>
      </Reveal>
    </div>
  );
}
