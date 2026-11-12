import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Path from the site root, e.g. "/work/winners". */
  path: string;
  type?: "website" | "article";
  /** Use the title as-is instead of the "%s · OKI Digital" template. */
  absoluteTitle?: boolean;
  /**
   * Set false when the route has its own opengraph-image file. Otherwise the site-wide
   * image is attached explicitly: a page that sets openGraph loses images inherited
   * from a parent segment's opengraph-image file.
   */
  defaultImage?: boolean;
};

const DEFAULT_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: site.seo.ogImageAlt, type: "image/png" };

/**
 * Full metadata for one page. Next merges openGraph/twitter shallowly, so every
 * page sets them in full rather than relying on the root layout.
 * Share images come from the opengraph-image files.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  defaultImage = true,
}: PageMetaInput): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  const images = defaultImage ? [DEFAULT_IMAGE] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: shareTitle,
      description,
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, ...(images ? { images } : {}) },
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

/** True on Vercel preview/development deployments, which should stay out of search. */
export const isPreviewDeployment = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";
