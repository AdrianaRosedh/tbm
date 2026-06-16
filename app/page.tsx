import type { Metadata } from "next";
import { SiteHome } from "@/components/site/site-home";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
};

export default function Page() {
  return <SiteHome locale="en" />;
}
