"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import type { L, Product } from "@/types";

export function Collection({
  products,
  flavours,
}: {
  products: Product[];
  flavours: { id: string; name: L }[];
}) {
  const lang = useLang();
  const [flavour, setFlavour] = useState("all");

  const list =
    flavour === "all"
      ? products
      : products.filter((p) => p.flavours.some((f) => f.id === flavour));

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFlavour("all")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              flavour === "all" ? "border-green bg-green text-black" : "border-line hover:border-ink",
            )}
          >
            All
          </button>
          {flavours.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFlavour(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                flavour === f.id ? "border-green bg-green text-black" : "border-line hover:border-ink",
              )}
            >
              {tx(f.name, lang)}
            </button>
          ))}
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
