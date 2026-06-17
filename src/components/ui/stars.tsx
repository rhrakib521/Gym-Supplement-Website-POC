import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  count,
  size = 14,
  className,
}: {
  rating: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const row = (cls: string) => (
    <span className={cn("flex", cls)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} style={{ width: size, height: size }} className="shrink-0" fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex">
        {row("text-ink-dim/25")}
        <span
          className="absolute inset-0 overflow-hidden text-amber"
          style={{ width: `${pct}%` }}
        >
          {row("text-amber")}
        </span>
      </span>
      <span className="text-xs text-ink-dim">
        {rating.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </span>
  );
}
