import { site } from "@/content/site";
import { Highlighted } from "@/components/ui/Highlighted";
import { Section } from "@/components/ui/Section";
import { EVENTS, eventClass } from "@/lib/analytics";
import { ContactForm } from "./ContactForm";
import { FadeUp } from "@/components/motion/FadeUp";
import { RevealLines } from "@/components/motion/RevealLines";

/** Contact copy and links; the form itself is the client component. */
export function Contact() {
  const { title, body, whatsapp, credentials, form } = site.contact;
  return (
    <Section id="contact" tone="ink" labelledBy="contact-title" className="md:pb-24">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <RevealLines>
            <h2 id="contact-title" className="type-display text-[clamp(56px,8vw,120px)] leading-[0.88]">
              <Highlighted {...title} />
            </h2>
          </RevealLines>
          <p className="text-body-md text-muted-dark">{body}</p>
          <ul className="flex flex-col">
            <li>
              <a href={whatsapp.href} className={`${eventClass(EVENTS.whatsappClick, { location: "contact" })} inline-flex min-h-btn-md items-center text-paper underline underline-offset-4 hover:text-brand`}>
                {whatsapp.label}
              </a>
            </li>
            <li>
              <a href={credentials.href} className={`${eventClass(EVENTS.credentialsDownload)} inline-flex min-h-btn-md items-center text-paper underline underline-offset-4 hover:text-brand`}>
                {credentials.label}
              </a>
            </li>
          </ul>
        </div>

        <FadeUp>
          <ContactForm form={form} />
        </FadeUp>
      </div>
    </Section>
  );
}
