import { site } from "@/content/site";
import type { CaseStudy } from "@/content/types";
import { absoluteUrl } from "./seo";

const ORG_ID = `${site.url}/#organization`;

export function organizationJsonLd() {
  const org = site.organization;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: org.legalName,
    url: site.url,
    logo: absoluteUrl(org.logo),
    description: site.seo.home.description,
    email: org.email,
    telephone: org.telephone,
    address: { "@type": "PostalAddress", addressCountry: org.addressCountry },
    areaServed: org.areaServed,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: org.email,
      telephone: org.telephone,
      availableLanguage: ["en"],
    },
    ...(org.sameAs.length ? { sameAs: org.sameAs } : {}),
  };
}

export function caseStudyJsonLd(study: CaseStudy) {
  const url = absoluteUrl(`/work/${study.slug}`);
  const publisher = { "@type": "Organization", "@id": ORG_ID, name: site.name, logo: absoluteUrl(site.organization.logo) };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.seo.title,
    description: study.seo.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/work/${study.slug}/opengraph-image`),
    author: publisher,
    publisher,
    ...(study.seo.published ? { datePublished: study.seo.published } : {}),
    ...(study.seo.modified ? { dateModified: study.seo.modified } : {}),
  };
}
