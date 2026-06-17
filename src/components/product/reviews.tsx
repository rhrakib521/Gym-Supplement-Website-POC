"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { getReviewsForSync } from "@/lib/api";
import { Stars } from "@/components/ui/stars";
import { formatDate } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import type { Product } from "@/types";

export function Reviews({ product }: { product: Product }) {
  const lang = useLang();
  const all = getReviewsForSync(product.id);
  const [show, setShow] = useState(5);
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: all.filter((r) => r.rating === star).length,
  }));
  const total = all.length || 1;

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <div>
        <p className="font-display text-5xl font-bold">{product.rating.toFixed(1)}</p>
        <Stars rating={product.rating} className="mt-2" />
        <p className="mt-1 text-sm text-ink-dim">{product.reviewCount} reviews</p>
        <div className="mt-6 space-y-2">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-2 text-xs text-ink-dim">
              <span className="w-3">{d.star}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full bg-amber" style={{ width: `${(d.count / total) * 100}%` }} />
              </div>
              <span className="w-5 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="space-y-4">
        {all.slice(0, show).map((r) => (
          <li key={r.id} className="rounded-2xl border border-line bg-surface-1 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium">
                  {r.name}
                  {r.verified ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-green">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-ink-dim">{r.city}</p>
              </div>
              <Stars rating={r.rating} size={12} />
            </div>
            <p className="mt-3 text-sm text-ink-dim">{r.text}</p>
            <p className="mt-3 text-xs text-ink-dim">{formatDate(r.date, lang)}</p>
          </li>
        ))}
        {all.length > show ? (
          <li>
            <button
              onClick={() => setShow((s) => s + 5)}
              className="text-sm font-medium text-green hover:underline"
            >
              Show more reviews
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
