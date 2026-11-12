"use client";

import { useRef, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { isBelow } from "@/lib/motion/load";
import { useMotion } from "@/lib/motion/useMotion";

type FadeUpProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Element to render, so lists keep their semantics. */
  as?: "div" | "ul" | "ol" | "figure";
  /** Fade each direct child in turn instead of the element as a whole. */
  stagger?: boolean;
};

/**
 * Motion spec 5: content fades up 24px as it enters.
 * Only elements still below the fold when motion starts are hidden, so nothing
 * on screen ever blinks out; without JS or with reduced motion it's the plain element.
 */
export function FadeUp({ children, as = "div", stagger = false, ...rest }: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ gsap, ScrollTrigger, ease }, el) => {
    const targets = (stagger ? Array.from(el.children) : [el]).filter((t) => isBelow(t, 0.9));
    if (targets.length === 0) return;
    gsap.set(targets, { y: 24, opacity: 0 });
    ScrollTrigger.batch(targets, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease, clearProps: "transform,opacity" }),
    });
  });

  const Tag = as;
  return (
    // Every allowed tag is an HTMLElement; TS can't narrow the ref across the union.
    <Tag ref={ref as RefObject<HTMLDivElement & HTMLUListElement & HTMLOListElement>} {...rest}>
      {children}
    </Tag>
  );
}
