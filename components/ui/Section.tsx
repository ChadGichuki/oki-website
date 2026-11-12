import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "paper" | "sand" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  ink: "on-dark bg-ink text-paper",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  /** Id of the heading that names this section. */
  labelledBy?: string;
  /** Accessible name when the section has no visible heading. */
  label?: string;
  /** Draw a thin top rule. */
  rule?: boolean;
  /** Set false to render children full-bleed. */
  contained?: boolean;
  className?: string;
  children: ReactNode;
};

/** Vertical rhythm: 64px mobile, 120px from md up. */
export function Section({
  id,
  tone = "paper",
  labelledBy,
  label,
  rule = false,
  contained = true,
  className = "",
  children,
}: SectionProps) {
  const ruleClass = rule ? (tone === "ink" ? "border-t border-line-dark" : "border-t border-line") : "";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={`scroll-mt-20 py-section-mobile md:py-section ${tones[tone]} ${ruleClass} ${className}`}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
