import type { Metadata } from "next";
import { ContactPageView } from "@/components/site/contact-page-view";
import { getContent } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";

const es = getContent("es").ui;

export const metadata: Metadata = {
  title: es.contactEyebrow,
  description: es.contactSubtitle,
  alternates: {
    canonical: "/es/contact",
    languages: { en: "/contact", es: "/es/contact", "x-default": "/contact" },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: `${es.contactTitle} — ${SITE.name}`,
    description: es.contactSubtitle,
    url: `${SITE.url}/es/contact`,
  },
};

export default function ContactPageEs() {
  return <ContactPageView locale="es" />;
}
