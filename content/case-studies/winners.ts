import type { StandardCaseStudy } from "../types";

/** Source: design canvas → "Case study — Winners (Ndumberi Dairies)". */
export const winners: StandardCaseStudy = {
  variant: "standard",
  slug: "winners",
  nextTitle: "Winners Dairy",
  eyebrow: "Case study · Winners Dairy Products · Ndumberi Dairy Farmers Co-operative Society",
  title: [{ text: "From zero online sales" }, { text: "to KES 1M a month.", highlight: "KES 1M" }],
  facts: [
    { label: "Client", value: "Large dairy cooperative" },
    { label: "Engagement", value: "2+ years, ongoing" },
    { label: "Platforms", value: "TikTok · Facebook · LinkedIn" },
    { label: "Services", value: "Strategy, content, shoots, management" },
  ],
  heroMedia: { placeholder: "[ Winners hero clip — on-site shoot, muted loop ]" },
  stats: [
    { prefix: "KES ", value: 1, suffix: "M", label: "monthly digital sales, up from KES 0" },
    { value: 10, suffix: "M+", label: "audience reached by our posts" },
    { value: 5000, label: "new followers, all organic" },
  ],
  story: {
    challenge:
      "Winners was on supermarket shelves across the country but had almost no presence online. To grow online sales and compete with the biggest dairy brands in Kenya, it needed a loyal community around the brand.",
    whatWeDid:
      "We activated Winners on TikTok, Facebook and LinkedIn, then ran the whole engine: monthly content calendars approved with the Head of Marketing, on-site shoots and daily publishing.",
    tactics: [
      { title: "Sales promos", body: "Products, prices and where to buy" },
      { title: "Product features", body: "Recipes and flavours" },
      { title: "The people", body: "Employee-featured content" },
      // TODO: confirm cadence; the canvas has "[per week]" as a placeholder.
      { title: "Rhythm", body: "Daily stories, three feed posts [per week]" },
    ],
  },
  work: [
    {
      aspect: "aspect-[9/16]",
      tiles: [
        { placeholder: "[ TikTok reel 1 ]" },
        { placeholder: "[ Recipe video ]" },
        { placeholder: "[ Sales promo poster ]", tone: "brand" },
        { placeholder: "[ Employee feature ]" },
      ],
    },
    {
      aspect: "aspect-[4/3]",
      tiles: [{ placeholder: "[ Carousel spread ]" }, { placeholder: "[ Analytics screenshot ]" }],
    },
  ],
  // TODO: approved quote and name from the Winners Head of Marketing.
  quote: {
    text: "[Quote from the Winners Head of Marketing, approved before launch.]",
    name: "[Name]",
    role: "Head of Marketing, Winners Dairy Products",
  },
  seo: {
    title: "Winners Dairy: from zero online sales to KES 1M a month",
    description:
      "How OKI Digital took Winners Dairy Products from almost no online presence to KES 1M in monthly digital sales and 10M+ people reached on TikTok, Facebook and LinkedIn.",
  },
};
