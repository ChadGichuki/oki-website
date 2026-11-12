"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/content/site";
import {
  MIN_SUBMIT_MS,
  STARTED_AT_FIELD,
  contactSchema,
  type ContactFieldName,
  type ContactInput,
  type ContactState,
} from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";

const { form } = site.contact;
const FIELDS: ContactFieldName[] = ["name", "email", "company", "service", "budget", "message"];
/** Must be on a domain verified in Resend. */
const FROM = "OKI Digital website <website@okidigital.co.ke>";
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "").slice(0, 5000)]),
  ) as Record<ContactFieldName, string>;
  const fail = (message: string, fieldErrors?: Partial<Record<ContactFieldName, string>>): ContactState => ({
    status: "error",
    message,
    fieldErrors,
    values,
  });

  // Honeypot: report success so bots get no signal, but send nothing.
  if (String(formData.get(form.honeypot.name) ?? "").trim() !== "") return { status: "success" };

  // Timing: the client stamps when the form became usable. No stamp means JS didn't run.
  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (!Number.isFinite(startedAt) || startedAt <= 0) return fail(form.messages.noScript);
  const elapsed = Date.now() - startedAt;
  if (elapsed < MIN_SUBMIT_MS || elapsed > MAX_FORM_AGE_MS) return fail(form.messages.tooFast);

  const ip = await clientIp();
  if (!rateLimit(`contact:${ip}`, RATE_LIMIT.limit, RATE_LIMIT.windowMs)) return fail(form.messages.rateLimited);

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactFieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactFieldName;
      fieldErrors[key] ??= issue.message;
    }
    return fail(form.messages.invalid, fieldErrors);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return fail(form.messages.failed);
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to,
      replyTo: parsed.data.email,
      subject: subjectFor(parsed.data),
      text: bodyFor(parsed.data, ip),
    });
    if (error) {
      console.error("[contact] Resend rejected the message:", error.name, error.message);
      return fail(form.messages.failed);
    }
  } catch (err) {
    console.error("[contact] Resend request failed:", err);
    return fail(form.messages.failed);
  }

  return { status: "success" };
}

async function clientIp(): Promise<string> {
  const h = await headers();
  // Vercel sets x-forwarded-for; the first entry is the client.
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** Single line: strips anything that could break the header. */
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").trim();

function subjectFor(d: ContactInput): string {
  return oneLine(`New enquiry: ${d.name}${d.company ? ` (${d.company})` : ""}`).slice(0, 200);
}

function bodyFor(d: ContactInput, ip: string): string {
  const { fields, service, budget } = form;
  return [
    `${fields.name.label}: ${oneLine(d.name)}`,
    `${fields.email.label}: ${d.email}`,
    `${fields.company.label}: ${d.company ? oneLine(d.company) : "-"}`,
    `${service.label}: ${d.service ?? "-"}`,
    `${budget.label}: ${d.budget ?? "-"}`,
    "",
    `${fields.message.label}`,
    d.message,
    "",
    "--",
    `Sent from the ${site.url} contact form. IP: ${ip}`,
  ].join("\n");
}
