import type { Metadata } from "next";
import { NetworkPageView } from "@/components/site/network-page-view";
import { getContent } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Red y cobertura transfronteriza",
  description: getContent("es").home.network.body,
  alternates: {
    canonical: "/es/network",
    languages: { en: "/network", es: "/es/network", "x-default": "/network" },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Red y Cobertura — TBM Carriers",
    description: getContent("es").home.network.body,
    url: `${SITE.url}/es/network`,
  },
};

export default function NetworkPageEs() {
  return <NetworkPageView locale="es" />;
}
