"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function ComingSoon({
  badge,
  title,
  tagline,
  when,
  points,
  accent,
}: {
  badge: string;
  title: string;
  tagline: string;
  when: string;
  points?: string[];
  accent?: boolean;
}) {
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);

  return (
    <Container className="py-20 text-center md:py-28">
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ring-inset ${
          accent ? "bg-green/12 text-green ring-green/30" : "bg-surface-2 text-ink-dim ring-line"
        }`}
      >
        {badge}
      </span>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-dim">{when}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-md text-ink-dim">{tagline}</p>

      {points?.length ? (
        <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm text-ink-dim">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" /> {p}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mx-auto mt-10 max-w-sm">
        {done ? (
          <p className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-4 py-3 text-sm text-green">
            <Check className="h-4 w-4" /> You&apos;re on the list — we&apos;ll text you first.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (value.trim()) setDone(true);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="tel"
              placeholder="Phone (01XXXXXXXXX)"
              className="h-11 w-full rounded-[10px] border border-line bg-bg px-3 text-sm outline-none focus:border-green"
            />
            <Button type="submit">Notify me</Button>
          </form>
        )}
        <p className="mt-3 text-xs text-ink-dim">Be first in line. No spam — just the drop.</p>
      </div>
    </Container>
  );
}
