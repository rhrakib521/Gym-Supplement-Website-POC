"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type Cat = "all" | "creatine" | "accessories";
type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function ShopBrowser({ products }: { products: Product[] }) {
  const [cat, setCat] = useState<Cat>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const cats: Cat[] = ["all", "creatine", "accessories"];

  const list = [...products]
    .filter((p) => (cat === "all" ? true : p.category === cat))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm capitalize transition-colors",
                  cat === c ? "border-green bg-green text-black" : "border-line hover:border-ink",
                )}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-ink-dim">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-green"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
