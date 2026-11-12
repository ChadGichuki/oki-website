import { preload } from "react-dom";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Highlighted } from "@/components/ui/Highlighted";
import { Container } from "@/components/ui/Container";
import { HeroStage } from "./HeroStage";

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
      <Container className="flex min-h-svh flex-col justify-end pb-16 pt-24 md:pb-24">
        <p data-reveal-line className="hero-line type-label mb-10 flex items-center gap-2.5 text-label-lg text-muted-dark">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
          {hero.eyebrow}
        </p>
        <h1 id="hero-title" className="type-display text-[clamp(40px,13.5vw,64px)] leading-[0.88] tracking-[-0.01em] sm:text-hero">
          {hero.headline.map((line) => (
            <span key={line.text} data-reveal-line className="hero-line block">
              <Highlighted {...line} />{" "}
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
