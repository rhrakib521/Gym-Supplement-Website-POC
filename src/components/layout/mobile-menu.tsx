"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUi } from "@/store/ui";
import { getCategoriesSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { Logo } from "@/components/ui/logo";
import { LanguageToggle } from "./language-toggle";

export function MobileMenu() {
  const { t } = useTranslation();
  const lang = useLang();
  const open = useUi((s) => s.menuOpen);
  const setOpen = useUi((s) => s.setMenuOpen);
  const categories = getCategoriesSync();

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={close} />
          <motion.div
            className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-bg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-dim hover:bg-surface-2 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-dim">
                {t("footer.shop")}
              </p>
              <ul className="space-y-0.5">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={cat.href}
                      onClick={close}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface-2"
                    >
                      <span>{tx(cat.name, lang)}</span>
                      {cat.status !== "live" ? (
                        <span className="text-[10px] uppercase tracking-wide text-amber">
                          {tx(cat.badge, lang)}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="hairline my-4" />

              <ul className="space-y-0.5">
                {[
                  { href: "/athletes", label: t("nav.athletes") },
                  { href: "/science", label: t("nav.science") },
                  { href: "/blog", label: t("nav.journal") },
                  { href: "/about", label: t("nav.about") },
                  { href: "/contact", label: t("nav.contact") },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className="block rounded-lg px-3 py-3 text-base text-ink-dim hover:bg-surface-2 hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/track"
                    onClick={close}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-base text-ink-dim hover:bg-surface-2 hover:text-ink"
                  >
                    <MapPin className="h-4 w-4 text-green" /> {t("nav.trackOrder")}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="border-t border-line px-5 py-4">
              <LanguageToggle />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
