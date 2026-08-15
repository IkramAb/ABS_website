/**
 * Site-wide facts. Everything that repeats across pages lives here exactly
 * once — phone, email, address and hours must be identical everywhere.
 */

import { services } from "./services";

export const site = {
  name: "Autism Bright Start",
  shortName: "ABS",
  url: "https://autismbrightstart.org",
  tagline:
    "ABA and occupational therapy for children with autism spectrum disorder. Serving Minneapolis and the greater Twin Cities. MA accepted.",
  /**
   * Feeds the meta description, OpenGraph, Twitter card and the
   * MedicalBusiness JSON-LD. Kept under 160 characters so search results
   * show it in full.
   */
  description:
    "Evidence-based ABA and occupational therapy for children on the autism spectrum in Minneapolis and the greater Twin Cities. MA and Medicaid accepted.",
} as const;

export const contact = {
  phone: "(612) 555-0199",
  phoneHref: "tel:+16125550199",
  email: "info@autismbrightstart.org",
  referralEmail: "referrals@autismbrightstart.org",
  street: "321 Wilson St NE, Ste 200",
  city: "Minneapolis",
  state: "MN",
  zip: "55413",
  addressLine: "321 Wilson St NE, Ste 200, Minneapolis, MN 55413",
  hours: "Mon–Fri · 8am–5pm",
  hoursLong: "Monday – Friday, 8am – 5pm CST",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Referrals", href: "/referrals" },
  { label: "Contact", href: "/contact" },
] as const;

export const navCta = { label: "Get started", href: "/referrals" } as const;

/** Recurring trust signal — same words on Home, Services, Referrals, Contact. */
export const trustSignal = "MA & Medicaid accepted";

export const footer = {
  columns: [
    {
      title: "Services",
      /** Derived from the service list so the footer can never drift. */
      links: services.map((service) => ({
        label: service.footerLabel,
        href: `/services/${service.slug}`,
      })),
    },
    {
      title: "Navigate",
      links: [
        { label: "About us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Referrals", href: "/referrals" },
        { label: "Contact us", href: "/contact" },
      ],
    },
  ],
  legal: [
    { label: "Privacy policy", href: "/contact" },
    { label: "Accessibility", href: "/contact" },
    { label: "MA insurance accepted", href: "/referrals" },
  ],
  copyright: `© ${new Date().getFullYear()} Autism Bright Start. All rights reserved.`,
} as const;
