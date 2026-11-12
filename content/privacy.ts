// DRAFT: written for OKI to review. Have it checked against the Kenya Data Protection Act, 2019 before launch.
export const privacy = {
  seo: {
    title: "Privacy notice",
    description: "How OKI Digital collects, uses and protects the personal data you share through okidigital.co.ke.",
  },
  eyebrow: "Legal",
  title: "Privacy notice",
  updated: { label: "Last updated", date: "2026-11-12", display: "12 November 2026" },
  intro:
    "OKI Digital (\"OKI\", \"we\") runs okidigital.co.ke. This notice explains what personal data we collect through this website, why, and the choices you have. We handle personal data in line with the Kenya Data Protection Act, 2019.",
  sections: [
    {
      title: "What we collect",
      body: [
        "When you send the contact form we receive your name, email address, company (if you give it), the service and budget you pick, and your message.",
        "When you message or call us on WhatsApp, WhatsApp processes that conversation under its own terms, and we receive your phone number and what you send us.",
        "We measure visits with Umami Analytics, which does not use cookies and does not store your IP address or other personal data. It counts page views and events such as form submissions in aggregate.",
        "To protect the form from abuse, our server briefly keeps your IP address in memory to limit how many messages one connection can send. It is not stored in a database.",
      ],
    },
    {
      title: "How we use it",
      body: [
        "We use your enquiry only to reply to you, prepare a proposal if you ask for one, and keep a record of our conversation. We do not add you to a mailing list or sell your data.",
      ],
    },
    {
      title: "Who processes it for us",
      body: [
        "Vercel hosts the website. Resend delivers contact form messages to our inbox. Umami provides cookie-free analytics. These providers may process data outside Kenya; we only use providers that protect it with appropriate safeguards.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "We keep enquiry emails for as long as we need them to work with you, and delete enquiries that don't lead to a project within 24 months.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "You can ask to see the personal data we hold about you, correct it, or have it deleted, and you can object to how we use it. Email us and we will reply within 30 days.",
        "If you're not happy with our answer, you can complain to the Office of the Data Protection Commissioner (odpc.go.ke).",
      ],
    },
  ],
  contact: {
    title: "Contact",
    body: "Questions about this notice or your data:",
    email: { label: "info@okidigital.co.ke", href: "mailto:info@okidigital.co.ke" },
  },
} as const;
