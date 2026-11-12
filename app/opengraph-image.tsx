import { site } from "@/content/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = site.seo.ogImageAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Default share image for every page without its own. */
export default function Image() {
  return renderOgImage({ eyebrow: site.hero.eyebrow, lines: site.hero.headline });
}
