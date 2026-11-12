import type { LeadersCaseStudy } from "../types";

/** Source: design canvas → "Case study — LinkedIn for leaders". */
export const linkedin: LeadersCaseStudy = {
  variant: "leaders",
  slug: "linkedin",
  nextTitle: "LinkedIn for leaders",
  eyebrow: "Case study · LinkedIn for leaders · Banking, finance and research",
  title: [{ text: "Leaders people" }, { text: "listen to.", highlight: "listen" }],
  intro:
    "Senior professionals hire us to turn LinkedIn into a reputation that opens doors. We build the profile, write the posts and manage the community, so they can get on with their jobs.",
  facts: [
    { label: "Clients", value: "10+ professionals" },
    { label: "Seniority", value: "Heads of department to principal officers" },
    { label: "Services", value: "Profile, content, account management" },
  ],
  stats: [
    { value: 10, suffix: "+", label: "professionals managed on LinkedIn" },
    { text: "Offers", label: "multiple job offers received by our clients" },
    { text: "Stages", label: "speaking engagements won from a rebuilt profile" },
    { value: 1, suffix: " yr+", label: "of consistent posting for our longest client" },
  ],
  leaders: {
    title: "Three leaders",
    items: [
      {
        role: "Head of Service Delivery, Tier 1 bank",
        challenge: "Well respected internally, but not known in the wider industry.",
        whatWeDid:
          "Profile optimisation, two posts a month for six months, and account management: connections, comments and community.",
        outcome: "Invited to speaking engagements.",
        quote: "The work that OKI did was remarkable. It speaks for itself.",
      },
      {
        role: "Principal Officer, fund management firm",
        challenge: "Her LinkedIn profile didn’t reflect her senior role.",
        whatWeDid: "A full profile optimisation, from headline and About section to experience and visuals.",
        outcome: "A professional profile that matches her executive role.",
        quote: "I had a great experience working with them. They were very accommodating of my busy schedule.",
      },
      {
        role: "PhD researcher, United States",
        challenge: "Wanted to be a thought leader in her field but had no time to post.",
        whatWeDid:
          "Activated and optimised her profile, then two posts a month for over a year, plus account management.",
        outcome: "A professional profile and consistent posting she’s very happy with.",
        quote:
          "They truly understand exactly what I need my LinkedIn to do for me. I applaud the level of research it takes to delve into my industry and create consistent, relevant thoughts that resonate with my audience.",
      },
    ],
  },
  founder: {
    eyebrow: "We practise what we sell",
    title: "Our founder’s own profile tells the story",
    body: "Every profile we build for a client meets the same standard as our founder’s: a clear headline, a story that sells, and posts that keep showing up.",
    cta: {
      label: "View her profile on LinkedIn",
      href: "https://www.linkedin.com/in/mercy-muthoki-digitalmarketingexpert/",
    },
    screenshot: {
      placeholder: "[ Screenshot of the founder’s LinkedIn profile — header, headline and a top post ]",
    },
  },
  analytics: {
    title: "The numbers behind the posts",
    intro: "Real post analytics from client accounts. Names and photos are hidden.",
    rows: [
      {
        aspect: "aspect-[4/5]",
        tiles: [
          { placeholder: "[ Post analytics 1 ]" },
          { placeholder: "[ Post analytics 2 ]" },
          { placeholder: "[ Post analytics 3 ]", tone: "brand" },
          { placeholder: "[ Post analytics 4 ]" },
        ],
      },
    ],
  },
  seo: {
    title: "LinkedIn for leaders: leaders people listen to",
    description:
      "How OKI Digital builds LinkedIn profiles, posts and communities for senior professionals in banking, finance and research, leading to job offers and speaking invitations.",
  },
};
