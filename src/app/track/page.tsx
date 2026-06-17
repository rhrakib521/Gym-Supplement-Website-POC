"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Search, MessageCircle } from "lucide-react";
import { trackByPhone, type TrackedOrder } from "@/lib/api";
import { isValidBdPhone, normalizeBdPhone, formatBDT } from "@/lib/format";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

const STATUS: Record<TrackedOrder["status"], string> = {
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
};

export default function TrackPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<TrackedOrder[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidBdPhone(phone)) {
      setErr("Enter a valid BD number (01XXXXXXXXX)");
      return;
    }
    setErr("");
    setLoading(true);
    const r = await trackByPhone(normalizeBdPhone(phone));
    setOrders(r);
    setLoading(false);
  };

  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("ORDER")}`;

  return (
    <>
      <PageHeader
        eyebrow="Track order"
        title="Where's my Thryve?"
        subtitle="Enter the phone number you ordered with — we'll pull up your last few orders. No account needed."
      />
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={submit} className="rounded-2xl border border-line bg-surface-1 p-6">
            <label className="text-sm font-medium">Phone number</label>
            <div className="mt-2 flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  inputMode="tel"
                  className="h-11 w-full rounded-[10px] border border-line bg-bg pl-9 pr-3 text-sm outline-none focus:border-green"
                />
              </div>
              <Button type="submit" disabled={loading}>{loading ? "…" : "Track"}</Button>
            </div>
            {err ? <p className="mt-2 text-xs text-red">{err}</p> : null}

            {orders ? (
              <ul className="mt-6 space-y-3">
                {orders.map((o) => (
                  <li key={o.id} className="rounded-xl border border-line p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">{o.id}</span>
                      <span className="rounded-full bg-green/12 px-2 py-0.5 text-xs text-green">
                        {STATUS[o.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-ink-dim">
                      Placed {o.placedAt} · ETA {o.eta} · {formatBDT(o.total)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </form>

          <div className="rounded-2xl border border-line bg-surface-1 p-6">
            <MessageCircle className="h-6 w-6 text-green" />
            <p className="mt-3 font-medium">Prefer WhatsApp?</p>
            <p className="mt-1 text-sm text-ink-dim">
              Send <span className="font-mono text-ink">ORDER</span> to us and our bot replies with your
              status — in Bangla or English.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-[10px] bg-green px-4 text-sm font-medium text-black hover:bg-green-deep hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
