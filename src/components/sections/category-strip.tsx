"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { getCategoriesSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { SectionHeading } from "./section-heading";

export function CategoryStrip() {
  const { t } = useTranslation();
  const lang = useLang();
  const cats = getCategoriesSync();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="The range"
          title="Shop by category"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface-1"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={tx(cat.name, lang)}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-base font-semibold text-ink">
                  {tx(cat.name, lang)}
                </p>
                <p className="text-xs text-ink-dim">{tx(cat.tagline, lang)}</p>
              </div>
              {cat.status !== "live" ? (
                <span className="absolute right-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber backdrop-blur">
                  {tx(cat.badge, lang)}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
