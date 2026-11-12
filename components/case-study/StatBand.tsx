import { site } from "@/content/site";
import type { Stat } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";

export function StatBand({ stats }: { stats: Stat[] }) {
  // Canvas: 88px for a row of three, 72px for a row of four.
  const four = stats.length > 3;
  return (
    <section aria-label={site.caseStudy.statsLabel} className="bg-paper py-16 md:py-24">
      <Container>
        <dl className={`grid border-t border-ink sm:grid-cols-2 ${four ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-3 py-8 pr-6">
              <dt className="text-body text-muted">{stat.label}</dt>
              <dd
                className={`type-display leading-none ${four ? "text-[56px] md:text-[72px]" : "text-[56px] md:text-[88px]"}`}
              >
                <CountUp stat={stat} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
