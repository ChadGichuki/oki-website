import Image from "next/image";
import type { ReactNode } from "react";
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
  /** Motion spec 4: scale 1 -> 1.04 while the enclosing `group` (the card link) is hovered or focused. */
  zoom?: boolean;
  /** Extra layer inside the frame, e.g. a hover clip. Scales with the media. */
  overlay?: ReactNode;
};

const zoomClass =
  "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-reveal " +
  "motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]";

/**
 * Media frame for client work. Renders a real image/video when given,
 * otherwise a flat placeholder (never AI imagery for client work).
 */
export function MediaSlot({
  media,
  placeholder,
  tone = "card",
  aspect,
  sizes,
  className = "",
  zoom = false,
  overlay,
}: MediaSlotProps) {
  const frame = `relative w-full overflow-hidden ${aspect} ${className}`;
  // Everything visual sits on one inner layer, so the frame clips the zoom.
  const layer = `absolute inset-0 ${zoom ? zoomClass : ""}`;

  if (!media) {
    const toneClass = tone === "brand" ? "bg-brand text-ink" : "bg-card text-muted-dark-soft";
    return (
      <div className={frame} aria-hidden="true">
        <div className={`${layer} ${toneClass} flex items-end p-5`}>
          <span className="type-label text-label-sm">{placeholder}</span>
          {overlay}
        </div>
      </div>
    );
  }

  if (media.kind === "image") {
    return (
      <div className={frame}>
        <div className={layer}>
          <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />
          {overlay}
        </div>
      </div>
    );
  }

  return (
    <div className={frame}>
      <div className={layer}>
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
        {overlay}
      </div>
    </div>
  );
}
