import type { Metadata } from "next";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";
import { AgencyOS } from "@/components/sections/AgencyOS";
import { Approach } from "@/components/sections/Approach";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Lanes } from "@/components/sections/Lanes";
import { LeaderQuotes } from "@/components/sections/LeaderQuotes";
import { Results } from "@/components/sections/Results";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = pageMetadata({ ...site.seo.home, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <ClientMarquee />
      <Results />
      <SelectedWork />
      <Lanes />
      <Approach />
      <Services />
      <AgencyOS />
      <LeaderQuotes />
      <Contact />
    </>
  );
}
