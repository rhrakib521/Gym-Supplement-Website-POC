"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getUgcSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function UgcGrid() {
  const lang = useLang();
  const items = getUgcSync();

  return (
    <section className="py-14 md:py-20">
      <Container>
        <SectionHeading eyebrow="Thryvergram" title="#ThryveMode" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((it) => (
            <a
              key={it.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-surface-1"
              aria-label={it.handle}
            >
              <img
                src={it.image}
                alt={tx(it.caption, lang)}
                loading="lazy"
                className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-2 text-[10px] font-medium text-ink/90">
                {it.handle}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
