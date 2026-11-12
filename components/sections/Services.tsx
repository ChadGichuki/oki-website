import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Services() {
  const { title, intro, items, extras } = site.services;
  return (
    <Section id="services" tone="sand" labelledBy="services-title">
      <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-5">
          <h2 id="services-title" className="type-display text-section-title">
            {title}
          </h2>
          <p className="max-w-[360px] text-body text-muted">{intro}</p>
        </div>
        <ul className="border-t border-ink">
          {items.map((service) => (
            <li
              key={service.name}
              className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line-strong py-6"
            >
              <h3 className="font-display text-[26px] font-extrabold leading-tight [font-stretch:85%] md:text-[30px]">
                {service.name}
              </h3>
              <p className="text-[15px] text-muted">{service.detail}</p>
            </li>
          ))}
          <li className="flex flex-wrap gap-6 py-5 text-[15px] text-muted">
            {extras.map((extra) => (
              <span key={extra}>{extra}</span>
            ))}
          </li>
        </ul>
      </div>
    </Section>
  );
}
