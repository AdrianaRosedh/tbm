import type { Metadata, Viewport } from "next";
import { Oswald, Orbitron, Fraunces } from "next/font/google";
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

// Bold titles — squared, wide, extended techno caps in the spirit of the
// RICHARD MILLE wordmark (Eurostile/Microgramma family). Powers every big
// heading and the stat counters.
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

// Structural UI — nav, buttons, eyebrows, labels. Condensed so the long nav
// items stay compact; pairs with the wide Orbitron titles.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// The rest of the page — a high-contrast editorial serif with soft wedge
// serifs (Canela / Austin / Noe Display family). Fraunces has true optical
// sizing, so it stays readable as body text. Italic powers emphasis/quotes.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
      className={cn(
        "h-full antialiased",
        orbitron.variable,
        oswald.variable,
        fraunces.variable,
        "font-sans"
      )}
    >
      <body className="flex min-h-full flex-col">
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
