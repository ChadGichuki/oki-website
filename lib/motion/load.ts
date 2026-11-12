import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextType } from "gsap/SplitText";

/**
 * CSS-style cubic-bezier as an easing function (GSAP accepts functions), so we
 * don't ship CustomEase for one curve. Newton-Raphson on x(t), bisection fallback.
 */
function cubicBezier(x1: number, y1: number, x2: number, y2: number): (x: number) => number {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const d = slopeX(t);
      if (Math.abs(d) < 1e-6) break;
      const next = t - (sampleX(t) - x) / d;
      if (Math.abs(next - t) < 1e-6) return sampleY(next);
      t = next;
    }
    let lo = 0, hi = 1;
    t = x;
    for (let i = 0; i < 20; i++) {
      const v = sampleX(t);
      if (Math.abs(v - x) < 1e-6) break;
      if (v < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return sampleY(t);
  };
}

/** Motion spec 1: cubic-bezier(.2,.7,.1,1). */
const revealEase = cubicBezier(0.2, 0.7, 0.1, 1);

/**
 * Resolves once the page has loaded and the main thread is idle, so motion code
 * never competes with first render, the LCP image or hydration.
 */
function whenIdle(): Promise<void> {
  return new Promise((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(() => resolve(), { timeout: 2000 }) : setTimeout(resolve, 200);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
}

export type Motion = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  SplitText: typeof SplitTextType;
  /** The site-wide reveal ease. */
  ease: (progress: number) => number;
};

let pending: Promise<Motion> | undefined;
let loaded: Motion | undefined;

/**
 * GSAP and its plugins, loaded after the page is idle so they stay off the critical path.
 * Every motion component shares this one promise.
 */
export function loadMotion(): Promise<Motion> {
  pending ??= whenIdle()
    .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]))
    .then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      loaded = { gsap, ScrollTrigger, SplitText, ease: revealEase };
      return loaded;
    })
    .catch((err: unknown) => {
      pending = undefined; // allow a retry on the next mount
      throw err;
    });
  return pending;
}

/** The loaded modules, or undefined if nothing has asked for motion yet. */
export function motionIfLoaded(): Motion | undefined {
  return loaded;
}

/** True when the element's top edge is below `ratio` of the viewport height. */
export function isBelow(el: Element, ratio: number): boolean {
  return el.getBoundingClientRect().top > window.innerHeight * ratio;
}
