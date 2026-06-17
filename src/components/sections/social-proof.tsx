"use client";

import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function SocialProof() {
  const lang = useLang();
  return (
    <section className="py-8">
      <Container>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {site.stats.map((s) => (
            <div key={s.id} className="bg-surface-1 p-8 text-center">
              <p className="font-display text-3xl font-bold text-green md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-dim">{tx(s.label, lang)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
