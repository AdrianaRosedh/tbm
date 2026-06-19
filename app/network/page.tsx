import type { Metadata } from "next";
import { NetworkPageView } from "@/components/site/network-page-view";
import { getContent } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Cross-border network & coverage",
  description: getContent("en").home.network.body,
  alternates: {
    canonical: "/network",
    languages: { en: "/network", es: "/es/network", "x-default": "/network" },
  },
  openGraph: {
    type: "website",
    title: "Network & Coverage — TBM Carriers",
    description: getContent("en").home.network.body,
    url: `${SITE.url}/network`,
  },
};

export default function NetworkPage() {
  return <NetworkPageView locale="en" />;
}
