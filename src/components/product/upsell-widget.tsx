"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/store/cart";
import { getProductByIdSync } from "@/lib/api";
import { formatBDT } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import type { Product } from "@/types";

const BUNDLE_SAVE = 200;

export function UpsellWidget({ product }: { product: Product }) {
  const lang = useLang();
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const crossId = product.crossSell?.[0];
  const cross = crossId ? getProductByIdSync(crossId) : undefined;
  if (!cross) return null;

  const handleAdd = () => {
    add(cross.id, cross.flavours[0].id, 1);
    setAdded(true);
  };

  return (
    <div className="rounded-2xl border-t-2 border-amber bg-surface-1 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber">
        Frequently bought together
      </p>
      <div className="mt-3 flex items-center gap-3">
        <img
          src={cross.images[0]}
          alt=""
          className="h-14 w-14 rounded-lg bg-surface-2 object-contain p-1"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-ink">{cross.name}</p>
          <p className="text-xs text-ink-dim">Add & save {formatBDT(BUNDLE_SAVE, lang)}</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-amber px-3 text-xs font-semibold text-black transition hover:opacity-90"
        >
          {added ? (
            <>
              Added <Check className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              Add <Plus className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
