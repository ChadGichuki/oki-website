import Script from "next/script";
import { isPreviewDeployment } from "@/lib/seo";

/**
 * Plausible: cookie-free, no consent banner needed. Loads only in production with
 * PLAUSIBLE_DOMAIN set. The tagged-events build tracks clicks on links carrying
 * `plausible-event-name=…` classes (see lib/analytics.ts → eventClass).
 */
const domain = () => (isPreviewDeployment ? undefined : process.env.PLAUSIBLE_DOMAIN);

/**
 * Inline in <head>: queues events fired before the script arrives (e.g. case_study_view
 * fires during hydration). The script replays the queue when it loads.
 */
export function AnalyticsQueue() {
  if (!domain()) return null;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}",
      }}
    />
  );
}

export function Analytics() {
  const d = domain();
  if (!d) return null;
  return <Script src="https://plausible.io/js/script.tagged-events.js" data-domain={d} strategy="afterInteractive" />;
}
