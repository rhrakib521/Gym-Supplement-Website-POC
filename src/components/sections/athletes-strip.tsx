"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAthletesSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { SectionHeading } from "./section-heading";

export function AthletesStrip() {
  const lang = useLang();
  const athletes = getAthletesSync();

  return (
    <section className="py-20 md:py-24">
      <Container>
        <SectionHeading eyebrow="Thryve athletes" title="Trusted by people who lift" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {athletes.map((a) => (
            <figure
              key={a.id}
              className="group overflow-hidden rounded-2xl border border-line bg-surface-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg font-semibold text-ink">{a.name}</p>
                  <p className="text-xs text-ink-dim">
                    {tx(a.sport, lang)} · {tx(a.city, lang)}
                  </p>
                </figcaption>
              </div>
              <div className="p-4">
                <Quote className="h-4 w-4 text-green/60" />
                <blockquote className="mt-2 text-sm text-ink-dim">
                  {tx(a.quote, lang)}
                </blockquote>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-dim">
                    Code <span className="font-semibold text-green">{a.code}</span>
                  </span>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
