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

export default function HomePage() {
  return (
    <>
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
