import Link from "next/link";
import { PRIVACY_POLICY } from "@/lib/content/legal";
import { SITE } from "@/lib/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.description,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-indigo py-14 text-white md:py-20 lg:py-28">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Legal
          </p>
          <h1 className="mt-4 font-display text-display-md font-bold leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg">
            {PRIVACY_POLICY.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle">
            {PRIVACY_POLICY.description}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-fg-subtle">
            Last updated · {PRIVACY_POLICY.lastUpdated}
          </p>
        </div>
      </section>

      {/* TOC + BODY */}
      <section className="bg-white py-14 md:py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-[220px_1fr] md:px-8">
          <nav
            aria-label="On this page"
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              On this page
            </p>
            <ol className="mt-4 space-y-2 text-sm">
              {PRIVACY_POLICY.sections.map((s) => (
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

          <article className="max-w-none space-y-12">
            {PRIVACY_POLICY.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-foreground">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-fg-muted">
                  {s.blocks.map((block, i) =>
                    block.type === "p" ? (
                      <p key={i}>{block.text}</p>
                    ) : (
                      <ul key={i} className="list-none space-y-3 pl-0">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}

            <section className="rounded-2xl border border-black/5 bg-muted/30 p-8">
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
