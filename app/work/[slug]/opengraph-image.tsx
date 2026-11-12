import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = site.seo.caseOgImageAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) return new Response(null, { status: 404 });
  return renderOgImage({ eyebrow: study.eyebrow, lines: study.title });
}
