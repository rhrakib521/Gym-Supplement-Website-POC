"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getCategoriesSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function CategoryTileStrip() {
  const { t } = useTranslation();
  const lang = useLang();
  const cats = getCategoriesSync();

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="The range"
          title="Shop by category"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5">
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface-1 p-4 text-center transition hover:border-green"
            >
              <span className="relative h-16 w-16 overflow-hidden rounded-full border border-line bg-bg">
                <img
                  src={cat.image}
                  alt={tx(cat.name, lang)}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition group-hover:scale-105 group-hover:opacity-100"
                />
              </span>
              <span className="text-xs font-medium leading-tight text-ink group-hover:text-green md:text-sm">
                {tx(cat.name, lang)}
              </span>
              {cat.status !== "live" ? (
                <span className="rounded-full bg-amber/12 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber">
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
