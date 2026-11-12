// Shared by the server action and the client form. Keep this free of zod and content imports.

/** Minimum time between the form rendering and submit. Faster than this is almost always a bot. */
export const MIN_SUBMIT_MS = 3000;
/** Hidden field the client fills with the time the form became interactive. */
export const STARTED_AT_FIELD = "startedAt";

export type ContactFieldName = "name" | "email" | "company" | "service" | "budget" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactFieldName, string>>;
      /** Echoed back so the form keeps what the visitor typed. */
      values?: Partial<Record<ContactFieldName, string>>;
    };

export const initialContactState: ContactState = { status: "idle" };
