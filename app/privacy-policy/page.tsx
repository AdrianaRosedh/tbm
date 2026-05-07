import Link from "next/link";
import { SITE } from "@/lib/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TBM Carriers collects, uses, and protects your information.",
};

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "children", title: "Children under 16" },
  { id: "information-collected", title: "Information we collect" },
  { id: "how-used", title: "How we use information" },
  { id: "disclosure", title: "Disclosure of information" },
  { id: "your-choices", title: "Your choices" },
  { id: "security", title: "Data security" },
  { id: "california", title: "California residents" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "How to contact us" },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-indigo py-20 text-white md:py-28">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Legal
          </p>
          <h1 className="mt-4 font-display text-display-md font-bold leading-[0.95] sm:text-display-lg">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle">
            How TBM Carriers, Inc. and its affiliates collect, use, and protect
            your information when you visit our website.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-fg-subtle">
            Last updated · April 2026
          </p>
        </div>
      </section>

      {/* TABLE OF CONTENTS + BODY */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-[220px_1fr] md:px-8">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              On this page
            </p>
            <ol className="mt-4 space-y-2 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-fg-muted transition-colors hover:text-brand-red"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="prose-content max-w-none space-y-12">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-foreground">
                  {s.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">
                  {/* TODO: Migrate full text from sinrelato.space/privacy-policy/. Reviewed legal language should be pasted here before publication on a new domain. */}
                  Section content pending review with legal counsel before
                  publication. Refer to TBM Carriers&apos; existing privacy
                  policy for the authoritative text.
                </p>
              </section>
            ))}

            <section
              id="contact-info"
              className="rounded-2xl border border-black/5 bg-muted/30 p-8 not-prose"
            >
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider">
                Questions about this policy?
              </h2>
              <p className="mt-3 text-fg-muted">
                Contact our team at{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-brand-red underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>{" "}
                or through our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-brand-red underline-offset-4 hover:underline"
                >
                  contact page
                </Link>
                .
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
