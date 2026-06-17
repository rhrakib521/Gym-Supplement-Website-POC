"use client";

import { useTranslation } from "react-i18next";
import { Marquee } from "@/components/ui/marquee";

export function MarqueeBar() {
  const { t } = useTranslation();
  const items = t("marquee", { returnObjects: true }) as string[];

  return (
    <div className="border-y border-green/40 bg-green text-black">
      <Marquee
        className="py-2.5"
        items={items.map((it, i) => (
          <span key={i} className="text-xs font-semibold uppercase tracking-[0.18em]">
            {it}
          </span>
        ))}
        separator={<span className="mx-5 text-black/40">/</span>}
      />
    </div>
  );
}
