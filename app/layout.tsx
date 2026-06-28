import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ContactOverlay } from "@/components/site/contact-overlay";
import { HtmlLang } from "@/components/site/html-lang";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SkipLink } from "@/components/site/skip-link";
import { SITE } from "@/lib/content/site";

// One grotesk for the entire system — Inter (variable, full weight range).
// Hierarchy is carried by weight + tracking, not by switching families:
// heavy + tight-tracked display, light + neutral body. The goal is a precise,
// "infrastructure-platform" feel rather than a freight-template look.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "cross-border logistics",
    "US Mexico freight",
    "C-TPAT carrier",
    "FAST carrier",
    "intermodal logistics",
    "USMCA freight",
    "Laredo trucking",
    "asset-based carrier",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_MX"],
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // No layout-level canonical: each route sets its own (a shared canonical
  // would make every sub-page canonicalize to the homepage). metadataBase
  // resolves the per-page relative canonicals below.
};

// Dark brand chrome on mobile browsers (address bar / status bar).
export const viewport: Viewport = {
  themeColor: "#0f0b26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", inter.variable, playfair.variable, "font-sans")}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <JsonLd />
        <HtmlLang />
        <SkipLink />
        <ScrollProgress />
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <MobileCtaBar />
        <ContactOverlay />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
