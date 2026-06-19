import type { Metadata } from "next";
import { AboutPageView } from "@/components/site/about-page-view";
import { getContent } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";

const es = getContent("es").about;

export const metadata: Metadata = {
  title: es.hero.eyebrow,
  description: es.hero.subhead,
  alternates: {
    canonical: "/es/about",
    languages: { en: "/about", es: "/es/about", "x-default": "/about" },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: `${es.hero.headline} — ${SITE.name}`,
    description: es.hero.subhead,
    url: `${SITE.url}/es/about`,
  },
};

export default function AboutPageEs() {
  return <AboutPageView locale="es" />;
}
