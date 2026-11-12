import { site } from "@/content/site";
import { Highlighted } from "@/components/ui/Highlighted";
import { Container } from "@/components/ui/Container";

export function LeaderQuotes() {
  const { title, quotes, swipeHint, quotesLabel } = site.leaders;
  return (
    <section
      id="leaders"
      aria-labelledby="leaders-title"
      className="scroll-mt-20 bg-paper py-section-mobile md:py-section"
    >
      <Container>
        <h2 id="leaders-title" className="type-display mb-14 text-section-title">
          <Highlighted {...title} />
        </h2>
      </Container>
      {/* Phones: horizontal swipe with snap. md+: three-column grid. */}
      <Container>
        <ul
          aria-label={quotesLabel}
          tabIndex={0}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0"
        >
          {quotes.map((quote) => (
            <li key={quote.role} className="w-[85%] shrink-0 snap-start md:w-auto">
              <figure className="flex h-full flex-col justify-between gap-6 border border-line bg-white p-8">
                <blockquote className="text-[20px] leading-normal">“{quote.text}”</blockquote>
                <figcaption className="text-[14px] uppercase tracking-[0.08em] text-muted-soft">
                  {quote.role}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-muted-soft md:hidden" aria-hidden="true">
          {swipeHint}
        </p>
      </Container>
    </section>
  );
}
