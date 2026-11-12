import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";

const linkClass =
  "inline-flex min-h-btn-md items-center text-muted-dark underline-offset-4 hover:text-paper hover:underline";

function Headline() {
  const { headline, highlight } = site.footer;
  const [before, after] = headline.split(highlight);
  return (
    <p className="type-display max-w-[14ch] text-section-title">
      {before}
      <span className="text-brand">{highlight}</span>
      {after}
    </p>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-paper">
      <Container className="py-section-mobile md:py-section">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Headline />
          <Button href={site.cta.href}>{site.cta.label}</Button>
        </div>

        <div className="mt-16 grid gap-10 border-t border-card pt-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={site.logoLabel} className="inline-flex">
              <Logo tone="paper" />
            </Link>
            <p className="mt-4 max-w-sm text-muted-dark">{site.footer.tagline}</p>
          </div>

          <nav aria-label={site.footer.navHeading}>
            <h2 className="type-label text-brand">{site.footer.navHeading}</h2>
            <ul className="mt-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={site.footer.legalHeading}>
            <h2 className="type-label text-brand">{site.footer.legalHeading}</h2>
            <ul className="mt-3">
              {site.footer.legal.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-card pt-6 text-label-sm uppercase text-muted-dark-soft">
          © {year} {site.footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
