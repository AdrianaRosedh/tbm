import type { Metadata } from "next";
import { SiteHome } from "@/components/site/site-home";
import { getContent } from "@/lib/i18n";

const es = getContent("es");

export const metadata: Metadata = {
  title: "TBM Carriers — Logística transfronteriza",
  description: es.home.hero.subhead,
  alternates: {
    canonical: "/es",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
  openGraph: {
    locale: "es_MX",
    title: "TBM Carriers — Logística transfronteriza",
    description: es.home.hero.subhead,
  },
};

export default function Page() {
  return <SiteHome locale="es" />;
}
