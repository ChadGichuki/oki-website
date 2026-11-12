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

export interface Stat {
  /** Numeric target for the count-up animation. */
  value: number;
  /** Decimal places to show while counting, defaults to 0. */
  decimals?: number;
  prefix?: string;
  /** e.g. "%", "K", "M", "x". */
  suffix?: string;
  label: string;
  /** Where the number comes from, e.g. "Meta Business Suite, Q2 2026". */
  source?: string;
}

export interface Quote {
  text: string;
  /** Job title / descriptor shown as the attribution, e.g. "Head of Service Delivery, Tier 1 bank". */
  role: string;
  /** Optional: leader quotes are attributed by job title only. */
  name?: string;
  company?: string;
  portrait?: ImageMedia;
}

export interface CaseStudySection {
  heading: string;
  /** Paragraphs of body copy. */
  body: string[];
  media?: MediaItem[];
}

export interface CaseStudy {
  slug: CaseStudySlug;
  client: string;
  /** Display headline; wrap highlight words with `highlight`. */
  title: string;
  /** Words in the title rendered in brand orange. */
  highlight?: string[];
  summary: string;
  services: string[];
  year: number;
  /** Card media on /work listings. */
  cover: MediaItem;
  /** 6s muted clip played on desktop hover over the work card. */
  hoverClip?: VideoMedia;
  /** Full-bleed media at the top of the case study. */
  hero: MediaItem;
  stats: Stat[];
  quote?: Quote;
  sections: CaseStudySection[];
  seo: {
    title: string;
    description: string;
  };
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

export interface WorkCard {
  slug: CaseStudySlug;
  /** Small uppercase line above the title. */
  eyebrow: string;
  title: string;
  /** Extra detail, shown on the featured card only. */
  meta?: string;
  media?: MediaItem;
  /** 6s muted clip for desktop hover (motion pass). */
  hoverClip?: VideoMedia;
  /** Shown in the media slot until real client media lands. */
  placeholder: string;
  placeholderTone?: "card" | "brand";
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
