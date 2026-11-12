type LogoProps = {
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * Full OKI Digital lockup.
 * TODO: replace this typographic placeholder with the SVG from the OKI design canvas.
 */
export function Logo({ tone = "ink", className = "" }: LogoProps) {
  const color = tone === "ink" ? "text-ink" : "text-paper";
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${color} ${className}`} aria-hidden="true">
      <span className="type-display text-[34px] leading-none">OKI</span>
      <span className="type-label text-label-sm leading-none">Digital</span>
    </span>
  );
}
