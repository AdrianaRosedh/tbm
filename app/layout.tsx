import type { Metadata, Viewport } from "next";
import { Oswald, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ContactOverlay } from "@/components/site/contact-overlay";
import { HtmlLang } from "@/components/site/html-lang";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SITE } from "@/lib/content/site";

// Bold titles — tall condensed caps in the spirit of the RICHARD MILLE
// wordmark. Oswald maxes at 700; font-black/extrabold classes resolve to it.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// The rest of the page — an elegant high-contrast serif echoing the
// "A Racing Machine On The Wrist" tagline. Italic powers body emphasis/quotes.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
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
  alternates: {
    canonical: SITE.url,
  },
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
        oswald.variable,
        cormorant.variable,
        "font-sans"
      )}
    >
      <body className="flex min-h-full flex-col">
        <HtmlLang />
        <ScrollProgress />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <MobileCtaBar />
        <ContactOverlay />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
