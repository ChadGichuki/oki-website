"use client";

import { useEffect, useRef } from "react";
import type { VideoMedia } from "@/content/types";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/** Desktop only: a real hover and a fine pointer, at lg and up. */
const DESKTOP = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Motion spec 4: a work card's 6s muted clip plays while its link is hovered or focused
 * on desktop. preload="none", so phones, Save-Data and reduced motion never download it.
 * Renders over the card's poster media and stays transparent until it's actually playing.
 */
export function HoverClip({ clip }: { clip: VideoMedia }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("a");
    if (!video || !card || reduced) return;
    if ((navigator as NavigatorWithConnection).connection?.saveData) return;
    const desktop = window.matchMedia(DESKTOP);

    const start = () => {
      if (!desktop.matches) return;
      video.currentTime = 0;
      video.play().then(() => video.classList.add("opacity-100")).catch(() => {});
    };
    const stop = () => {
      video.classList.remove("opacity-100");
      video.pause();
    };

    card.addEventListener("pointerenter", start);
    card.addEventListener("pointerleave", stop);
    card.addEventListener("focus", start);
    card.addEventListener("blur", stop);
    return () => {
      card.removeEventListener("pointerenter", start);
      card.removeEventListener("pointerleave", stop);
      card.removeEventListener("focus", start);
      card.removeEventListener("blur", stop);
      stop();
    };
  }, [reduced]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    >
      {clip.sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
