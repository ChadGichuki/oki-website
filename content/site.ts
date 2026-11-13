/**
 * All site copy. Source: OKI Digital Website — Design Concept (canvas), Homepage — desktop.
 * [Bracketed] values are placeholders still to be supplied.
 */
import type {
  Feature,
  HeroContent,
  HighlightText,
  ImageMedia,
  Lane,
  Link,
  Quote,
  SelectField,
  Service,
  Stat,
  Step,
  WorkCard,
  FormField,
} from "./types";

export type NavLink = Link;

/**
 * PREVIEW media: a 5s 16:9 neon-bulb test clip, served locally. Before launch, move the
 * final cut to the CDN, add a WebM and a 9:16 phone cut (phones crop this one to centre).
 * Budget: first segment < 3 MB, poster AVIF/WebP < 80 KB.
 */
const hero: HeroContent = {
  eyebrow: "Creative social media and LinkedIn agency · Kenya",
  headline: [
    { text: "Content that sells.", highlight: "sells." },
    { text: "Communities that stay." },
  ],
  subline: "Creative social media that builds community, reach and a real sales pipeline.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "See the work", href: "/#work" },
  video: {
    kind: "video",
    sources: [{ src: "/media/hero/hero-video.mp4", type: "video/mp4" }],
    mobileSources: [],
    // Bulb shrinks 2.8s → 4.5s in this cut; text starts at 2.9s and lands ~4.4s.
    revealAt: 2.9,
    poster: "/media/hero/poster.webp",
    alt: "An orange neon light bulb draws itself line by line on a black background, then glows.",
    width: 1920,
    height: 1080,
  },
};

const clients = {
  label: "Clients",
  // TODO: replace [Client logo] entries with real client names or logos.
  names: [
    "Winners Dairy Products",
    "Niche Barbershop & Spa",
    "[Client logo]",
    "[Client logo]",
    "[Client logo]",
  ],
};

const results = {
  label: "Results, not activity",
  stats: [
    { prefix: "KES ", value: 1, suffix: "M", label: "monthly digital sales for Winners, up from zero" },
    { value: 10, suffix: "M+", label: "people reached by Winners content in two years" },
    { prefix: "+", value: 65, suffix: "%", label: "walk-in clients for Niche after one campaign" },
    { value: 1000, suffix: "+", label: "posts produced for 10+ brands and 10+ professionals" },
  ] satisfies Stat[],
};

const work = {
  title: "Selected work",
  intro: "Real clients, real numbers. Every case study starts with the problem and ends with the result.",
  featured: {
    slug: "winners",
    eyebrow: "Winners Dairy Products · Ndumberi Dairies",
    title: "From no online sales to KES 1M a month",
    meta: "TikTok · Facebook · LinkedIn — 2+ years",
    // INSPO (branch feat/inspo only): replace the file with a real shoot still.
    media: {
      kind: "image",
      src: "/media/work/winners-card.jpg",
      alt: "Inspiration placeholder: content creator filming dairy plant workers holding yoghurt bottles.",
      width: 1344,
      height: 672,
    },
    placeholder: "[ Winners — on-site shoot still; hover plays a 6s clip ]",
  } satisfies WorkCard,
  cards: [
    {
      slug: "niche",
      eyebrow: "Niche Barbershop & Spa · Westlands",
      title: "The best sales month in its history",
      media: {
        kind: "image",
        src: "/media/work/niche-card.jpg",
        alt: "Niche Mother's Day poster: a young woman and her mother in spa robes and towel wraps, offering 20% off sauna and steam bath.",
        width: 1080,
        height: 1350,
      },
      placeholder: "[ Niche — influencer campaign still ]",
    },
    {
      slug: "linkedin",
      eyebrow: "LinkedIn · founders and executives",
      title: "Leaders people listen to",
      media: {
        kind: "image",
        src: "/media/work/linkedin-card.jpg",
        alt: "Inspiration placeholder: collage of LinkedIn post analytics screenshots on orange.",
        width: 896,
        height: 1120,
      },
      placeholder: "[ Collage of LinkedIn post analytics ]",
      tone: "brand",
    },
  ] satisfies WorkCard[],
};

const lanes = {
  label: "Who we work with",
  items: [
    {
      eyebrow: "For brands",
      title: "Be as visible as the market leaders",
      body: "For consumer brands that need content that connects, a community that grows, and marketing spend that shows a return.",
    },
    {
      eyebrow: "For leaders",
      title: "Become the voice of your field",
      body: "For founders and executives who want a LinkedIn presence that builds credibility, opens doors and fills a pipeline.",
    },
  ] satisfies Lane[],
};

const approach = {
  title: "How we work",
  steps: [
    { title: "Discovery", body: "Your problem and what you want to achieve." },
    { title: "Audit", body: "Your social media, digital presence and brand." },
    { title: "Research", body: "Your industry, benchmarks and trends." },
    { title: "Strategy", body: "A plan built from the findings and your brief." },
    { title: "Execution", body: "Content, posts and campaigns, every week." },
  ] satisfies Step[],
};

const services = {
  title: "What we do",
  intro:
    "Every engagement is shaped around your goals. Tell us what you need and we will send a proposal within 24 hours.",
  items: [
    { name: "Social media management", detail: "Strategy, content, community" },
    { name: "LinkedIn optimisation & management", detail: "Profiles, posts, thought leadership" },
    { name: "Ads management", detail: "Paid campaigns and influencers" },
    { name: "Calendar & content management", detail: "Planning, shoots, approvals" },
    { name: "Consultation", detail: "Audits and strategy sessions" },
  ] satisfies Service[],
  extras: ["Also: SEO", "Website management"],
};

const agencyOs = {
  eyebrow: "Included when you work with us",
  title: "OKI Agency OS",
  body: "No more chasing approvals on WhatsApp and email. Every client gets a private portal to review content, see what's going out and when, and keep track of invoices.",
  features: [
    { title: "Approve in one place", body: "Review drafts, comment and approve several posts at once." },
    { title: "See your calendar", body: "Every scheduled post across your brands, by week or month." },
    { title: "Full history", body: "Every version and approval kept, so nothing gets lost." },
    { title: "Invoices and payments", body: "See invoices and download PDFs any time." },
  ] satisfies Feature[],
  badge: "Coming soon",
  badgeText: "AI features that learn your brand",
  demo: {
    // TODO: Agency OS v1 screen recording (muted loop) + poster.
    media: {
      kind: "image",
      src: "/media/agency-os/demo-poster.webp",
      alt: "Inspiration placeholder: Agency OS client portal with a content calendar and a post awaiting approval.",
      width: 1203,
      height: 752,
    } satisfies ImageMedia,
    placeholder: "[ Agency OS v1 demo video — screen recording, muted loop ]",
    caption: "Agency OS v1 · client portal",
  },
};

const leaders = {
  title: { text: "Leaders on LinkedIn", highlight: "LinkedIn" } satisfies HighlightText,
  swipeHint: "Swipe for 2 more →",
  quotesLabel: "Quotes from leaders",
  quotes: [
    {
      text: "The work that OKI did was remarkable. It speaks for itself.",
      role: "Head of Service Delivery, Tier 1 bank",
    },
    {
      text: "I had a great experience working with them. They were very accommodating of my busy schedule.",
      role: "Principal Officer, fund management firm",
    },
    {
      text: "They truly understand exactly what I need my LinkedIn to do for me.",
      role: "PhD researcher, United States",
    },
  ] satisfies Quote[],
};

const contact = {
  title: { text: "Let's build your pipeline.", highlight: "pipeline." } satisfies HighlightText,
  body: "Tell us about your brand. We reply by email within 24 hours with next steps or a proposal.",
  whatsapp: { label: "WhatsApp or call: +254 714 964800", href: "https://wa.me/254714964800" } satisfies Link,
  credentials: { label: "Download our credentials (PDF)", href: "/credentials.pdf" } satisfies Link,
  form: {
    label: "Project enquiry",
    fields: {
      name: { name: "name", label: "Name" },
      email: { name: "email", label: "Email" },
      company: { name: "company", label: "Company" },
      message: { name: "message", label: "What do you want to achieve?" },
    } satisfies Record<string, FormField>,
    service: {
      name: "service",
      label: "Service",
      options: ["Social media management", "LinkedIn for leaders", "Ads management", "Consultation", "Not sure yet"],
    } satisfies SelectField,
    budget: {
      name: "budget",
      label: "Monthly budget (optional)",
      // TODO: real budget ranges.
      options: ["Prefer not to say", "[Budget range 1]", "[Budget range 2]", "[Budget range 3]"],
    } satisfies SelectField,
    submit: "Send message",
    sending: "Sending…",
    whatsapp: { label: "WhatsApp us", href: "https://wa.me/254714964800" } satisfies Link,
    // Hidden from people; bots that fill every field trip it.
    honeypot: { name: "website", label: "Leave this field empty" },
    privacyNote: { before: "We only use your details to reply to you. See our ", link: { label: "privacy notice", href: "/privacy" } satisfies Link, after: "." },
    messages: {
      success: {
        title: "Message sent.",
        body: "Thanks. We reply by email within 24 hours with next steps or a proposal.",
        again: "Send another message",
      },
      invalid: "Please check the highlighted fields.",
      tooFast: "That was quick. Please check your details and send again.",
      rateLimited: "Too many messages from your connection. Please try again in a few minutes, or email info@okidigital.co.ke.",
      failed: "We couldn't send your message. Please try again, or email info@okidigital.co.ke.",
      noScript: "Your browser blocked part of the form. Please email info@okidigital.co.ke or WhatsApp us instead.",
      fields: {
        name: "Enter your name.",
        email: "Enter a valid email address.",
        message: "Tell us a little about what you want to achieve (at least 10 characters).",
        tooLong: "This is too long.",
      },
    },
  },
};

const caseStudy = {
  backLink: { label: "← All work", href: "/#work" } satisfies Link,
  heroLabel: "Overview",
  statsLabel: "Results",
  story: { challenge: "The challenge", whatWeDid: "What we did" },
  workTitle: "The work",
  quoteLabel: "Client quote",
  leaderRows: { challenge: "Challenge", whatWeDid: "What we did", outcome: "Outcome" },
  next: { label: "Next case study" },
};

export const site = {
  name: "OKI Digital",
  url: "https://okidigital.co.ke",
  description: "Creative social media and LinkedIn agency, Kenya.",
  locale: "en_KE",
  seo: {
    home: {
      title: "OKI Digital · Creative social media and LinkedIn agency in Kenya",
      description:
        "OKI Digital is a Kenyan creative agency building community, reach and a real sales pipeline through social media and LinkedIn for brands and leaders.",
    },
    ogImageAlt: "OKI Digital: Content that sells. Communities that stay.",
    caseOgImageAlt: "OKI Digital case study",
    notFound: {
      title: "Page not found",
      description: "This page doesn't exist. Head back to the OKI Digital homepage.",
    },
  },
  organization: {
    legalName: "OKI Digital",
    email: "info@okidigital.co.ke",
    telephone: "+254714964800",
    logo: "/brand/oki-logo.png",
    addressCountry: "KE",
    areaServed: "KE",
    // TODO: add the LinkedIn, Instagram and TikTok profile URLs (same as the footer TODO).
    sameAs: [] as string[],
  },
  notFoundPage: {
    eyebrow: "404",
    title: "Page not found.",
    body: "The page you're looking for has moved or never existed.",
    cta: { label: "Back to the homepage", href: "/" } satisfies Link,
  },
  skipLink: "Skip to content",
  logoAlt: "OKI Digital",
  logoLabel: "OKI Digital, home",
  hero,
  clients,
  results,
  work,
  lanes,
  approach,
  services,
  agencyOs,
  leaders,
  contact,
  caseStudy,
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
    copyright: "OKI Digital",
    linksLabel: "Footer",
    links: [
      { label: "Privacy", href: "/privacy" },
      // TODO: add real profile URLs: LinkedIn, Instagram, TikTok (canvas lists all three).
    ] satisfies NavLink[],
  },
} as const;
