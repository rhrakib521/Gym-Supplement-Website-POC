"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, User, ShoppingBag, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/ui/logo";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { MegaPanel } from "./mega-menu";
import { useCartCount } from "@/store/cart";
import { useUi } from "@/store/ui";
import { getCategoriesSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/use-lang";

export function Navbar() {
  const { t } = useTranslation();
  const lang = useLang();
  const [scrolled, setScrolled] = useState(false);
  const count = useCartCount();
  const setMenuOpen = useUi((s) => s.setMenuOpen);
  const categories = getCategoriesSync();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-bg",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((cat) => {
            const dim = cat.status !== "live";
            return (
              <div key={cat.slug} className="group relative">
                <Link
                  href={cat.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    dim ? "text-ink-dim hover:text-ink" : "text-ink hover:text-green",
                  )}
                >
                  {tx(cat.name, lang)}
                  {dim ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" title={tx(cat.badge, lang)} />
                  ) : null}
                </Link>

                {/* hover bridge + panel */}
                <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="rounded-2xl border border-line bg-surface-1 shadow-2xl shadow-black/40">
                    <MegaPanel cat={cat} />
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-label={t("nav.search")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            href="/account"
            aria-label={t("nav.account")}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-surface-2 hover:text-ink sm:inline-flex"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/track"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium text-ink-dim transition-colors hover:border-ink hover:text-ink xl:inline-flex"
          >
            <MapPin className="h-3.5 w-3.5" />
            {t("nav.trackOrder")}
          </Link>
          <button
            type="button"
            onClick={() => useUi.getState().setCartOpen(true)}
            aria-label={t("nav.cart")}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-green px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            aria-label={t("nav.menu")}
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-surface-2 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
