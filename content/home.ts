/**
 * Home page copy. Headlines use *asterisks* to mark emphasis; the
 * <RichHeading> component renders those fragments in the accent color.
 */

export const hero = {
  eyebrow: "ABA Therapy · Minneapolis, MN",
  headline: "Every child *belongs.*",
  body: "Personalized, evidence-based ABA therapy for children on the autism spectrum — built around your child, not a program.",
  primary: { label: "Start a referral", href: "/referrals" },
  secondary: { label: "Our services", href: "/services" },
  quote: "Every child deserves to be seen.",
  quoteAttribution: "Autism Bright Start · Minneapolis, MN",
  /**
   * Two photos, both tall arches. One child alone and one child with a
   * clinician at their eye level — the pairing a referring provider reads
   * fastest. The remaining hero tiles carry trust signals instead.
   */
  photos: [
    {
      src: "/images/hero/hero-1.jpg",
      alt: "A young girl laughing as she stacks a wooden ring toy on the floor.",
      color: "sun" as const,
    },
    {
      src: "/images/hero/hero-2.jpg",
      alt: "A therapist sitting on the floor with a young boy, building a wooden block tower together.",
      color: "coral" as const,
    },
  ],
};

/**
 * Trust tiles inside the hero mosaic.
 *
 * One statement each, no supporting copy — that restraint is what lets the
 * type run large. The detail these used to carry (coverage verification,
 * pre-authorization) is stated in full on /referrals.
 */
export const heroTiles = [
  { title: "MA & Medicaid accepted", color: "leaf" as const, icon: "shield" },
  { title: "Individualized one-on-one therapy", color: "sky" as const },
];

export const marquee = [
  "ABA Therapy",
  "Minneapolis, MN",
  "MA & Medicaid Accepted",
  "BCBA-Supervised",
  "5+ Years in the Twin Cities",
  "Early Intervention",
  "Child-Centered",
  "Family Partnership",
];

export const intro = {
  label: "What we believe",
  headline: "Not every child learns the same way. *That's the point.*",
  body: "Applied Behavior Analysis is the gold-standard, evidence-based approach for supporting children on the autism spectrum. At Autism Bright Start, we build every treatment plan around your child's unique strengths, identity, and family.",
  body2:
    "Our highly experienced BCBAs and Qualified Supervisory Personnel (QSPs) oversee every treatment and create custom plans for each individual child — because no two children are alike, and no two plans should be either.",
  primary: { label: "Our story", href: "/about" },
  secondary: { label: "See services", href: "/services" },
};

export const servicesHeader = {
  label: "What we offer",
  headline: "Six ways we support your child's *growth*",
};

export const feature = {
  label: "Why families choose us",
  headline: "Care that *honors* who your child is",
  body: "We serve a diverse community and build teams that reflect the families we work with. Culture-affirming care isn't a feature — it's the foundation of every relationship we build.",
  body2:
    "Minnesota Medical Assistance and Medicaid accepted. We handle verification and pre-authorization — families don't navigate that alone.",
  primary: { label: "Meet our team", href: "/about" },
  secondary: { label: "Start a referral", href: "/referrals" },
  image: {
    src: "/images/feature/why-families-choose-us.jpg",
    alt: "A teacher painting alongside two students at a classroom table, one seated in a wheelchair.",
  },
};

export const processHeader = {
  label: "Getting started",
  headline: "From referral to care in *4 steps*",
};

export const process = [
  {
    title: "Reach out or get referred",
    body: "Contact us directly, submit a referral online, or ask your pediatrician to send one. We respond within 1–2 business days.",
    meta: ["Phone", "Online", "Provider"],
    color: "sun" as const,
  },
  {
    title: "Insurance verification",
    body: "We verify your MA or Medicaid coverage and handle all paperwork. No MA? We'll connect you with resources.",
    meta: ["MA", "Medicaid", "Private"],
    color: "sky" as const,
  },
  {
    title: "Assessment & planning",
    body: "Your BCBA conducts a comprehensive behavioral assessment and designs a personalized, measurable treatment plan.",
    meta: ["BCBA-led", "CMDE"],
    color: "coral" as const,
  },
  {
    title: "Therapy begins",
    body: "Sessions start on a consistent schedule, with regular progress updates. You're involved in every step.",
    meta: ["Ongoing", "Family-informed"],
    color: "leaf" as const,
  },
];

export const cta = {
  headline: "Ready to take the *first step?*",
  body: "Every child deserves the chance to grow. Start a referral and our intake team will reach out within 48 hours.",
  primary: { label: "Start a referral", href: "/referrals" },
  secondary: { label: "Contact us first", href: "/contact" },
};
