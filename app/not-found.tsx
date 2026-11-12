import type { Metadata } from "next";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: site.seo.notFound.title,
  description: site.seo.notFound.description,
  robots: { index: false },
};

export default function NotFound() {
  const page = site.notFoundPage;
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-paper">
        <Container className="flex flex-col items-start gap-6 py-section-mobile md:py-section">
          <p className="type-label text-label-lg text-muted">{page.eyebrow}</p>
          <h1 className="type-display text-section-title">{page.title}</h1>
          <p className="text-body-md text-muted">{page.body}</p>
          <Button href={page.cta.href}>{page.cta.label}</Button>
        </Container>
      </main>
    </>
  );
}
