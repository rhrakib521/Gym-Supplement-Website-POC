"use client";

import { useTranslation } from "react-i18next";
import type { Lang } from "@/types";

/** Convenience hook: current language as a typed `Lang`. */
export function useLang(): Lang {
  const { i18n } = useTranslation();
  return i18n.language === "bn" ? "bn" : "en";
}
