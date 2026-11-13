import type { StandardCaseStudy } from "../types";

/** Source: design canvas → "Case study — Niche Barbershop & Spa". */
export const niche: StandardCaseStudy = {
  variant: "standard",
  slug: "niche",
  nextTitle: "Niche Barbershop & Spa",
  eyebrow: "Case study · Niche Barbershop & Spa · Westlands, Nairobi",
  title: [{ text: "The best sales month" }, { text: "in its history.", highlight: "history." }],
  facts: [
    { label: "Client", value: "High-end barbershop and spa" },
    { label: "Engagement", value: "3 months" },
    { label: "Platforms", value: "Instagram · Facebook · TikTok" },
    { label: "Services", value: "Social, paid ads, influencer campaign" },
  ],
  heroMedia: { media: {
          kind: "image",
          src: "/media/work/niche/hero-poster.jpg",
          alt: "Inspiration placeholder: barber fading a client's hair in an upscale Nairobi barbershop.",
          width: 1317,
          height: 576,
        }, placeholder: "[ Niche hero clip — influencer campaign content, muted loop ]" },
  stats: [
    { prefix: "#", value: 1, label: "highest monthly sales in the business’s history" },
    { prefix: "+", value: 65, suffix: "%", label: "more walk-in clients during the campaign" },
    { value: 3, label: "months from brief to record month" },
  ],
  story: {
    challenge:
      "Niche had a premium space in Westlands but not enough walk-in and repeat clients to make the business sustainable. With the owner based in the USA, it needed an aggressive online campaign that could fill chairs without someone on the ground.",
    whatWeDid:
      "We ran Niche’s Instagram, Facebook and TikTok for three months, backed by paid ads, and built a campaign around influencer Wanjiku Kabata to put the experience in front of the right Nairobi audience.",
    tactics: [
      { title: "Influencer campaign", body: "Wanjiku Kabata at Niche" },
      { title: "Paid ads", body: "Targeted at nearby clients" },
      { title: "Social management", body: "Instagram, Facebook, TikTok" },
      { title: "Reporting", body: "Sales and walk-ins tracked" },
    ],
  },
  work: [
    {
      aspect: "aspect-[9/16]",
      tiles: [
        { media: {
          kind: "image",
          src: "/media/work/niche/influencer-reel.jpg",
          alt: "Inspiration placeholder: influencer reel of a creator being pampered at a salon.",
          width: 752,
          height: 1337,
        }, placeholder: "[ Influencer reel ]" },
        { media: {
          kind: "image",
          src: "/media/work/niche/behind-the-chair.jpg",
          alt: "Inspiration placeholder: close-up of a barber's clippers on a skin fade.",
          width: 752,
          height: 1337,
        }, placeholder: "[ Behind the chair ]" },
        { media: {
          kind: "image",
          src: "/media/work/niche/campaign-poster.jpg",
          alt: "Inspiration placeholder: black and gold barbershop campaign poster.",
          width: 752,
          height: 1337,
        }, placeholder: "[ Campaign poster ]", tone: "brand" },
        { media: {
          kind: "image",
          src: "/media/work/niche/spa.jpg",
          alt: "Inspiration placeholder: client relaxing in a robe in a steam room.",
          width: 752,
          height: 1337,
        }, placeholder: "[ Spa experience ]" },
      ],
    },
    {
      aspect: "aspect-[4/3]",
      tiles: [{ media: {
          kind: "image",
          src: "/media/work/niche/ad-creative.jpg",
          alt: "Inspiration placeholder: sponsored barbershop post with a Book now button on a phone.",
          width: 1168,
          height: 876,
        }, placeholder: "[ Ad creative ]" }, { media: {
          kind: "image",
          src: "/media/work/niche/analytics.png",
          alt: "Inspiration placeholder: ads manager dashboard with campaign results.",
          width: 1168,
          height: 876,
        }, placeholder: "[ Analytics screenshot ]" }],
    },
  ],
  // TODO: approved quote and name from the owner of Niche.
  quote: {
    text: "[Quote from the owner of Niche, approved before launch.]",
    name: "[Name]",
    role: "Owner, Niche Barbershop & Spa",
  },
  seo: {
    title: "Niche Barbershop & Spa: the best sales month in its history",
    description:
      "A three-month social, paid ads and influencer campaign that gave Niche Barbershop & Spa in Westlands its highest monthly sales ever and 65% more walk-in clients.",
  },
};
