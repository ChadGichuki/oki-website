import Link from "next/link";
import { site } from "@/content/site";
import type { CaseStudy } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function NextCase({ next }: { next: CaseStudy }) {
  return (
    <section aria-labelledby="next-case" className="on-dark border-t border-line-dark bg-ink text-paper">
      <Container className="flex flex-wrap items-end justify-between gap-8 py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <h2 id="next-case" className="type-label text-label-lg text-muted-dark-soft">
            {site.caseStudy.next.label}
          </h2>
          <Link
            href={`/work/${next.slug}`}
            className="type-display text-[clamp(40px,6vw,80px)] text-paper underline-offset-8 hover:text-brand hover:underline"
          >
            {next.nextTitle} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Button href={site.cta.href}>{site.cta.label}</Button>
      </Container>
    </section>
  );
}
