export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: "OKI Digital",
  url: "https://okidigital.co.ke",
  description: "Creative social media and LinkedIn agency, Kenya.",
  skipLink: "Skip to content",
  logoLabel: "OKI Digital, home",
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
