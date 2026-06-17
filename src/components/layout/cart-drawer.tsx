"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUi } from "@/store/ui";
import { useCart, useCartSubtotal } from "@/store/cart";
import { getProductByIdSync } from "@/lib/api";
import { formatBDT, tx } from "@/lib/format";
import { site } from "@/data/site";
import { useLang } from "@/lib/use-lang";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { t } = useTranslation();
  const lang = useLang();
  const open = useUi((s) => s.cartOpen);
  const setOpen = useUi((s) => s.setCartOpen);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCartSubtotal();

  const remaining = Math.max(0, site.freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, (subtotal / site.freeDeliveryThreshold) * 100);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bg shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            role="dialog"
            aria-label={t("nav.cart")}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="font-display text-lg font-semibold">
                {t("nav.cart")}{" "}
                <span className="text-ink-dim">({lines.reduce((n, l) => n + l.qty, 0)})</span>
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-dim hover:bg-surface-2 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-ink-dim" />
                <p className="text-ink-dim">{t("nav.cart")} is empty</p>
                <Button href="/creatine" onClick={() => setOpen(false)}>
                  {t("hero.ctaShop")}
                </Button>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-5 py-3">
                  <div className="flex items-center justify-between text-xs text-ink-dim">
                    <span>
                      {remaining > 0
                        ? `${formatBDT(remaining, lang)} to free delivery`
                        : "You've unlocked free delivery"}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-green transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-4">
                    {lines.map((line) => {
                      const p = getProductByIdSync(line.productId);
                      if (!p) return null;
                      const flavour = p.flavours.find((f) => f.id === line.flavourId);
                      return (
                        <li key={`${line.productId}-${line.flavourId}`} className="flex gap-3">
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={() => setOpen(false)}
                            className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-surface-2"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.images[0]} alt={p.name} className="h-full w-full object-contain" />
                          </Link>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between gap-2">
                              <Link
                                href={`/product/${p.slug}`}
                                onClick={() => setOpen(false)}
                                className="text-sm font-medium text-ink hover:text-green"
                              >
                                {p.name}
                              </Link>
                              <button
                                onClick={() => remove(p.id, line.flavourId)}
                                aria-label="Remove"
                                className="text-ink-dim hover:text-red"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            {flavour ? (
                              <p className="text-xs text-ink-dim">{tx(flavour.name, lang)}</p>
                            ) : null}
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="inline-flex items-center rounded-full border border-line">
                                <button
                                  onClick={() => setQty(p.id, line.flavourId, line.qty - 1)}
                                  aria-label="Decrease"
                                  className="inline-flex h-7 w-7 items-center justify-center text-ink-dim hover:text-ink"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-6 text-center text-sm">{line.qty}</span>
                                <button
                                  onClick={() => setQty(p.id, line.flavourId, line.qty + 1)}
                                  aria-label="Increase"
                                  className="inline-flex h-7 w-7 items-center justify-center text-ink-dim hover:text-ink"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="text-sm font-medium">{formatBDT(p.price * line.qty, lang)}</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="border-t border-line px-5 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-dim">Subtotal</span>
                    <span className="font-display text-lg font-semibold">{formatBDT(subtotal, lang)}</span>
                  </div>
                  <Button href="/checkout" onClick={() => setOpen(false)} size="lg" className="mt-3 w-full">
                    {t("common.buyNow")} <ArrowRight className="h-4 w-4" />
                  </Button>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 w-full text-center text-xs text-ink-dim hover:text-ink"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
