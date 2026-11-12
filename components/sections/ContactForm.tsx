"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import type { site } from "@/content/site";
import { STARTED_AT_FIELD, initialContactState, type ContactFieldName } from "@/lib/contact-state";

type FormContent = (typeof site)["contact"]["form"];

const labelClass = "flex flex-col gap-2 text-[14px] text-muted-dark";
// #8A8A8A border keeps input edges at >= 3:1 against black (WCAG 1.4.11).
const controlClass =
  "min-h-12 w-full border border-muted-dark-soft bg-card px-3.5 text-base text-paper focus-visible:border-brand " +
  "aria-[invalid=true]:border-brand";
// Orange on black is ~6.6:1, and CLAUDE.md allows orange labels on black.
const errorClass = "text-[14px] text-brand";

/** Remounting on "send another" gives a fresh action state and an empty form. */
export function ContactForm({ form }: { form: FormContent }) {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} form={form} onReset={() => setRound((r) => r + 1)} />;
}

function ContactFormInner({ form, onReset }: { form: FormContent; onReset: () => void }) {
  const [state, action, pending] = useActionState(submitContact, initialContactState);
  const [startedAt, setStartedAt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  // Stamped after hydration, so it measures time the visitor actually had the form.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- needs the client clock, not the build-time one
  useEffect(() => setStartedAt(String(Date.now())), []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status !== "error") return;
    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    (firstInvalid ?? summaryRef.current)?.focus();
  }, [state]);

  if (state.status === "success") {
    const { success } = form.messages;
    return (
      <div role="status" className="flex flex-col items-start gap-5 border-t border-line-dark pt-8">
        <h3 ref={successRef} tabIndex={-1} className="type-display text-[clamp(40px,5vw,64px)] leading-[0.9]">
          {success.title}
        </h3>
        <p className="text-body-md text-muted-dark">{success.body}</p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-btn-md items-center text-paper underline underline-offset-4 hover:text-brand"
        >
          {success.again}
        </button>
      </div>
    );
  }

  const error = state.status === "error" ? state : undefined;
  const values = error?.values ?? {};
  const fieldError = (name: ContactFieldName) => error?.fieldErrors?.[name];
  const describe = (name: ContactFieldName) => (fieldError(name) ? `${id}-${name}-error` : undefined);
  const invalid = (name: ContactFieldName) => (fieldError(name) ? true : undefined);
  const errorText = (name: ContactFieldName) =>
    fieldError(name) ? (
      <span id={`${id}-${name}-error`} className={errorClass}>
        {fieldError(name)}
      </span>
    ) : null;

  const { fields, service, budget, honeypot, privacyNote } = form;

  return (
    <form ref={formRef} action={action} aria-label={form.label} noValidate className="grid gap-5 sm:grid-cols-2">
      {error ? (
        <p ref={summaryRef} tabIndex={-1} role="alert" className="border border-brand px-4 py-3 text-[15px] text-paper sm:col-span-2">
          {error.message}
        </p>
      ) : null}

      <label className={labelClass}>
        {fields.name.label}
        <input
          type="text"
          name={fields.name.name}
          autoComplete="name"
          required
          maxLength={120}
          defaultValue={values.name}
          aria-invalid={invalid("name")}
          aria-describedby={describe("name")}
          className={controlClass}
        />
        {errorText("name")}
      </label>
      <label className={labelClass}>
        {fields.email.label}
        <input
          type="email"
          name={fields.email.name}
          autoComplete="email"
          required
          maxLength={254}
          defaultValue={values.email}
          aria-invalid={invalid("email")}
          aria-describedby={describe("email")}
          className={controlClass}
        />
        {errorText("email")}
      </label>
      <label className={labelClass}>
        {fields.company.label}
        <input
          type="text"
          name={fields.company.name}
          autoComplete="organization"
          maxLength={160}
          defaultValue={values.company}
          aria-invalid={invalid("company")}
          aria-describedby={describe("company")}
          className={controlClass}
        />
        {errorText("company")}
      </label>
      <label className={labelClass}>
        {service.label}
        <select key={`service-${values.service ?? ""}`} name={service.name} defaultValue={values.service} className={controlClass}>
          {service.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        {budget.label}
        <select key={`budget-${values.budget ?? ""}`} name={budget.name} defaultValue={values.budget} className={controlClass}>
          {budget.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        {fields.message.label}
        <textarea
          name={fields.message.name}
          rows={4}
          required
          maxLength={5000}
          defaultValue={values.message}
          aria-invalid={invalid("message")}
          aria-describedby={describe("message")}
          className={`${controlClass} resize-y py-3`}
        />
        {errorText("message")}
      </label>

      {/* Honeypot: off-screen and out of the tab order and accessibility tree. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {honeypot.label}
          <input type="text" name={honeypot.name} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name={STARTED_AT_FIELD} value={startedAt} readOnly />

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="inline-flex min-h-btn-lg items-center justify-center rounded-full bg-brand px-8 font-medium text-ink transition-colors hover:bg-paper disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? form.sending : form.submit}
        </button>
        <a
          href={form.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-btn-lg items-center justify-center rounded-full border border-paper px-8 font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          {form.whatsapp.label}
        </a>
      </div>
      <p className="text-[14px] text-muted-dark-soft sm:col-span-2">
        {privacyNote.before}
        <Link href={privacyNote.link.href} className="text-muted-dark underline underline-offset-4 hover:text-paper">
          {privacyNote.link.label}
        </Link>
        {privacyNote.after}
      </p>
    </form>
  );
}
