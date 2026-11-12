import { site } from "@/content/site";
import type { Quote as QuoteContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";

export function Quote({ quote }: { quote: QuoteContent }) {
  const attribution = [quote.name, quote.role].filter(Boolean).join(" · ");
  return (
    <section aria-label={site.caseStudy.quoteLabel} className="bg-paper py-section-mobile md:py-section">
      <Container>
        <FadeUp as="figure" className="flex max-w-[960px] flex-col gap-8">
          <blockquote className="font-display text-[clamp(28px,4vw,52px)] font-bold leading-[1.15] [font-stretch:90%]">
            “{quote.text}”
          </blockquote>
          <figcaption className="text-[14px] uppercase tracking-[0.1em] text-muted-soft">{attribution}</figcaption>
        </FadeUp>
      </Container>
    </section>
  );
}
