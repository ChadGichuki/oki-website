import type { HighlightText } from "@/content/types";

/** Renders `text`, with its `highlight` substring in brand orange. */
export function Highlighted({ text, highlight }: HighlightText) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-brand">{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}
