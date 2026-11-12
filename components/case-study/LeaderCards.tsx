import { site } from "@/content/site";
import type { LeadersCaseStudy } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { RevealLines } from "@/components/motion/RevealLines";

export function LeaderCards({ leaders }: { leaders: LeadersCaseStudy["leaders"] }) {
  const rows = site.caseStudy.leaderRows;
  return (
    <section aria-labelledby="leaders-title" className="bg-paper pb-section-mobile pt-6 md:pb-section">
      <Container className="flex flex-col gap-12">
        <RevealLines>
          <h2 id="leaders-title" className="type-display text-section-title">
            {leaders.title}
          </h2>
        </RevealLines>
        <FadeUp as="ol" stagger className="grid gap-6 lg:grid-cols-3">
          {leaders.items.map((leader, i) => (
            <li key={leader.role}>
              <article className="flex h-full flex-col gap-5 border border-line bg-white p-6 md:p-8">
                <span className="font-display text-[18px] font-extrabold" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[26px] font-extrabold leading-[1.1] [font-stretch:85%] md:text-[28px]">
                  {leader.role}
                </h3>
                <dl>
                  {(
                    [
                      [rows.challenge, leader.challenge],
                      [rows.whatWeDid, leader.whatWeDid],
                      [rows.outcome, leader.outcome],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-1 border-t border-line py-3.5">
                      <dt className="text-[12px] uppercase tracking-[0.1em] text-muted-soft">{label}</dt>
                      <dd className="text-body">{value}</dd>
                    </div>
                  ))}
                </dl>
                <blockquote className="mt-auto border-t-2 border-ink pt-5 text-[19px] leading-normal">
                  “{leader.quote}”
                </blockquote>
              </article>
            </li>
          ))}
        </FadeUp>
      </Container>
    </section>
  );
}
