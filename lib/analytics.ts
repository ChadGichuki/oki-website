/** Plausible custom events (CLAUDE.md → Analytics events). Add new ones here first. */
export const EVENTS = {
  contactSubmit: "contact_submit",
  whatsappClick: "whatsapp_click",
  credentialsDownload: "credentials_download",
  caseStudyView: "case_study_view",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
type Props = Record<string, string | number | boolean>;

type Plausible = ((event: EventName, options?: { props?: Props }) => void) & { q?: unknown[] };
declare global {
  interface Window {
    plausible?: Plausible;
  }
}

/** Fire an event from client code. A no-op when Plausible isn't configured. */
export function track(event: EventName, props?: Props) {
  window.plausible?.(event, props ? { props } : undefined);
}

/**
 * Class for Plausible's tagged-events script, for links in server components:
 * the click is tracked with no client JS of ours. Optional props become
 * `plausible-event-<key>=<value>` classes (spaces are written as +).
 */
export function eventClass(event: EventName, props?: Props): string {
  const extra = Object.entries(props ?? {}).map(([k, v]) => `plausible-event-${k}=${String(v).replace(/\s+/g, "+")}`);
  return [`plausible-event-name=${event}`, ...extra].join(" ");
}
