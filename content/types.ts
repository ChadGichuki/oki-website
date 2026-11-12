/**
 * Content model for the OKI site. All copy lives in /content and is typed here.
 * Client media must be real — never AI-generated (see CLAUDE.md → Rules).
 */

export type CaseStudySlug = "winners" | "niche" | "linkedin";

export interface ImageMedia {
  kind: "image";
  /** Path under /public or a remote URL allowed in next.config. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional caption shown under the media. */
  caption?: string;
}

export interface VideoSource {
  src: string;
  /** MIME type, e.g. "video/mp4" or "video/webm". */
  type: string;
}

export interface VideoMedia {
  kind: "video";
  /** 16:9 sources for desktop. */
  sources: VideoSource[];
  /** Optional 9:16 sources for phones. */
  mobileSources?: VideoSource[];
  /** AVIF/WebP poster frame, < 80 KB. */
  poster: string;
  /** Text alternative describing what the video shows. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export type MediaItem = ImageMedia | VideoMedia;

interface StatBase {
  label: string;
  /** Where the number comes from, e.g. "Meta Business Suite, Q2 2026". */
  source?: string;
}

/** Numeric stat: counts up in the motion pass. */
export interface NumericStat extends StatBase {
  value: number;
  /** Decimal places to show while counting, defaults to 0. */
  decimals?: number;
  prefix?: string;
  /** e.g. "%", "K", "M", "x". */
  suffix?: string;
}

/** Word stat, e.g. "Offers": shown as is, never animated. */
export interface TextStat extends StatBase {
  text: string;
}

export type Stat = NumericStat | TextStat;

export interface Quote {
  text: string;
  /** Job title / descriptor shown as the attribution, e.g. "Head of Service Delivery, Tier 1 bank". */
  role: string;
  /** Optional: leader quotes are attributed by job title only. */
  name?: string;
  company?: string;
  portrait?: ImageMedia;
}

export interface HeadlineLine {
  text: string;
  /** Substring of `text` rendered in brand orange. */
  highlight?: string;
}

export interface HeroContent {
  eyebrow: string;
  /** Each entry is one revealed line of the h1. */
  headline: HeadlineLine[];
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** 16:9 `sources` for desktop, 9:16 `mobileSources` for phones. */
  video: VideoMedia & { mobileSources: VideoSource[] };
}

export interface Link {
  label: string;
  href: string;
}

/** Text with an optional substring rendered in brand orange. */
export interface HighlightText {
  text: string;
  highlight?: string;
}

export interface WorkCard extends MediaTile {
  slug: CaseStudySlug;
  /** Small uppercase line above the title. */
  eyebrow: string;
  title: string;
  /** Extra detail, shown on the featured card only. */
  meta?: string;
  /** 6s muted clip for desktop hover (motion pass). */
  hoverClip?: VideoMedia;
}

export interface Lane {
  eyebrow: string;
  title: string;
  body: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Service {
  name: string;
  detail: string;
}

export interface Feature {
  title: string;
  body: string;
}

export interface FormField {
  name: string;
  label: string;
}

export interface SelectField extends FormField {
  options: string[];
}

/** A media frame that shows a flat labelled placeholder until real media lands. */
export interface MediaTile {
  media?: MediaItem;
  placeholder: string;
  tone?: "card" | "brand";
}

export interface CaseFact {
  label: string;
  value: string;
}

export interface TileRow {
  /** Tailwind aspect class, e.g. "aspect-[9/16]". */
  aspect: string;
  tiles: MediaTile[];
}

export interface LeaderStory {
  /** Job title only, never a name. */
  role: string;
  challenge: string;
  whatWeDid: string;
  outcome: string;
  quote: string;
}

interface CaseStudyBase {
  slug: CaseStudySlug;
  /** Used by the previous study's "Next case study" link. */
  nextTitle: string;
  eyebrow: string;
  /** Two display lines; `highlight` renders in brand orange. */
  title: HeadlineLine[];
  intro?: string;
  facts: CaseFact[];
  heroMedia?: MediaTile;
  stats: Stat[];
  seo: { title: string; description: string };
}

export interface StandardCaseStudy extends CaseStudyBase {
  variant: "standard";
  story: {
    challenge: string;
    whatWeDid: string;
    tactics: Feature[];
  };
  work: TileRow[];
  quote: Quote;
}

export interface LeadersCaseStudy extends CaseStudyBase {
  variant: "leaders";
  leaders: { title: string; items: LeaderStory[] };
  founder: {
    eyebrow: string;
    title: string;
    body: string;
    cta: Link;
    screenshot: MediaTile;
  };
  analytics: { title: string; intro: string; rows: TileRow[] };
}

export type CaseStudy = StandardCaseStudy | LeadersCaseStudy;
