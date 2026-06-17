"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const thumbs = Array.from(new Set(images));
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface-1">
        <img
          src={thumbs[active] ?? thumbs[0]}
          alt={alt}
          className="h-full w-full object-contain p-8 transition-transform duration-500 hover:scale-[1.06]"
        />
      </div>

      {thumbs.length > 1 ? (
        <div className="mt-3 flex gap-3">
          {thumbs.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-xl border bg-surface-1",
                active === i ? "border-green" : "border-line hover:border-ink",
              )}
            >
              <img src={src} alt="" className="h-full w-full object-contain p-2" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
