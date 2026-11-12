import type { Stat } from "@/content/types";

/** "KES 1M", "10M+", "+65%", "1,000+" */
export function formatStat({ value, decimals = 0, prefix = "", suffix = "" }: Stat): string {
  const n = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${n}${suffix}`;
}
