"use client";

import { useRef, type ReactElement } from "react";
import { isBelow } from "@/lib/motion/load";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * Motion spec 1 for section titles: the heading's visual lines rise 40% and fade in,
 * 0.9s with a 120ms stagger. Wrap exactly one heading element. The wrapper is
 * display: contents, so it doesn't affect layout.
 */
export function RevealLines({ children }: { children: ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ gsap, SplitText, ease }, el) => {
    const heading = el.firstElementChild as HTMLElement | null;
    if (!heading || !isBelow(heading, 0.85)) return;
    SplitText.create(heading, {
      type: "lines",
      autoSplit: true, // re-split after webfonts load and on resize
      aria: "auto", // the heading keeps its text as an aria-label; line wrappers are hidden
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease,
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
          // Hand back the original markup once the reveal has played.
          onComplete: () => self.revert(),
        }),
    });
  });

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
