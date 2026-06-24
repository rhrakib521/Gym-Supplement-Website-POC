"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getBrandStorySync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function BrandStory() {
  const { t } = useTranslation();
  const lang = useLang();
  const chapters = getBrandStorySync();

  return (
    <section className="relative py-16 md:py-24">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-volt">
          {t("brandStory.eyebrow", { defaultValue: "The Thryve story" })}
        </p>
        <div className="mt-8 space-y-14 md:space-y-20">
          {chapters.map((c, i) => (
            <Reveal key={c.id}>
              <div
                className={
                  "grid items-center gap-8 md:gap-14 " +
                  (i % 2 === 1 ? "md:grid-cols-[1fr_0.9fr]" : "md:grid-cols-[0.9fr_1fr]")
                }
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">
                    {tx(c.kicker, lang)}
                  </p>
                  <h3 className="mt-2 text-balance font-display text-3xl font-semibold leading-tight md:text-[2.75rem]">
                    {tx(c.title, lang)}
                  </h3>
                  <p className="mt-4 max-w-md text-ink-dim">{tx(c.body, lang)}</p>
                  {c.stat ? (
                    <div className="mt-6">
                      <p className="font-display text-4xl font-bold text-volt">{c.stat.value}</p>
                      <p className="text-sm text-ink-dim">{tx(c.stat.label, lang)}</p>
                    </div>
                  ) : null}
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  {c.image ? (
                    <div className="noise relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface-1">
                      <img
                        src={c.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain p-6"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-3xl border border-line bg-surface-1" />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
