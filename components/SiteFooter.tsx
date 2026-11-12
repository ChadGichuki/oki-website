import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-paper">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-dark py-8 text-[14px] text-muted-dark-soft">
        <span className="inline-flex items-center gap-3">
          <Logo variant="mark" />
          <span>
            © {year} {site.footer.copyright}
          </span>
        </span>
        <nav aria-label={site.footer.linksLabel}>
          <ul className="flex flex-wrap gap-6">
            {site.footer.links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-btn-md items-center text-muted-dark underline-offset-4 hover:text-paper hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        </div>
      </Container>
    </footer>
  );
}
