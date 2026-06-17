import Link from "next/link";
import { cn } from "@/lib/utils";

export function ThryveMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path d="M5 8h22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 8v18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  className,
  withWordmark = true,
  href = "/",
}: {
  className?: string;
  withWordmark?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Thryve — home"
      className={cn("inline-flex items-center gap-2.5 text-ink", className)}
    >
      <ThryveMark className="h-5 w-5 text-green" />
      {withWordmark ? (
        <span className="font-display text-base font-bold tracking-[0.22em]">
          THRYVE
        </span>
      ) : null}
    </Link>
  );
}
