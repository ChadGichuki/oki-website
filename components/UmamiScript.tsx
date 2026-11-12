"use client";

import Script from "next/script";
import { flushQueue } from "@/lib/analytics";

type UmamiScriptProps = { websiteId: string; domains: string };

export function UmamiScript({ websiteId, domains }: UmamiScriptProps) {
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={websiteId}
      // Only count visits on the real domain: never localhost or preview URLs.
      data-domains={domains}
      strategy="afterInteractive"
      onLoad={flushQueue}
    />
  );
}
