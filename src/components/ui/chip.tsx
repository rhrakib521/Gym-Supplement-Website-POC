import * as React from "react";
import { cn } from "@/lib/utils";

export function Chip({
  icon: Icon,
  children,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-ink-dim",
        className,
      )}
    >
      {Icon ? <Icon className="h-4 w-4 text-green" /> : null}
      {children}
    </span>
  );
}
