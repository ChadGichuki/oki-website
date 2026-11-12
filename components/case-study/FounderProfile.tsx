import type { LeadersCaseStudy } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section } from "@/components/ui/Section";

export function FounderProfile({ founder }: { founder: LeadersCaseStudy["founder"] }) {
  const { eyebrow, title, body, cta, screenshot } = founder;
  return (
    <Section tone="ink" labelledBy="founder-title">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col items-start gap-6">
          <p className="type-label text-label-lg text-brand">{eyebrow}</p>
          <h2 id="founder-title" className="type-display text-[clamp(44px,6vw,88px)]">
            {title}
          </h2>
          <p className="text-body-md text-muted-dark">{body}</p>
          <Button href={cta.href} external>
            {cta.label}
          </Button>
        </div>
        {/* Decorative duplicate of the CTA target: kept out of the tab order. */}
        <a href={cta.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="block">
          <MediaSlot
            media={screenshot.media}
            placeholder={screenshot.placeholder}
            tone={screenshot.tone}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 680px, 100vw"
            className="rounded-lg border border-line-dark"
          />
        </a>
      </div>
    </Section>
  );
}
