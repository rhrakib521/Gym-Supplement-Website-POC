"use client";

import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/i18n/client";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  return (
    <button
      type="button"
      onClick={() => changeLanguage(isBn ? "en" : "bn")}
      aria-label="Switch language"
      className={cn(
        "inline-flex h-9 items-center gap-1 rounded-full border border-line px-3 text-xs font-medium transition-colors hover:border-ink",
        className,
      )}
    >
      <span className={cn(isBn ? "text-ink-dim" : "text-ink")}>EN</span>
      <span className="text-line">·</span>
      <span className={cn(isBn ? "text-ink" : "text-ink-dim")}>বাংলা</span>
    </button>
  );
}
