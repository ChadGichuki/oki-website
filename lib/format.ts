import type { Stat } from "@/content/types";

/** "KES 1M", "10M+", "+65%", "1,000+", or a word stat as written. */
export function formatStat(stat: Stat): string {
  if ("text" in stat) return stat.text;
  const { value, decimals = 0, prefix = "", suffix = "" } = stat;
  const n = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${n}${suffix}`;
}
