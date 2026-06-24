"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

function Track({ products }: { products: Product[] }) {
  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23%]"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

export function ProductCarousel({
  products,
  tabs,
  defaultTabId,
}: {
  products?: Product[];
  tabs?: { id: string; label: string; products: Product[] }[];
  defaultTabId?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(defaultTabId ?? tabs?.[0]?.id);

  const scrollBy = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 560), behavior: "smooth" });
  };

  const shown = tabs?.find((t) => t.id === active)?.products ?? products ?? [];

  return (
    <div>
      {tabs && tabs.length > 1 ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                t.id === active
                  ? "border-green bg-green text-black"
                  : "border-line text-ink-dim hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative">
        <div ref={scroller}>
          <Track products={shown} />
        </div>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          className="absolute -left-3 top-[28%] hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/90 text-ink backdrop-blur hover:border-green hover:text-green md:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollBy(1)}
          className="absolute -right-3 top-[28%] hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/90 text-ink backdrop-blur hover:border-green hover:text-green md:inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
