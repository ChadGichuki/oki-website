"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { VideoSource } from "@/content/types";

/** Reveal headline once playback reaches this point (CLAUDE.md → Hero video). */
const REVEAL_AT_SECONDS = 5;
/** If playback hasn't started by now, show the text straight away. */
const START_TIMEOUT_MS = 1500;
/** Safety net if the video starts and then stalls before 5s. */
const MAX_WAIT_MS = 9000;
/** Phones in portrait get the 9:16 cut. */
const MOBILE_MEDIA = "(max-width: 767px) and (orientation: portrait)";
/** Motion spec 1: cubic-bezier(.2,.7,.1,1). */
const REVEAL_EASE_PATH = "M0,0 C0.2,0.7 0.1,1 1,1";

type HeroStageProps = {
  sources: VideoSource[];
  mobileSources: VideoSource[];
  poster: string;
  labelledBy: string;
  children: ReactNode;
};

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Full-bleed hero video plus the headline reveal.
 * Server-rendered children mark revealable elements with `data-reveal-line`.
 * Without JS a CSS failsafe (globals.css → .hero-line) keeps them visible.
 */
export function HeroStage({ sources, mobileSources, poster, labelledBy, children }: HeroStageProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-line]"));
    // JS now owns visibility: cancel the CSS failsafe.
    root.classList.add("hero-armed");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

    let revealed = false;
    let disposed = false;
    let started = !video.paused && video.currentTime > 0;
    let killTween: (() => void) | undefined;
    const timers: number[] = [];

    const setVisible = () => {
      for (const line of lines) {
        line.style.opacity = "1";
        line.style.transform = "none";
      }
    };

    if (reducedMotion) {
      // No autoplaying motion: hold the first frame/poster and show the text.
      // Must not touch detach(): its handlers are declared further down (TDZ).
      video.pause();
      setVisible();
      return () => root.classList.remove("hero-armed");
    }

    const showNow = () => {
      revealed = true;
      detach();
      setVisible();
    };

    // Start loading GSAP now so the reveal isn't waiting on the network at 5s.
    const gsapReady = Promise.all([import("gsap"), import("gsap/CustomEase")]);

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      detach();
      gsapReady
        .then(([{ gsap }, { CustomEase }]) => {
          if (disposed) return;
          gsap.registerPlugin(CustomEase);
          const tween = gsap.fromTo(
            lines,
            { yPercent: 40, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: CustomEase.create("oki-reveal", REVEAL_EASE_PATH),
              clearProps: "transform",
            },
          );
          killTween = () => tween.kill();
        })
        .catch(showNow);
    };

    const onPlaying = () => {
      started = true;
    };
    const onTimeUpdate = () => {
      if (video.currentTime >= REVEAL_AT_SECONDS) reveal();
    };
    // Keyboard users tabbing into invisible CTAs get the text immediately.
    const onFocusIn = () => reveal();

    function detach() {
      video?.removeEventListener("playing", onPlaying);
      video?.removeEventListener("timeupdate", onTimeUpdate);
      video?.removeEventListener("error", reveal);
      root?.removeEventListener("focusin", onFocusIn);
      timers.forEach(window.clearTimeout);
    }

    if (saveData) {
      reveal();
    } else {
      video.addEventListener("playing", onPlaying);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("error", reveal);
      root.addEventListener("focusin", onFocusIn);
      timers.push(
        window.setTimeout(() => {
          if (!started) reveal();
        }, START_TIMEOUT_MS),
        window.setTimeout(reveal, MAX_WAIT_MS),
      );
      // Belt and braces for browsers that ignore the attribute after hydration.
      video.muted = true;
      video.play()?.catch(reveal);
      onTimeUpdate();
    }

    return () => {
      disposed = true;
      detach();
      killTween?.();
      root.classList.remove("hero-armed");
    };
  }, []);

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
        loop
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
      {/* Flat overlay, no gradient */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(0,0,0,0.45)]" />
      {children}
    </section>
  );
}
