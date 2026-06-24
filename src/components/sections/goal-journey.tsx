"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/product/product-card";
import { getGoalsSync, getProductsBySlugsSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import type { Goal } from "@/types";

export function GoalJourney() {
  const { t } = useTranslation();
  const lang = useLang();
  const goals = getGoalsSync();
  const [activeId, setActiveId] = useState<Goal["id"]>(goals[0]?.id ?? "build");
  const active = goals.find((g) => g.id === activeId) ?? goals[0];
  const stack = active ? getProductsBySlugsSync(active.productSlugs) : [];

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Start here" title="What's your grind?" />

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {goals.map((g) => {
            const on = g.id === activeId;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveId(g.id)}
                className={
                  "rounded-2xl border p-5 text-left transition " +
                  (on ? "border-green bg-surface-1" : "border-line bg-surface-1/40 hover:border-ink-dim")
                }
              >
                <span className="font-display text-xl font-semibold text-ink">
                  {tx(g.label, lang)}
                </span>
                <p className="mt-1 text-sm text-ink-dim">{tx(g.blurb, lang)}</p>
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-volt">
                {t("goalPlan.eyebrow", { defaultValue: "Your mini-plan" })}
              </p>
              <ol className="mt-4 space-y-4">
                {active.plan.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-xs font-semibold text-green">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-ink">{tx(step.title, lang)}</p>
                      <p className="text-sm text-ink-dim">{tx(step.detail, lang)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-dim">
                {t("goalPlan.stack", { defaultValue: "Recommended stack" })}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stack.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </Reveal>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
