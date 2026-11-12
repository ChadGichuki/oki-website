"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { loadMotion, motionIfLoaded } from "@/lib/motion/load";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/** Same-page hash link the visitor clicked normally (no modifier keys, no new tab). */
function samePageHash(event: MouseEvent): { url: URL; target: HTMLElement; link: HTMLAnchorElement } | null {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }
  const link = (event.target as Element | null)?.closest?.("a[href]");
  if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self")) return null;
  const url = new URL(link.href);
  if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return null;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  return target ? { url, target, link } : null;
}

/**
 * Motion spec 6: Lenis smooth wheel scrolling, driven by GSAP's ticker so ScrollTrigger
 * stays in sync. No scroll-jacking: touch stays native and nothing pins or snaps.
 * Same-page anchor links glide to their target (respecting scroll-margin-top), update the
 * URL and move focus. On every route change, ScrollTriggers left from the old page die.
 */
export function MotionProvider() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    let disposed = false;
    let teardown: (() => void) | undefined;

    Promise.all([import("lenis"), loadMotion()])
      .then(([{ default: LenisClass }, { gsap, ScrollTrigger }]) => {
        if (disposed) return;
        const lenis = new LenisClass({ autoRaf: false, anchors: false, stopInertiaOnNavigate: true });
        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Capture phase, so this runs before Next's <Link> does its instant hash jump.
        const onClick = (event: MouseEvent) => {
          const hit = samePageHash(event);
          if (!hit) return;
          event.preventDefault();
          hit.link.closest("details[open]")?.removeAttribute("open"); // close the mobile menu
          history.pushState(history.state, "", hit.url.hash);
          lenis.scrollTo(hit.target, {
            onComplete: () => {
              if (!hit.target.hasAttribute("tabindex")) {
                hit.target.setAttribute("tabindex", "-1");
                hit.target.addEventListener("blur", () => hit.target.removeAttribute("tabindex"), { once: true });
              }
              hit.target.focus({ preventScroll: true });
            },
          });
        };
        window.addEventListener("click", onClick, true);

        teardown = () => {
          window.removeEventListener("click", onClick, true);
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
          lenisRef.current = null;
        };
      })
      .catch(() => {}); // native scrolling is the fallback

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [reduced]);

  // Route change: components revert their own triggers on unmount; this sweeps up any
  // whose element has left the document, then re-measures for the new page.
  useEffect(() => {
    const motion = motionIfLoaded();
    if (!motion) return;
    for (const trigger of motion.ScrollTrigger.getAll()) {
      const el = trigger.trigger;
      if (el && !el.isConnected) trigger.kill();
    }
    lenisRef.current?.resize();
    motion.ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
