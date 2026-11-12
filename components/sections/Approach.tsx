import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Approach() {
  const { title, steps } = site.approach;
  return (
    <Section id="approach" labelledBy="approach-title">
      <h2 id="approach-title" className="type-display mb-14 text-section-title">
        {title}
      </h2>
      <ol className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3 border-b border-line py-7 pr-5 lg:border-b-0">
            <span className="font-display text-[20px] font-extrabold" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-[26px] font-extrabold [font-stretch:85%]">{step.title}</h3>
            <p className="text-[15px] leading-normal text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
