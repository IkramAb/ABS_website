import Link from "next/link";
import { site, contact, footer } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink pb-10 pt-20 text-cream">
      <div className="u-shell">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo href={null} tone="cream" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {site.tagline}
            </p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="u-label text-sun">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link, i) => (
                  <li key={`${link.href}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/75 transition hover:text-sun"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="u-label text-sun">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-cream/75">
              <li>
                <address className="not-italic">{contact.addressLine}</address>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="font-bold text-cream transition hover:text-sun"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-sun"
                >
                  {contact.email}
                </a>
              </li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/55">
            {footer.copyright} · {contact.addressLine}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-cream/55 transition hover:text-sun"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
