"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RefreshCw,
  QrCode,
} from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/store/cart";
import { useUi } from "@/store/ui";
import { tx, formatBDT } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Stars } from "@/components/ui/stars";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "./product-gallery";
import { Reviews } from "./reviews";
import { UpsellWidget } from "./upsell-widget";

const TABS = ["About", "Ingredients", "How to use", "Reviews", "Lab certificate"] as const;
type Tab = (typeof TABS)[number];

export function ProductDetail({ product }: { product: Product }) {
  const lang = useLang();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const setCartOpen = useUi((s) => s.setCartOpen);

  const [flavourId, setFlavourId] = useState(product.flavours[0].id);
  const [qty, setQty] = useState(1);
  const [mode, setMode] = useState<"once" | "subscribe">("once");
  const [tab, setTab] = useState<Tab>("About");

  const flavour = product.flavours.find((f) => f.id === flavourId) ?? product.flavours[0];
  const discount = mode === "subscribe" ? product.subscriptionDiscount ?? 0 : 0;
  const unitPrice = discount ? Math.round(product.price * (1 - discount / 100)) : product.price;

  const addToCart = () => {
    add(product.id, flavour.id, qty);
    setCartOpen(true);
  };

  const buyNow = () => {
    add(product.id, flavour.id, qty);
    router.push("/checkout");
  };

  return (
    <div className="container-page py-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <Badge key={b} kind={b} />
            ))}
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-1 text-ink-dim">{tx(product.variantLabel, lang)}</p>
          <div className="mt-3">
            <Stars rating={product.rating} count={product.reviewCount} />
          </div>

          <div className="mt-6">
            {mode === "subscribe" ? (
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-display text-3xl font-semibold">{formatBDT(unitPrice, lang)}</span>
                <span className="text-ink-dim line-through">{formatBDT(product.price, lang)}</span>
                <span className="rounded bg-green/12 px-1.5 py-0.5 text-xs text-green">Save {discount}%</span>
                <span className="text-sm text-ink-dim">{formatBDT(unitPrice, lang)}{lang === "bn" ? "/মাস" : "/mo"}</span>
              </div>
            ) : (
              <Price price={product.price} compareAt={product.compareAt} size="lg" />
            )}
          </div>

          {product.subscriptionDiscount ? (
            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-line p-1">
              <button
                type="button"
                onClick={() => setMode("once")}
                className={cn("rounded-xl px-4 py-3 text-left transition-colors", mode === "once" ? "bg-surface-2 ring-1 ring-green" : "hover:bg-surface-2")}
              >
                <span className="block text-sm font-medium">One-time</span>
                <span className="text-xs text-ink-dim">{formatBDT(product.price, lang)}</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("subscribe")}
                className={cn("rounded-xl px-4 py-3 text-left transition-colors", mode === "subscribe" ? "bg-surface-2 ring-1 ring-green" : "hover:bg-surface-2")}
              >
                <span className="block text-sm font-medium">Subscribe & Save {product.subscriptionDiscount}%</span>
                <span className="text-xs text-green">{formatBDT(unitPrice, lang)}/mo</span>
              </button>
            </div>
          ) : null}

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-dim">Flavour</p>
            <div className="flex flex-wrap gap-2">
              {product.flavours.map((f) => {
                const selected = f.id === flavourId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    disabled={!f.inStock}
                    onClick={() => setFlavourId(f.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors disabled:opacity-40",
                      selected ? "border-green bg-green text-black" : "border-line hover:border-ink",
                    )}
                  >
                    {tx(f.name, lang)}
                  </button>
                );
              })}
            </div>
            {flavour.stockCount && flavour.stockCount <= 10 ? (
              <p className="mt-2 text-xs text-amber">Only {flavour.stockCount} left</p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-line">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="inline-flex h-11 w-11 items-center justify-center text-ink-dim hover:text-ink">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="inline-flex h-11 w-11 items-center justify-center text-ink-dim hover:text-ink">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={addToCart} size="lg" className="min-w-[180px] flex-1">
              <ShoppingBag className="h-4 w-4" /> Add to Cart · {formatBDT(unitPrice * qty, lang)}
            </Button>
          </div>
          <Button onClick={buyNow} variant="secondary" size="lg" className="mt-2 w-full">
            <Zap className="h-4 w-4" /> Buy Now
          </Button>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-ink-dim sm:grid-cols-4">
            {[
              { i: Truck, t: `Free over ${formatBDT(site.freeDeliveryThreshold, lang)}` },
              { i: ShoppingBag, t: "COD available" },
              { i: RefreshCw, t: "7-day returns" },
              { i: QrCode, t: "QR verified" },
            ].map(({ i: I, t }, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <I className="h-4 w-4 text-green" /> {t}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <UpsellWidget product={product} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {site.payments.map((p) => (
              <span key={p} className="rounded border border-line px-2 py-1 text-[10px] text-ink-dim">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap gap-1 border-b border-line">
          {TABS.map((tb) => (
            <button
              key={tb}
              type="button"
              onClick={() => setTab(tb)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium transition-colors",
                tab === tb ? "text-ink" : "text-ink-dim hover:text-ink",
              )}
            >
              {tb}
              {tab === tb ? <span className="absolute inset-x-2 -bottom-px h-0.5 bg-green" /> : null}
            </button>
          ))}
        </div>

        <div className="py-8 leading-relaxed text-ink-dim">
          {tab === "About" ? <p className="max-w-3xl text-pretty">{tx(product.about, lang)}</p> : null}
          {tab === "Ingredients" ? <p className="max-w-3xl text-pretty">{tx(product.ingredients, lang)}</p> : null}
          {tab === "How to use" ? <p className="max-w-3xl text-pretty">{tx(product.howToUse, lang)}</p> : null}
          {tab === "Reviews" ? <Reviews product={product} /> : null}
          {tab === "Lab certificate" ? (
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface-1 p-5">
                <ShieldCheck className="h-8 w-8 text-green" />
                <div className="flex-1">
                  <p className="font-medium text-ink">Batch LN-204 · 3rd-party tested</p>
                  <p className="text-sm text-ink-dim">Purity and heavy metals verified per batch.</p>
                </div>
                <a href={product.certificateUrl ?? "#"} className="text-sm font-medium text-green hover:underline">
                  View certificate
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
