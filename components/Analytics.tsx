import { site } from "@/content/site";
import { isPreviewDeployment } from "@/lib/seo";
import { UmamiScript } from "./UmamiScript";

/**
 * Umami Cloud: cookie-free, so no consent banner. Loads only in production with
 * UMAMI_WEBSITE_ID set (read at build time). Clicks on elements carrying
 * data-umami-event attributes are tracked by the script (see lib/analytics.ts → eventAttrs).
 */
export function Analytics() {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  if (!websiteId || isPreviewDeployment) return null;
  const host = new URL(site.url).hostname;
  return <UmamiScript websiteId={websiteId} domains={`${host},www.${host}`} />;
}
