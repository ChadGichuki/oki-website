import type { CaseStudy } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Highlighted } from "@/components/ui/Highlighted";
import { MediaSlot } from "@/components/ui/MediaSlot";

export function CaseHero({ study }: { study: CaseStudy }) {
  const { eyebrow, title, intro, facts, heroMedia } = study;
  return (
    <section aria-labelledby="case-title" className="on-dark bg-ink text-paper">
      <Container className={`flex flex-col gap-8 pt-section-mobile md:pt-section ${heroMedia ? "pb-16" : "pb-16 md:pb-24"}`}>
        <p className="type-label text-label-lg text-muted-dark">{eyebrow}</p>
        <h1 id="case-title" className="type-display text-[clamp(44px,9vw,144px)] leading-[0.88]">
          {title.map((line) => (
            <span key={line.text} className="block">
              <Highlighted {...line} />{" "}
            </span>
          ))}
        </h1>
        {intro ? <p className="max-w-[640px] text-body-md text-muted-dark md:text-[20px]">{intro}</p> : null}
        <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-line-dark pt-6 text-[15px] text-muted-dark">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5">
              <dt className="text-[13px] uppercase tracking-[0.1em] text-muted-dark-soft">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
      {heroMedia ? (
        <Container className="pb-16 md:pb-24">
          <MediaSlot
            media={heroMedia.media}
            placeholder={heroMedia.placeholder}
            tone={heroMedia.tone}
            aspect="aspect-[4/3] md:aspect-[16/7]"
            sizes="(min-width: 1280px) 1232px, 100vw"
            className="rounded"
          />
        </Container>
      ) : null}
    </section>
  );
}
