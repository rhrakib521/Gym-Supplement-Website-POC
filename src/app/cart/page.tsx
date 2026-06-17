"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart, useCartSubtotal } from "@/store/cart";
import { getProductByIdSync } from "@/lib/api";
import { formatBDT, tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const DELIVERY_FEE = 60;

export default function CartPage() {
  const lang = useLang();
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCartSubtotal();
  const delivery = subtotal >= site.freeDeliveryThreshold || subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  if (lines.length === 0) {
    return (
      <Container className="py-24 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-ink-dim" />
        <h1 className="mt-4 font-display text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-ink-dim">Let&apos;s fix that.</p>
        <Button href="/creatine" className="mt-6">
          Shop Creatine
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="font-display text-3xl font-semibold">Cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-line border-y border-line">
          {lines.map((line) => {
            const p = getProductByIdSync(line.productId);
            if (!p) return null;
            const flavour = p.flavours.find((f) => f.id === line.flavourId);
            return (
              <li key={`${line.productId}-${line.flavourId}`} className="flex gap-4 py-5">
                <Link
                  href={`/product/${p.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-line bg-surface-2"
                >
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-contain p-2" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link href={`/product/${p.slug}`} className="font-medium hover:text-green">
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
                    <p className="text-sm text-ink-dim">{tx(flavour.name, lang)}</p>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center rounded-full border border-line">
                      <button
                        onClick={() => setQty(p.id, line.flavourId, line.qty - 1)}
                        aria-label="Decrease"
                        className="inline-flex h-8 w-8 items-center justify-center text-ink-dim hover:text-ink"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <button
                        onClick={() => setQty(p.id, line.flavourId, line.qty + 1)}
                        aria-label="Increase"
                        className="inline-flex h-8 w-8 items-center justify-center text-ink-dim hover:text-ink"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-medium">{formatBDT(p.price * line.qty, lang)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-2xl border border-line bg-surface-1 p-6">
          <p className="font-display text-lg font-semibold">Summary</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-dim">Subtotal</dt>
              <dd>{formatBDT(subtotal, lang)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-dim">Delivery</dt>
              <dd>{delivery === 0 ? "Free" : formatBDT(delivery, lang)}</dd>
            </div>
            {delivery > 0 ? (
              <p className="text-xs text-ink-dim">
                Add {formatBDT(site.freeDeliveryThreshold - subtotal, lang)} more for free delivery.
              </p>
            ) : null}
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatBDT(total, lang)}</dd>
            </div>
          </dl>
          <Button href="/checkout" size="lg" className="mt-5 w-full">
            Checkout <ArrowRight className="h-4 w-4" />
          </Button>
          <Link
            href="/shop"
            className="mt-3 block text-center text-sm text-ink-dim hover:text-ink"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </Container>
  );
}
