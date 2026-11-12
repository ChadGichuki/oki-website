import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { HighlightText } from "@/content/types";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Archivo 900 at 75% width, the site's display face, as a static TTF (next/og can't
 * read woff2). Read from disk so builds never depend on a network fetch.
 * Built by scripts/subset-archivo.mjs.
 */
const loadDisplayFont = () => readFile(join(process.cwd(), "app/fonts/archivo-og.ttf"));

type OgInput = {
  eyebrow: string;
  lines: HighlightText[];
};

/** Paper background, full logo, uppercase display headline with the highlight word in brand orange. */
export async function renderOgImage({ eyebrow, lines }: OgInput) {
  const logo = await readFile(join(process.cwd(), "public/brand/oki-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  // next/og ignores width: auto, so size the logo from the PNG header (IHDR width/height).
  const logoHeight = 72;
  const logoWidth = Math.round((logo.readUInt32BE(16) / logo.readUInt32BE(20)) * logoHeight);
  const font = await loadDisplayFont();
  const longest = Math.max(...lines.map((l) => l.text.length));
  const fontSize = longest > 26 ? 76 : longest > 18 ? 96 : 120;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF9F6",
          color: "#000000",
          padding: "64px 72px",
          borderBottom: "16px solid #ED5F1E",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img */}
        <img src={logoSrc} width={logoWidth} height={logoHeight} alt="" style={{ width: logoWidth, height: logoHeight }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 24, letterSpacing: "0.14em", textTransform: "uppercase", color: "#444444" }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Archivo",
              fontWeight: 900,
              fontSize,
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            {lines.map((line) => {
              const at = line.highlight ? line.text.lastIndexOf(line.highlight) : -1;
              if (at < 0) return <div key={line.text}>{line.text}</div>;
              return (
                <div key={line.text} style={{ display: "flex", whiteSpace: "pre" }}>
                  {line.text.slice(0, at)}
                  <span style={{ color: "#ED5F1E" }}>{line.highlight}</span>
                  {line.text.slice(at + line.highlight!.length)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Archivo", data: font, weight: 900, style: "normal" }] },
  );
}
