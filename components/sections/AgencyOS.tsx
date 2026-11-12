import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { MediaSlot } from "@/components/ui/MediaSlot";

export function AgencyOS() {
  const { eyebrow, title, body, features, badge, badgeText, demo } = site.agencyOs;
  return (
    <Section id="agency-os" tone="ink" rule labelledBy="agency-os-title">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <p className="type-label text-label-lg text-brand">{eyebrow}</p>
          <h2 id="agency-os-title" className="type-display text-[clamp(48px,6vw,88px)]">
            {title}
          </h2>
          <p className="text-body-md text-muted-dark">{body}</p>
          <ul className="border-t border-line-dark">
            {features.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-1.5 border-b border-line-dark py-[18px]">
                <h3 className="font-display text-[22px] font-extrabold [font-stretch:85%]">{feature.title}</h3>
                <p className="text-[15px] leading-normal text-muted-dark">{feature.body}</p>
              </li>
            ))}
          </ul>
          <p className="inline-flex flex-wrap items-center gap-2.5 text-[15px]">
            <span className="type-label rounded-full border border-brand px-2.5 py-1 text-label-sm text-brand">
              {badge}
            </span>
            {badgeText}
          </p>
        </div>
        <figure className="flex flex-col gap-3">
          {/* Demo video slot: VideoMedia goes in content when the recording exists. */}
          <MediaSlot
            placeholder={demo.placeholder}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 700px, 100vw"
            className="rounded-lg border border-line-dark"
          />
          <figcaption className="text-[13px] text-muted-dark-soft">{demo.caption}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
