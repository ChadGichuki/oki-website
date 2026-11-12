import Image from "next/image";
import type { MediaItem } from "@/content/types";

type MediaSlotProps = {
  media?: MediaItem;
  /** Label shown in the flat placeholder until real media is supplied. */
  placeholder: string;
  tone?: "card" | "brand";
  /** Tailwind aspect class, e.g. "aspect-[2/1]". */
  aspect: string;
  sizes: string;
  className?: string;
};

/**
 * Media frame for client work. Renders a real image/video when given,
 * otherwise a flat placeholder (never AI imagery for client work).
 */
export function MediaSlot({ media, placeholder, tone = "card", aspect, sizes, className = "" }: MediaSlotProps) {
  const frame = `relative w-full overflow-hidden ${aspect} ${className}`;

  if (!media) {
    const toneClass = tone === "brand" ? "bg-brand text-ink" : "bg-card text-muted-dark-soft";
    return (
      <div className={`${frame} ${toneClass} flex items-end p-5`} aria-hidden="true">
        <span className="type-label text-label-sm">{placeholder}</span>
      </div>
    );
  }

  if (media.kind === "image") {
    return (
      <div className={frame}>
        <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={frame}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        poster={media.poster}
        muted
        playsInline
        preload="none"
        aria-label={media.alt}
      >
        {media.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}
