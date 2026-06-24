import type { Badge as BadgeKind } from "@/types";
import { cn } from "@/lib/utils";

const MAP: Record<BadgeKind, { label: string; cls: string }> = {
  bestseller: { label: "Bestseller", cls: "bg-green/12 text-green ring-green/30" },
  lab_tested: { label: "Lab Tested", cls: "bg-amber/12 text-amber ring-amber/30" },
  qr: { label: "QR Authentic", cls: "bg-blue/12 text-blue ring-blue/30" },
  new: { label: "New", cls: "bg-surface-2 text-ink ring-line" },
  // Badge discipline (R2): discount badges are quiet + amber, never screaming red.
  sale: { label: "Save", cls: "bg-amber/12 text-amber ring-amber/30" },
  save: { label: "Save", cls: "bg-amber/12 text-amber ring-amber/30" },
};

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  const { label, cls } = MAP[kind];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ring-inset",
        cls,
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Small, typographic discount chip — e.g. "−13%" or "Save ৳300". Keeps savings subordinate to the product. */
export function DiscountChip({
  pct,
  amount,
  className,
}: {
  pct?: number;
  amount?: number;
  className?: string;
}) {
  const label =
    pct != null
      ? `−${pct}%`
      : amount != null
        ? `Save ৳${new Intl.NumberFormat("en-US").format(amount)}`
        : "";
  if (!label) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-tight text-amber",
        className,
      )}
    >
      {label}
    </span>
  );
}
