import Link from "next/link";
import type { ReactNode } from "react";

export function MegaCol({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-dim">
        {title}
      </p>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

export function MegaLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-md px-2 py-1 -mx-2 text-sm text-ink/80 transition-colors hover:bg-surface-2 hover:text-ink"
      >
        {children}
      </Link>
    </li>
  );
}
