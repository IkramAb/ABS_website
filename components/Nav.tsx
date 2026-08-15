"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, navCta, contact } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "./Logo";

/**
 * Services disclosure. This holds links, so a button + list is the right
 * pattern — an ARIA menubar with roving tabindex would be heavier and worse
 * for screen readers here.
 */
function ServicesDropdown({
  active,
  onNavigate,
}: {
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    onNavigate();
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="services-menu"
        className={`flex items-center gap-1.5 text-[0.95rem] font-semibold transition hover:text-tomato ${
          active ? "text-tomato" : "text-ink"
        }`}
      >
        Services
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div
          id="services-menu"
          className="absolute left-1/2 top-full z-50 mt-4 w-80 -translate-x-1/2 overflow-hidden rounded-tile border-2 border-ink/10 bg-cream shadow-tile-lg"
        >
          <Link
            href="/services"
            onClick={close}
            className="flex items-center justify-between border-b-2 border-ink/10 bg-cream-deep px-5 py-4 text-[0.95rem] font-bold text-ink transition hover:bg-sun"
          >
            All services
            <span aria-hidden="true">→</span>
          </Link>
          <ul className="py-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={close}
                  className="block px-5 py-3 text-[0.9rem] font-semibold text-ink transition hover:bg-cream-deep"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeDrawer = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  const inServices = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      {/* Three equal-outer columns rather than `justify-between`: the logo and
          the phone/CTA group are different widths, so space-between would
          centre the nav links between *them* rather than on the page — off by
          ~68px. `1fr auto 1fr` centres the middle column regardless. Flex on
          mobile, where the nav and CTA group are hidden and a grid would leave
          the menu button stranded in the middle. */}
      <div className="u-shell flex items-center justify-between gap-4 py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            if (item.href === "/services") {
              return (
                <ServicesDropdown
                  key={item.href}
                  active={inServices}
                  onNavigate={closeDrawer}
                />
              );
            }

            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.95rem] font-semibold transition hover:text-tomato ${
                  active ? "text-tomato" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex lg:justify-self-end">
          <a
            href={contact.phoneHref}
            className="text-[0.95rem] font-bold text-ink transition hover:text-tomato"
          >
            {contact.phone}
          </a>
          <Link
            href={navCta.href}
            className="rounded-chip bg-tomato px-5 py-2.5 text-[0.9rem] font-bold text-white transition hover:bg-tomato/90"
          >
            {navCta.label}
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-chip border-2 border-ink/20 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-ink/10 bg-cream px-5 pb-6 pt-2 sm:px-8 lg:hidden"
        >
          <nav aria-label="Main" className="flex flex-col">
            {nav.map((item) => {
              if (item.href === "/services") {
                return (
                  <div key={item.href} className="border-b border-ink/10">
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      className="flex w-full items-center justify-between py-4 text-lg font-semibold text-ink"
                    >
                      Services
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className={`h-5 w-5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M5 8l5 5 5-5" />
                      </svg>
                    </button>

                    {servicesOpen && (
                      <ul id="mobile-services" className="pb-3 pl-4">
                        <li>
                          <Link
                            href="/services"
                            onClick={closeDrawer}
                            className="block py-2.5 text-[0.95rem] font-bold text-tomato"
                          >
                            All services
                          </Link>
                        </li>
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              onClick={closeDrawer}
                              className="block py-2.5 text-[0.95rem] font-semibold text-ink/80"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="border-b border-ink/10 py-4 text-lg font-semibold text-ink"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={navCta.href}
              onClick={closeDrawer}
              className="rounded-chip bg-tomato px-5 py-3.5 text-center font-bold text-white"
            >
              {navCta.label}
            </Link>
            <a
              href={contact.phoneHref}
              className="rounded-chip border-2 border-ink/20 px-5 py-3.5 text-center font-bold text-ink"
            >
              Call {contact.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
