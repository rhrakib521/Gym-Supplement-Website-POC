"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getFlavoursSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function FlavourPicker() {
  const { t } = useTranslation();
  const lang = useLang();
  const flavours = getFlavoursSync();

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow="Taste" title="Shop by flavour" />
        <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
          {flavours.map((f) => (
            <Link key={f.id} href={f.href} className="group flex flex-col items-center gap-3">
              <span className="relative h-28 w-28 overflow-hidden rounded-full border border-line bg-surface-1 transition group-hover:border-green md:h-32 md:w-32">
                <img
                  src={f.image}
                  alt={tx(f.name, lang)}
                  loading="lazy"
                  className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="text-sm font-medium text-ink group-hover:text-green">
                {tx(f.name, lang)}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-dim">
          {t("flavours.hint", { defaultValue: "Mixes clean. No fillers, no aftertaste." })}
        </p>
      </Container>
    </section>
  );
}
