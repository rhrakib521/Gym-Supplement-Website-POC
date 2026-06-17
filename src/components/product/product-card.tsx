"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Stars } from "@/components/ui/stars";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const lang = useLang();
  const add = useCart((s) => s.add);
  const primary = product.flavours[0];

  return (
    <div className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface-1"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} kind={b} />
          ))}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-green">
          <h3 className="text-[15px] font-medium text-ink">{product.name}</h3>
        </Link>
        <p className="mt-0.5 text-sm text-ink-dim">{tx(product.variantLabel, lang)}</p>
        <div className="mt-2">
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Price price={product.price} compareAt={product.compareAt} size="sm" />
          <button
            type="button"
            onClick={() => add(product.id, primary.id, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green text-black transition-colors hover:bg-green-deep hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
