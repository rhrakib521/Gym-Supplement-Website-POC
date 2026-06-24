"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { getCategoriesSync } from "@/lib/api";

export function TopUtilityBar() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <div className="border-b border-line bg-surface-1">
      <div className="container-page flex h-9 items-center justify-between text-[11px] text-ink-dim">
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-green" />
          <span className="hidden sm:inline">
            {t("topbar.trust", {
              defaultValue: "100% Authentic · Lab-Tested · Made in Bangladesh",
            })}
          </span>
          <span className="sm:hidden">
            {t("topbar.trustShort", { defaultValue: "100% Authentic" })}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <Link href="/track" className="hover:text-ink">
            {t("nav.trackOrder")}
          </Link>
          <Link href="/science" className="hidden hover:text-ink sm:inline">
            {t("nav.science")}
          </Link>
          <Link href="/creatine" className="hover:text-green">
            {tx(getCategoriesSync()[0]?.name, lang) || "Creatine"}
          </Link>
        </div>
      </div>
    </div>
  );
}
