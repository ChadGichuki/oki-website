"use client";

import { useRef } from "react";
import type { Stat } from "@/content/types";
import { formatStat } from "@/lib/format";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * Motion spec 3: numeric results count up once, when half the number is in view.
 * The server renders the final value; word stats ("Offers") never animate.
 * Screen readers get the final value only, never the ticking digits.
 */
export function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = formatStat(stat);

  useMotion(ref, ({ gsap }, el) => {
    if (!("value" in stat)) return;
    const out = el.querySelector<HTMLElement>("[data-count]");
    // Already half visible when motion starts: leave the final number alone.
    if (!out || el.getBoundingClientRect().top + el.offsetHeight / 2 < window.innerHeight) return;

    const counter = { value: 0 };
    out.textContent = formatStat({ ...stat, value: 0 });
    gsap.to(counter, {
      value: stat.value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "center bottom", once: true },
      onUpdate: () => {
        out.textContent = formatStat({ ...stat, value: counter.value });
      },
      onComplete: () => {
        out.textContent = final;
      },
    });
    return () => {
      out.textContent = final;
    };
  });

  return (
    <span ref={ref}>
      <span data-count aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
