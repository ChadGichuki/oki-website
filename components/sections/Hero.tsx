import { preload } from "react-dom";
import { site } from "@/content/site";
import type { HeadlineLine } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroStage } from "./HeroStage";

function Line({ text, highlight }: HeadlineLine) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const i = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, i)}
      <span className="text-brand">{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}

export function Hero() {
  const { hero } = site;
  // Poster is the likely LCP element; fetch it ahead of the video.
  preload(hero.video.poster, { as: "image", fetchPriority: "high" });

  return (
    <HeroStage
      sources={hero.video.sources}
      mobileSources={hero.video.mobileSources}
      poster={hero.video.poster}
      labelledBy="hero-title"
    >
      <Container className="flex h-full flex-col justify-end pb-16 pt-24 md:pb-24">
        <h1 id="hero-title" className="type-display text-hero">
          {hero.headline.map((line) => (
            <span key={line.text} data-reveal-line className="hero-line block">
              <Line {...line} />
            </span>
          ))}
        </h1>
        <p
          data-reveal-line
          className="hero-line mt-6 max-w-[38rem] text-body-md text-muted-dark md:mt-8 md:text-body-lg"
        >
          {hero.subline}
        </p>
        <div data-reveal-line className="hero-line mt-8 flex flex-wrap gap-3 md:mt-10">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="outline-light" size="lg">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </HeroStage>
  );
}
