import { site } from "@/content/site";
import { Highlighted } from "@/components/ui/Highlighted";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

/** Contact copy and links; the form itself is the client component. */
export function Contact() {
  const { title, body, whatsapp, credentials, form } = site.contact;
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

        <ContactForm form={form} />
      </div>
    </Section>
  );
}
