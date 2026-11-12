import type { MetadataRoute } from "next";
import { absoluteUrl, isPreviewDeployment } from "@/lib/seo";

/** Production is open to crawlers; Vercel previews are not. */
export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
