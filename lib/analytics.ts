/** Umami custom events (CLAUDE.md → Analytics events). Add new ones here first. */
export const EVENTS = {
  contactSubmit: "contact_submit",
  whatsappClick: "whatsapp_click",
  credentialsDownload: "credentials_download",
  caseStudyView: "case_study_view",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
type Props = Record<string, string | number | boolean>;

type Umami = { track: (event: EventName, data?: Props) => void };
declare global {
  interface Window {
    umami?: Umami;
    /** Events fired before the tracker loaded; flushed by UmamiScript on load. */
    __umamiQueue?: [EventName, Props | undefined][];
  }
}

/**
 * Fire an event from client code. Umami has no built-in queue, so events fired
 * before its script arrives (e.g. case_study_view during hydration) wait here.
 * Harmless when Umami isn't configured: the queue is just never flushed.
 */
export function track(event: EventName, props?: Props) {
  if (window.umami) window.umami.track(event, props);
  else (window.__umamiQueue ??= []).push([event, props]);
}

export function flushQueue() {
  const queue = window.__umamiQueue ?? [];
  window.__umamiQueue = [];
  for (const [event, props] of queue) window.umami?.track(event, props);
}

/**
 * Data attributes for Umami's click tracking, for links in server components:
 * the click is tracked with no client JS of ours. Spread onto the element:
 * `<a {...eventAttrs(EVENTS.whatsappClick, { location: "contact" })}>`.
 */
export function eventAttrs(event: EventName, props?: Props): Record<string, string> {
  const attrs: Record<string, string> = { "data-umami-event": event };
  for (const [key, value] of Object.entries(props ?? {})) attrs[`data-umami-event-${key}`] = String(value);
  return attrs;
}
