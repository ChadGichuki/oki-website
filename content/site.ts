import type { HeroContent } from "./types";

export interface NavLink {
  label: string;
  href: string;
}

/**
 * PLACEHOLDER media: swap for the real OKI hero cut (lit bulb) before launch.
 * Budget: first segment < 3 MB, poster AVIF/WebP < 80 KB.
 */
const hero: HeroContent = {
  headline: [
    { text: "Content that sells.", highlight: "sells." },
    { text: "Communities that stay." },
  ],
  subline:
    "Social media and LinkedIn for Kenyan brands and the leaders behind them. Strategy, production and community, run as one team.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "See the work", href: "/#work" },
  video: {
    kind: "video",
    sources: [
      { src: "/media/hero/hero-16x9.webm", type: "video/webm" },
      { src: "/media/hero/hero-16x9.mp4", type: "video/mp4" },
    ],
    mobileSources: [
      { src: "/media/hero/hero-9x16.webm", type: "video/webm" },
      { src: "/media/hero/hero-9x16.mp4", type: "video/mp4" },
    ],
    poster: "/media/hero/poster.avif",
    alt: "A single light bulb flickers on in a dark room.",
    width: 1920,
    height: 1080,
  },
};

export const site = {
  name: "OKI Digital",
  url: "https://okidigital.co.ke",
  description: "Creative social media and LinkedIn agency, Kenya.",
  skipLink: "Skip to content",
  logoLabel: "OKI Digital, home",
  hero,
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Approach", href: "/#approach" },
    { label: "Services", href: "/#services" },
    { label: "For leaders", href: "/#leaders" },
    { label: "Agency OS", href: "/#agency-os" },
  ] satisfies NavLink[],
  cta: { label: "Start a project", href: "/#contact" } satisfies NavLink,
  menu: {
    open: "Menu",
    label: "Main",
  },
  footer: {
    headline: "Let's make something people stop for.",
    highlight: "stop",
    tagline: "Creative social media and LinkedIn agency, Kenya.",
    navHeading: "Site",
    legalHeading: "More",
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Credentials (PDF)", href: "/credentials.pdf" },
    ] satisfies NavLink[],
    copyright: "OKI Digital. All rights reserved.",
  },
} as const;
