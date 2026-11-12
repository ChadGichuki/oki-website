import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";

const navLinkClass =
  "inline-flex min-h-btn-md items-center text-[15px] font-medium text-ink underline-offset-4 hover:underline";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label={site.logoLabel} className="inline-flex min-h-btn-md items-center">
          <Logo priority />
        </Link>

        <nav aria-label={site.menu.label} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href={site.cta.href} size="md" className="hidden sm:inline-flex">
            {site.cta.label}
          </Button>

          {/* Mobile menu: native disclosure, works without JS */}
          <details className="group lg:hidden">
            <summary className="flex min-h-btn-md cursor-pointer list-none items-center rounded-full border border-ink px-5 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
              {site.menu.open}
            </summary>
            <nav
              aria-label={site.menu.label}
              className="absolute inset-x-0 top-full border-b border-line bg-paper"
            >
              <Container>
                <ul className="flex flex-col py-4">
                  {site.nav.map((item) => (
                    <li key={item.href} className="border-b border-line last:border-b-0">
                      <Link href={item.href} className="type-display flex min-h-[56px] items-center text-[32px]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="pb-6 sm:hidden">
                  <Button href={site.cta.href} className="w-full">
                    {site.cta.label}
                  </Button>
                </div>
              </Container>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
