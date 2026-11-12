import type { Metadata } from "next";
import { privacy } from "@/content/privacy";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...privacy.seo, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <article aria-labelledby="privacy-title" className="bg-paper py-section-mobile md:py-section">
      <Container className="flex flex-col gap-12">
        <header className="flex flex-col gap-6 border-b border-line pb-10">
          <p className="type-label text-muted">{privacy.eyebrow}</p>
          <h1 id="privacy-title" className="type-display text-section-title">
            {privacy.title}
          </h1>
          <p className="text-[14px] text-muted">
            {privacy.updated.label}: <time dateTime={privacy.updated.date}>{privacy.updated.display}</time>
          </p>
          <p className="max-w-[68ch] text-body-md md:text-body-lg md:leading-[1.55]">{privacy.intro}</p>
        </header>

        <div className="flex flex-col gap-12">
          {privacy.sections.map((section) => (
            <section key={section.title} className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
              <h2 className="font-display text-[26px] font-extrabold uppercase leading-tight [font-stretch:85%]">
                {section.title}
              </h2>
              <div className="flex max-w-[68ch] flex-col gap-4 text-body-md leading-[1.6] text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
          <section className="grid gap-4 border-t border-line pt-10 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 className="font-display text-[26px] font-extrabold uppercase leading-tight [font-stretch:85%]">
              {privacy.contact.title}
            </h2>
            <p className="text-body-md text-muted">
              {privacy.contact.body}{" "}
              <a href={privacy.contact.email.href} className="text-ink underline underline-offset-4 hover:text-brand">
                {privacy.contact.email.label}
              </a>
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
