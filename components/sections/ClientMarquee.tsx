import { site } from "@/content/site";

function Separator() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
      </g>
    </svg>
  );
}

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-[72px] pr-[72px]" aria-hidden={hidden || undefined}>
      {site.clients.names.map((name, i) => (
        <li key={`${name}-${i}`} className="flex items-center gap-[72px] whitespace-nowrap">
          <span>{name}</span>
          <Separator />
        </li>
      ))}
    </ul>
  );
}

/**
 * Client strip. Static for now; the second row is the duplicate the 38s
 * marquee loop will translate into view (motion pass).
 */
export function ClientMarquee() {
  return (
    <section aria-label={site.clients.label} className="on-dark overflow-hidden border-t border-line-dark bg-ink py-7">
      <div className="flex w-max font-display text-[28px] font-extrabold uppercase text-muted-dark-soft [font-stretch:80%]">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
