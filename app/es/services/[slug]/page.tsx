import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/site/service-page-view";
import { SERVICES, SERVICE_DETAILS_ES } from "@/lib/content/services";
import { getContent } from "@/lib/i18n";
import { SITE } from "@/lib/content/site";

// Only the known service slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getContent("es").services.find((s) => s.slug === slug);
  if (!service) return {};
  const detail = SERVICE_DETAILS_ES[slug];
  return {
    title: detail?.keyword ?? service.title,
    description: service.short,
    alternates: {
      canonical: `/es/services/${slug}`,
      languages: {
        en: `/services/${slug}`,
        es: `/es/services/${slug}`,
        "x-default": `/services/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "es_MX",
      title: `${service.title} — ${SITE.name}`,
      description: service.short,
      url: `${SITE.url}/es/services/${slug}`,
    },
  };
}

export default async function ServicePageEs({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SERVICES.some((s) => s.slug === slug)) notFound();
  return <ServicePageView locale="es" slug={slug} />;
}
