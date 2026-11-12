import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { FadeUp } from "@/components/motion/FadeUp";

export function Lanes() {
  return (
    <Section tone="ink" label={site.lanes.label}>
      <FadeUp stagger className="grid gap-16 md:grid-cols-2">
        {site.lanes.items.map((lane) => (
          <div key={lane.eyebrow} className="flex flex-col gap-5">
            <p className="type-label text-label-lg text-brand">{lane.eyebrow}</p>
            <h2 className="type-display text-[clamp(40px,5vw,56px)] leading-[0.95]">{lane.title}</h2>
            <p className="text-body-md text-muted-dark">{lane.body}</p>
          </div>
        ))}
      </FadeUp>
    </Section>
  );
}
