import Link from "next/link";
import { site } from "@/content/site";
import type { WorkCard } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { FadeUp } from "@/components/motion/FadeUp";
import { HoverClip } from "@/components/motion/HoverClip";
import { RevealLines } from "@/components/motion/RevealLines";

function Card({ card, featured = false }: { card: WorkCard; featured?: boolean }) {
  return (
    <Link
      href={`/work/${card.slug}`}
      className={`group flex flex-col gap-5 text-ink ${featured ? "md:col-span-2" : ""}`}
    >
      <MediaSlot
        media={card.media}
        placeholder={card.placeholder}
        tone={card.tone}
        aspect={featured ? "aspect-[4/3] md:aspect-[2/1]" : "aspect-[4/5]"}
        sizes={featured ? "(min-width: 1280px) 1232px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        className="rounded"
        zoom
        overlay={card.hoverClip ? <HoverClip clip={card.hoverClip} /> : undefined}
      />
      <div className={featured ? "flex flex-wrap items-baseline justify-between gap-4" : "flex flex-col gap-2"}>
        <div className="flex flex-col gap-2">
          <p className="type-label text-label-lg text-muted-soft">{card.eyebrow}</p>
          <h3
            className={`font-display font-extrabold leading-[1.05] [font-stretch:80%] group-hover:underline group-hover:underline-offset-4 ${
              featured ? "text-[32px] md:text-[40px]" : "text-[28px] md:text-[32px]"
            }`}
          >
            {card.title}
          </h3>
        </div>
        {featured && card.meta ? <p className="text-[14px] text-muted">{card.meta}</p> : null}
      </div>
    </Link>
  );
}

export function SelectedWork() {
  const { title, intro, featured, cards } = site.work;
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 bg-paper pb-section-mobile pt-6 md:pb-section">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <RevealLines>
            <h2 id="work-title" className="type-display text-section-title">
              {title}
            </h2>
          </RevealLines>
          <p className="max-w-[380px] text-body text-muted">{intro}</p>
        </div>
        <FadeUp stagger className="grid gap-8 md:grid-cols-2">
          <Card card={featured} featured />
          {cards.map((card) => (
            <Card key={card.slug} card={card} />
          ))}
        </FadeUp>
      </Container>
    </section>
  );
}
