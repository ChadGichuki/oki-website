import { site } from "@/content/site";
import { formatStat } from "@/lib/format";
import { Container } from "@/components/ui/Container";

export function Results() {
  const { label, stats } = site.results;
  return (
    <section aria-labelledby="results-title" className="bg-paper pb-16 pt-section-mobile md:pb-24 md:pt-section">
      <Container>
        <h2 id="results-title" className="type-label mb-12 text-label-lg text-muted-soft">
          {label}
        </h2>
        <dl className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-3 border-b border-line-strong py-8 pr-6">
              <dt className="text-body text-muted">{stat.label}</dt>
              <dd className="type-display text-[44px] leading-none md:text-[72px]">{formatStat(stat)}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
