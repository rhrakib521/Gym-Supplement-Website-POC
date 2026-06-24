"use client";

import { useTranslation } from "react-i18next";
import { formatBDT } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Lang } from "@/types";

const sizeCls = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl md:text-4xl",
} as const;

export function Price({
  price,
  compareAt,
  size = "md",
  lang,
  className,
}: {
  price: number;
  compareAt?: number;
  size?: keyof typeof sizeCls;
  lang?: Lang;
  className?: string;
}) {
  const { i18n } = useTranslation();
  const l: Lang = lang ?? (i18n.language === "bn" ? "bn" : "en");
  const pct =
    compareAt && compareAt > price
      ? Math.round((1 - price / compareAt) * 100)
      : 0;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-display font-semibold tracking-tight", sizeCls[size])}>
        {formatBDT(price, l)}
      </span>
      {compareAt && compareAt > price ? (
        <span className="text-sm text-ink-dim line-through">
          {formatBDT(compareAt, l)}
        </span>
      ) : null}
      {pct > 0 ? (
        <span className="rounded-md bg-amber/12 px-1.5 py-0.5 text-xs font-bold text-amber">
          −{l === "bn" ? toBn(pct) : pct}%
        </span>
      ) : null}
    </div>
  );
}

function toBn(n: number) {
  const map: Record<string, string> = { "0":"০","1":"১","2":"২","3":"৩","4":"৪","5":"৫","6":"৬","7":"৭","8":"৮","9":"৯" };
  return String(n).replace(/[0-9]/g, (d) => map[d]);
}
