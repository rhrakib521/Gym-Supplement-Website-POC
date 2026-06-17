"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { applyStoredLanguage } from "@/i18n/client";

export function Providers({ children }: { children: React.ReactNode }) {
  // SSR renders EN; after mount we switch to the user's stored preference.
  useEffect(() => {
    void applyStoredLanguage();
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
