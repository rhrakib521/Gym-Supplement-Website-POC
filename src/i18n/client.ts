"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import bn from "@/locales/bn.json";

export const SUPPORTED_LANGS = ["en", "bn"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = localStorage.getItem("thryve-lang");
    if (stored === "en" || stored === "bn") return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
    },
    lng: DEFAULT_LANG, // server + first client render = EN (no hydration mismatch)
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    returnObjects: true,
  });
}

/** Switch language everywhere (i18n + <html> attrs + persist). Call from client only. */
export async function changeLanguage(lang: Lang) {
  await i18n.changeLanguage(lang);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
  }
  try {
    localStorage.setItem("thryve-lang", lang);
  } catch {
    /* ignore */
  }
}

/** Apply the stored language after mount (keeps SSR EN, avoids hydration mismatch). */
export function applyStoredLanguage() {
  const lang = getInitialLang();
  if (lang !== i18n.language) {
    return changeLanguage(lang);
  }
  return Promise.resolve();
}

export default i18n;
