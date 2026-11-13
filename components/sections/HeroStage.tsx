"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { VideoSource } from "@/content/types";

/** If playback hasn't started by now, show the text straight away. */
const START_TIMEOUT_MS = 1500;

/** Pause on the final (lit bulb) frame. */
function holdLastFrame(v: HTMLVideoElement) {
  v.pause();
  const jump = () => {
    v.currentTime = Math.max(0, v.duration - 0.05);
  };
  if (v.readyState >= 1) jump();
  else v.addEventListener("loadedmetadata", jump, { once: true });
}
/** holdLastFrame as hand-written ES5 for the inline script (minifiers rename functions). */
const HOLD_LAST_FRAME_JS = `function h(v){v.pause();function j(){v.currentTime=Math.max(0,v.duration-0.05)}v.readyState>=1?j():v.addEventListener("loadedmetadata",j,{once:true})}`;
/**
 * Runs while the HTML parses, before React hydrates (which can take seconds on a slow
 * phone). If the video isn't playing 1.5s after navigation, or Save-Data is on, it marks
 * <html> with .hero-early and CSS shows the headline at once. HeroStage honours the flag.
 * Under prefers-reduced-motion it stops the video and jumps to the lit-bulb last frame.
 */
const EARLY_REVEAL_SCRIPT = `(function(){${HOLD_LAST_FRAME_JS}var v=document.currentScript.previousElementSibling,d=document.documentElement,c=navigator.connection;function s(){d.classList.add("hero-early")}if(matchMedia("(prefers-reduced-motion: reduce)").matches)return h(v);if(c&&c.saveData)return s();setTimeout(function(){if(!v||v.paused||v.currentTime===0)s()},Math.max(0,${START_TIMEOUT_MS}-performance.now()))})()`;
/** Safety net if the video starts and then stalls before the cue. */
const MAX_WAIT_MS = 9000;
/** Phones in portrait get the 9:16 cut. */
const MOBILE_MEDIA = "(max-width: 767px) and (orientation: portrait)";

type HeroStageProps = {
  sources: VideoSource[];
  mobileSources: VideoSource[];
  poster: string;
  /** Seconds into the clip when the text flies in. */
  revealAt: number;
  labelledBy: string;
  children: ReactNode;
};

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Full-bleed hero video plus the headline reveal.
 * Server-rendered children mark revealable elements with `data-reveal-line`.
 * Without JS a CSS failsafe (globals.css → .hero-line) keeps them visible.
 */
export function HeroStage({ sources, mobileSources, poster, revealAt, labelledBy, children }: HeroStageProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    // Stagger index for the CSS transition delay (globals.css → .hero-line).
    root.querySelectorAll<HTMLElement>("[data-reveal-line]").forEach((line, i) => {
      line.style.setProperty("--line", String(i));
    });
    // JS now owns visibility: cancel the CSS failsafe.
    root.classList.add("hero-armed");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

    let started = !video.paused && video.currentTime > 0;
    const timers: number[] = [];

    if (reducedMotion) {
      // No autoplaying motion: show the lit bulb at once. The CSS only hides the lines
      // under prefers-reduced-motion: no-preference, so the text is already visible.
      holdLastFrame(video);
      return () => root.classList.remove("hero-armed");
    }

    // Motion spec 1 runs as a CSS transition, so the reveal never waits on a JS download.
    const reveal = () => {
      detach();
      root.classList.add("hero-revealed");
    };

    const onPlaying = () => {
      started = true;
    };
    // timeupdate fires every ~250ms, so the cue can land up to a quarter second late;
    // "ended" covers a cue at or past the clip's end.
    const onTimeUpdate = () => {
      if (video.currentTime >= revealAt) reveal();
    };
    // Keyboard users tabbing into invisible CTAs get the text immediately.
    const onFocusIn = () => reveal();

    function detach() {
      video?.removeEventListener("playing", onPlaying);
      video?.removeEventListener("timeupdate", onTimeUpdate);
      video?.removeEventListener("error", reveal);
      video?.removeEventListener("ended", reveal);
      root?.removeEventListener("focusin", onFocusIn);
      timers.forEach(window.clearTimeout);
    }

    if (saveData || document.documentElement.classList.contains("hero-early")) {
      reveal();
    } else {
      video.addEventListener("playing", onPlaying);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("error", reveal);
      video.addEventListener("ended", reveal);
      root.addEventListener("focusin", onFocusIn);
      // Deadlines count from navigation start, not from hydration: on a slow phone React
      // can mount seconds in, and the visitor has been waiting since the page appeared.
      const elapsed = performance.now();
      timers.push(
        window.setTimeout(() => {
          if (!started) reveal();
        }, Math.max(0, START_TIMEOUT_MS - elapsed)),
        window.setTimeout(reveal, Math.max(0, MAX_WAIT_MS - elapsed)),
      );
      // Belt and braces for browsers that ignore the attribute after hydration.
      video.muted = true;
      video.play()?.catch(reveal);
      onTimeUpdate();
    }

    return () => {
      detach();
      root.classList.remove("hero-armed", "hero-revealed");
    };
  }, [revealAt]);

  return (
    <section
      ref={rootRef}
      aria-labelledby={labelledBy}
      className="on-dark relative isolate min-h-svh w-full overflow-hidden bg-ink text-paper"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        {mobileSources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} media={MOBILE_MEDIA} />
        ))}
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      <script dangerouslySetInnerHTML={{ __html: EARLY_REVEAL_SCRIPT }} />
      {/* Flat overlay, no gradient */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(0,0,0,0.45)]" />
      {children}
    </section>
  );
}
