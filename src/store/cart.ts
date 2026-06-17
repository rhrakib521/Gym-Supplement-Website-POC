"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";
import { getProductByIdSync } from "@/lib/api";

interface CartState {
  lines: CartLine[];
  add: (productId: string, flavourId: string, qty?: number) => void;
  remove: (productId: string, flavourId: string) => void;
  setQty: (productId: string, flavourId: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (productId, flavourId, qty = 1) =>
        set((s) => {
          const existing = s.lines.find(
            (l) => l.productId === productId && l.flavourId === flavourId,
          );
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l === existing ? { ...l, qty: l.qty + qty } : l,
              ),
            };
          }
          return { lines: [...s.lines, { productId, flavourId, qty }] };
        }),
      remove: (productId, flavourId) =>
        set((s) => ({
          lines: s.lines.filter(
            (l) => !(l.productId === productId && l.flavourId === flavourId),
          ),
        })),
      setQty: (productId, flavourId, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) =>
              l.productId === productId && l.flavourId === flavourId
                ? { ...l, qty: Math.max(0, qty) }
                : l,
            )
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "thryve-cart" },
  ),
);

/** Derived helpers (call inside components) */
export function useCartCount(): number {
  return useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
}

export function useCartSubtotal(): number {
  return useCart((s) =>
    s.lines.reduce((sum, l) => {
      const p = getProductByIdSync(l.productId);
      return sum + (p ? p.price * l.qty : 0);
    }, 0),
  );
}
