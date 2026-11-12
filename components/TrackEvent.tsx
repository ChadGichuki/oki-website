"use client";

import { useEffect } from "react";
import { track, type EventName } from "@/lib/analytics";

type TrackEventProps = { name: EventName; props?: Record<string, string> };

/** Fires one Plausible event when the page mounts (e.g. case_study_view). */
export function TrackEvent({ name, props }: TrackEventProps) {
  const key = JSON.stringify(props ?? {});
  useEffect(() => {
    track(name, JSON.parse(key));
  }, [name, key]);
  return null;
}
