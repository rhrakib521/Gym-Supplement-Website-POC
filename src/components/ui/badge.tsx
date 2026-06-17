import type { Badge as BadgeKind } from "@/types";
import { cn } from "@/lib/utils";

const MAP: Record<BadgeKind, { label: string; cls: string }> = {
  bestseller: { label: "Bestseller", cls: "bg-green/12 text-green ring-green/30" },
  lab_tested: { label: "Lab Tested", cls: "bg-amber/12 text-amber ring-amber/30" },
  qr: { label: "QR Authentic", cls: "bg-blue/12 text-blue ring-blue/30" },
  new: { label: "New", cls: "bg-surface-2 text-ink ring-line" },
  sale: { label: "Sale", cls: "bg-red/12 text-red ring-red/30" },
};

export function Badge({
  kind,
  className,
}: {
  kind: BadgeKind;
  className?: string;
}) {
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
