import { site } from "@/content/site";
import { Highlighted } from "@/components/ui/Highlighted";
import { Section } from "@/components/ui/Section";

const labelClass = "flex flex-col gap-2 text-[14px] text-muted-dark";
// #8A8A8A border keeps input edges at >= 3:1 against black (WCAG 1.4.11).
const controlClass =
  "min-h-12 w-full border border-muted-dark-soft bg-card px-3.5 text-base text-paper focus-visible:border-brand";

/** Layout only: submission (Resend) and validation come in the form task. */
export function Contact() {
  const { title, body, whatsapp, credentials, form } = site.contact;
  const { fields, service, budget } = form;
  return (
    <Section id="contact" tone="ink" labelledBy="contact-title" className="md:pb-24">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <h2 id="contact-title" className="type-display text-[clamp(56px,8vw,120px)] leading-[0.88]">
            <Highlighted {...title} />
          </h2>
          <p className="text-body-md text-muted-dark">{body}</p>
          <ul className="flex flex-col">
            <li>
              <a href={whatsapp.href} className="inline-flex min-h-btn-md items-center text-paper underline underline-offset-4 hover:text-brand">
                {whatsapp.label}
              </a>
            </li>
            <li>
              <a href={credentials.href} className="inline-flex min-h-btn-md items-center text-paper underline underline-offset-4 hover:text-brand">
                {credentials.label}
              </a>
            </li>
          </ul>
        </div>

        <form aria-label={form.label} method="post" action="/api/contact" className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            {fields.name.label}
            <input type="text" name={fields.name.name} autoComplete="name" className={controlClass} />
          </label>
          <label className={labelClass}>
            {fields.email.label}
            <input type="email" name={fields.email.name} autoComplete="email" className={controlClass} />
          </label>
          <label className={labelClass}>
            {fields.company.label}
            <input type="text" name={fields.company.name} autoComplete="organization" className={controlClass} />
          </label>
          <label className={labelClass}>
            {service.label}
            <select name={service.name} className={controlClass}>
              {service.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            {budget.label}
            <select name={budget.name} className={controlClass}>
              {budget.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            {fields.message.label}
            <textarea name={fields.message.name} rows={4} className={`${controlClass} resize-y py-3`} />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-btn-lg items-center justify-self-start rounded-full bg-brand px-8 font-medium text-ink transition-colors hover:bg-paper sm:col-span-2"
          >
            {form.submit}
          </button>
        </form>
      </div>
    </Section>
  );
}
