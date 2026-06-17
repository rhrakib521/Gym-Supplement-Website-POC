"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { site } from "@/data/site";
import type { ReactNode } from "react";

// lucide-react dropped brand glyphs, so we inline minimal social marks.
function Ig() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Fb() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H7.7V13h2.7v8h3.1z" />
    </svg>
  );
}
function Yt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23 7.5c-.3-1.2-1.1-2-2.3-2.3C18.7 4.8 12 4.8 12 4.8s-6.7 0-8.7.4C2.1 5.5 1.3 6.3 1 7.5.6 9.5.6 12 .6 12s0 2.5.4 4.5c.3 1.2 1.1 2 2.3 2.3 2 .4 8.7.4 8.7.4s6.7 0 8.7-.4c1.2-.3 2-1.1 2.3-2.3.4-2 .4-4.5.4-4.5s0-2.5-.4-4.5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
    </svg>
  );
}

const SOCIAL: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Instagram", href: "https://instagram.com/thryvebd", icon: <Ig /> },
  { label: "Facebook", href: "https://facebook.com/thryvebd", icon: <Fb /> },
  { label: "YouTube", href: "#", icon: <Yt /> },
];

export function Footer() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("footer.shop"),
      links: [
        { href: "/creatine", label: t("nav.creatine") },
        { href: "/accessories", label: t("nav.accessories") },
        { href: "/pre-workout", label: t("nav.preWorkout") },
        { href: "/athletes", label: t("nav.athletes") },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { href: "/about", label: t("nav.about") },
        { href: "/science", label: t("nav.science") },
        { href: "/blog", label: t("nav.journal") },
        { href: "/stories", label: t("nav.stories") },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { href: "/track", label: t("nav.trackOrder") },
        { href: "/verify", label: "Verify my jar" },
        { href: "/contact", label: t("nav.contact") },
        { href: "/account", label: t("nav.account") },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-surface-1">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-pretty text-sm text-ink-dim">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-dim transition-colors hover:border-green hover:text-green"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-dim">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-dim transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-2 font-display text-base font-semibold">
              {t("footer.newsletter")}
            </p>
            <p className="mb-4 text-sm text-ink-dim">{t("footer.newsletterHint")}</p>
            <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                aria-label={t("footer.newsletter")}
                className="h-11 flex-1 rounded-[10px] border border-line bg-bg px-3 text-sm outline-none placeholder:text-ink-dim focus:border-green"
              />
              <button
                type="submit"
                aria-label={t("footer.subscribe")}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-green text-black hover:bg-green-deep hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Thryve Sports Supplements.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {site.payments.map((p) => (
              <span
                key={p}
                className="rounded border border-line bg-bg px-2 py-1 text-[10px] font-medium tracking-wide text-ink-dim"
              >
                {p}
              </span>
            ))}
          </div>
          <p>{t("footer.madeIn")}</p>
        </div>
      </Container>
    </footer>
  );
}
