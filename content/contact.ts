export const hero = {
  label: "Get in touch",
  headline: "Let's *talk.*",
  body: "Whether you have questions, want to learn more, or are ready to start a referral — we're here.",
};

export const subjectOptions = [
  "General question",
  "Referral inquiry",
  "Insurance question",
  "Employment / careers",
  "Other",
];

/** Detail cards. `note` is the secondary line under each value. */
export const details = [
  {
    title: "Phone",
    note: "Mon – Fri, 8am – 5pm CST",
    color: "sun" as const,
  },
  {
    title: "Email",
    note: "Response within 1 business day",
    color: "sky" as const,
  },
  {
    title: "Address",
    note: "",
    color: "coral" as const,
  },
  {
    title: "Insurance",
    note: "Minnesota Medical Assistance (MA) and Medicaid accepted. Call to verify coverage at no cost.",
    color: "leaf" as const,
  },
];

export const referralsCallout = {
  title: "Referrals",
  body: "Submit online or ask your child's doctor to refer directly.",
  cta: { label: "Referral form", href: "/referrals" },
};
