import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { CaseHero } from "@/components/case-study/CaseHero";
import { FounderProfile } from "@/components/case-study/FounderProfile";
import { LeaderCards } from "@/components/case-study/LeaderCards";
import { NextCase } from "@/components/case-study/NextCase";
import { Quote } from "@/components/case-study/Quote";
import { StatBand } from "@/components/case-study/StatBand";
import { Story } from "@/components/case-study/Story";
import { WorkGrid } from "@/components/case-study/WorkGrid";
import { JsonLd } from "@/components/JsonLd";
import { TrackEvent } from "@/components/TrackEvent";
import { EVENTS } from "@/lib/analytics";
import { pageMetadata } from "@/lib/seo";
import { caseStudyJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

// Only the slugs below exist; anything else is a 404 at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return pageMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: `/work/${study.slug}`,
    type: "article",
    defaultImage: false, // ./opengraph-image.tsx renders one per case study
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const next = getNextCaseStudy(study.slug);

  return (
    <>
      <JsonLd data={caseStudyJsonLd(study)} />
      <TrackEvent name={EVENTS.caseStudyView} props={{ slug: study.slug }} />
      <CaseHero study={study} />
      <StatBand stats={study.stats} />
      {study.variant === "standard" ? (
        <>
          <Story story={study.story} />
          <WorkGrid id="work-title" title={site.caseStudy.workTitle} rows={study.work} />
          <Quote quote={study.quote} />
        </>
      ) : (
        <>
          <LeaderCards leaders={study.leaders} />
          <FounderProfile founder={study.founder} />
          <WorkGrid
            id="analytics-title"
            title={study.analytics.title}
            intro={study.analytics.intro}
            rows={study.analytics.rows}
            tone="sand"
          />
        </>
      )}
      <NextCase next={next} />
    </>
  );
}
