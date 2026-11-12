import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { privacy } from "@/content/privacy";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
      ...(study.seo.modified ?? study.seo.published ? { lastModified: study.seo.modified ?? study.seo.published } : {}),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/privacy"), lastModified: privacy.updated.date, changeFrequency: "yearly", priority: 0.2 },
  ];
}
