"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";
import { loadMotion, type Motion } from "./load";
import { useReducedMotion } from "./useReducedMotion";

type Setup = (motion: Motion, el: HTMLElement) => void | (() => void);

/**
 * Runs `setup` inside a gsap.context once GSAP has loaded, unless reduced motion is on.
 * On unmount (including route changes) or a switch to reduced motion, the context is
 * reverted: tweens are undone, ScrollTriggers and SplitTexts are killed, and the
 * element is back to its server-rendered, fully visible state.
 */
export function useMotion(ref: RefObject<HTMLElement | null>, setup: Setup) {
  const reduced = useReducedMotion();
  const run = useEffectEvent(setup);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let disposed = false;
    let ctx: gsap.Context | undefined;
    let teardown: void | (() => void);

    loadMotion()
      .then((motion) => {
        if (disposed) return;
        ctx = motion.gsap.context(() => {
          teardown = run(motion, el);
        }, el);
      })
      // Motion is decoration: if GSAP fails to load the content is already visible.
      .catch(() => {});

    return () => {
      disposed = true;
      teardown?.();
      ctx?.revert();
    };
  }, [ref, reduced]);
}
