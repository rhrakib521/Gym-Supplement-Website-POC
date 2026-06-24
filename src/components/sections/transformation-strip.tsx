"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getTransformationsSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function TransformationStrip() {
  const { t } = useTranslation();
  const lang = useLang();
  const items = getTransformationsSync();

  return (
    <section className="py-14 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Thryver Stories"
          title="Real grind. Real results."
          action={{ href: "/stories", label: t("common.viewAll") }}
        />
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it) => (
            <article key={it.id} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-1">
                <img
                  src={it.image}
                  alt={it.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-semibold text-ink">{it.name}</p>
                  <p className="text-xs text-ink-dim">
                    {tx(it.city, lang)} · {tx(it.duration, lang)}
                  </p>
                  <p className="mt-2 text-sm text-ink/90">“{tx(it.quote, lang)}”</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/stories"
          className="mt-2 inline-block text-sm font-medium text-green hover:underline"
        >
          {t("common.viewAll")} →
        </Link>
      </Container>
    </section>
  );
}
