import type { CaseStudy, CaseStudySlug } from "../types";
import { linkedin } from "./linkedin";
import { niche } from "./niche";
import { winners } from "./winners";

/** Reading order; "Next case study" loops Winners → Niche → LinkedIn → Winners. */
export const caseStudies: CaseStudy[] = [winners, niche, linkedin];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCaseStudy(slug: CaseStudySlug): CaseStudy {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  // Non-empty array; modulo keeps the index in range.
  return caseStudies[(i + 1) % caseStudies.length]!;
}
