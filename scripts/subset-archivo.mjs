/**
 * Rebuilds the two Archivo files (OFL 1.1, Google Fonts) in app/fonts:
 * - archivo-display.woff2: web font instanced to the axis ranges the site uses (wght 700–900,
 *   wdth 75–90), subset to Latin + the punctuation and arrows in our copy. ~37 KB vs ~90 KB.
 * - archivo-og.ttf: static 900 / 75% TrueType for the next/og share images (~20 KB).
 *
 * Run from a scratch folder with subset-font installed (it isn't a project dependency):
 *   npm i subset-font@2 && node <repo>/scripts/subset-archivo.mjs <Archivo[wdth,wght].ttf|woff2>
 *
 * Source: https://fonts.google.com/specimen/Archivo (variable, wdth + wght axes).
 * If copy gains characters outside RANGES, add them here and rebuild.
 */
import { readFileSync, writeFileSync } from "node:fs";
import subsetFont from "subset-font";

const RANGES = [
  [0x20, 0x7e], [0xa0, 0xff], [0x131, 0x131], [0x152, 0x153], [0x2c6, 0x2c6], [0x2da, 0x2da],
  [0x2dc, 0x2dc], [0x2013, 0x2014], [0x2018, 0x201e], [0x2022, 0x2022], [0x2026, 0x2026],
  [0x2039, 0x203a], [0x20ac, 0x20ac], [0x2122, 0x2122], [0x2190, 0x2193], [0x2212, 0x2212],
];

const src = process.argv[2];
if (!src) throw new Error("usage: node scripts/subset-archivo.mjs <source font>");
let text = "";
for (const [a, b] of RANGES) for (let c = a; c <= b; c++) text += String.fromCodePoint(c);

const out = await subsetFont(readFileSync(src), text, {
  targetFormat: "woff2",
  variationAxes: { wght: { min: 700, max: 900 }, wdth: { min: 75, max: 90 } },
});
writeFileSync(new URL("../app/fonts/archivo-display.woff2", import.meta.url), out);
console.log(`archivo-display.woff2: ${(out.length / 1024).toFixed(1)} KB`);

const og = await subsetFont(readFileSync(src), text, {
  targetFormat: "truetype",
  variationAxes: { wght: 900, wdth: 75 },
});
writeFileSync(new URL("../app/fonts/archivo-og.ttf", import.meta.url), og);
console.log(`archivo-og.ttf: ${(og.length / 1024).toFixed(1)} KB`);
