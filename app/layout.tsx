import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";
import { isPreviewDeployment } from "@/lib/seo";
import "./globals.css";

// Archivo, instanced to wght 700–900 / wdth 75–90 and Latin only (~37 KB vs ~90 KB from
// Google). Rebuild with scripts/subset-archivo.mjs if copy needs new characters.
const archivo = localFont({
  src: "./fonts/archivo-display.woff2",
  weight: "700 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "75% 90%" }],
  fallback: ["Arial Narrow", "sans-serif"],
  adjustFontFallback: "Arial",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.seo.home.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  // Keep Vercel preview deployments out of search results.
  robots: isPreviewDeployment ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Flags JS support before first paint so motion can hide content without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {site.skipLink}
        </a>
        {/* Header + <main id="main"> come from the route-group layouts. */}
        {children}
        <SiteFooter />
        <MotionProvider />
        <Analytics />
      </body>
    </html>
  );
}
