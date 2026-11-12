import type { TileRow } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";

type WorkGridProps = {
  id: string;
  title: string;
  intro?: string;
  rows: TileRow[];
  tone?: "ink" | "sand";
};

const cols: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

/** Grid of client media tiles: "The work" (ink) and LinkedIn post analytics (sand). */
export function WorkGrid({ id, title, intro, rows, tone = "ink" }: WorkGridProps) {
  const surface = tone === "ink" ? "on-dark bg-ink text-paper" : "bg-sand text-ink";
  return (
    <section aria-labelledby={id} className={`${surface} py-16 md:py-24`}>
      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id={id} className="type-display text-[clamp(40px,5vw,56px)] leading-[0.95]">
            {title}
          </h2>
          {intro ? <p className="max-w-[360px] text-[15px] leading-normal text-muted">{intro}</p> : null}
        </div>
        {rows.map((row, r) => (
          <ul key={r} className={`grid gap-4 ${cols[row.tiles.length] ?? "sm:grid-cols-2"}`}>
            {row.tiles.map((tile) => (
              <li key={tile.placeholder}>
                <MediaSlot
                  media={tile.media}
                  placeholder={tile.placeholder}
                  tone={tile.tone}
                  aspect={row.aspect}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="rounded"
                />
              </li>
            ))}
          </ul>
        ))}
      </Container>
    </section>
  );
}
