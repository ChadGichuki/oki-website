import { site } from "@/content/site";
import type { StandardCaseStudy } from "@/content/types";
import { Container } from "@/components/ui/Container";

const rowClass = "grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12";
const headingClass = "type-display text-[clamp(40px,5vw,56px)] leading-[0.95]";
const bodyClass = "text-body-md md:text-body-lg md:leading-[1.55]";

/** The challenge / What we did, with the tactic grid. */
export function Story({ story }: { story: StandardCaseStudy["story"] }) {
  const labels = site.caseStudy.story;
  return (
    <section aria-labelledby="story-challenge" className="bg-paper pb-section-mobile pt-6 md:pb-section">
      <Container className="flex flex-col gap-16 md:gap-24">
        <div className={rowClass}>
          <h2 id="story-challenge" className={headingClass}>
            {labels.challenge}
          </h2>
          <p className={bodyClass}>{story.challenge}</p>
        </div>
        <div className={rowClass}>
          <h2 className={headingClass}>{labels.whatWeDid}</h2>
          <div className="flex flex-col gap-8">
            <p className={bodyClass}>{story.whatWeDid}</p>
            <ul className="grid gap-6 border-t border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {story.tactics.map((tactic) => (
                <li key={tactic.title} className="flex flex-col gap-2">
                  <h3 className="font-display text-[22px] font-extrabold [font-stretch:85%]">{tactic.title}</h3>
                  <p className="text-[15px] leading-normal text-muted">{tactic.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
