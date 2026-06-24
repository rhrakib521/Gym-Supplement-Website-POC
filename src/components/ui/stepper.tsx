"use client";

import { Sprout, FlaskConical, Package, QrCode } from "lucide-react";
import { tx } from "@/lib/format";
import type { Lang, TrustIcon } from "@/types";

const ICONS: Record<TrustIcon, React.ComponentType<{ className?: string }>> = {
  source: Sprout,
  lab: FlaskConical,
  jar: Package,
  qr: QrCode,
};

export function Stepper({
  steps,
  lang,
}: {
  steps: {
    id: string;
    icon: TrustIcon;
    title: { en: string; bn?: string };
    detail: { en: string; bn?: string };
  }[];
  lang: Lang;
}) {
  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {steps.map((s, i) => {
        const Icon = ICONS[s.icon];
        return (
          <li key={s.id} className="relative">
            <div className="flex items-center gap-3 md:block">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface-1 text-green">
                <Icon className="h-5 w-5" />
              </span>
              {i < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="hidden h-px flex-1 bg-line md:absolute md:left-11 md:top-[22px] md:block md:w-[calc(100%-3rem)]"
                />
              ) : null}
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-volt">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-ink">
              {tx(s.title, lang)}
            </h3>
            <p className="mt-1 text-sm text-ink-dim">{tx(s.detail, lang)}</p>
          </li>
        );
      })}
    </ol>
  );
}
