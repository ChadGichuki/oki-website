import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextType } from "gsap/SplitText";

/** Motion spec 1: cubic-bezier(.2,.7,.1,1), as an SVG path for CustomEase. */
const REVEAL_EASE_PATH = "M0,0 C0.2,0.7 0.1,1 1,1";

export type Motion = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  SplitText: typeof SplitTextType;
  /** The site-wide reveal ease. */
  ease: string;
};

let pending: Promise<Motion> | undefined;
let loaded: Motion | undefined;

/**
 * GSAP and its plugins, loaded on first use so they stay out of the initial bundle.
 * Every motion component shares this one promise.
 */
export function loadMotion(): Promise<Motion> {
  pending ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
    import("gsap/CustomEase"),
  ])
    .then(([{ gsap }, { ScrollTrigger }, { SplitText }, { CustomEase }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
      CustomEase.create("oki-reveal", REVEAL_EASE_PATH);
      loaded = { gsap, ScrollTrigger, SplitText, ease: "oki-reveal" };
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
