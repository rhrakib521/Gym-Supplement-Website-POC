"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Truck, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/format";
import { site } from "@/data/site";

type Order = {
  id: string;
  items: { name: string; flavour: string; qty: number; price: number }[];
  total: number;
  payment: string;
  address: { name: string; phone: string; address: string; area: string; district: string };
  placedAt: string;
  eta: string;
};

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("thryve-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi Thryve, I just placed order ${id}`)}`;

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green/15">
          <CheckCircle2 className="h-8 w-8 text-green" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold">Order confirmed</h1>
        <p className="mt-2 text-ink-dim">
          Thank you{order?.address?.name ? `, ${order.address.name}` : ""}. Your order{" "}
          <span className="font-mono text-ink">{id}</span> is in.
        </p>
      </div>

      {order ? (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-line bg-surface-1 p-6">
          <div className="flex items-center justify-between border-b border-line pb-4 text-sm">
            <p className="text-ink-dim">Order {order.id}</p>
            <p className="font-medium">{formatBDT(order.total)}</p>
          </div>
          <ul className="divide-y divide-line">
            {order.items.map((it, i) => (
              <li key={i} className="flex justify-between py-3 text-sm">
                <span>
                  {it.name}
                  {it.flavour ? ` · ${it.flavour}` : ""} × {it.qty}
                </span>
                <span>{formatBDT(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { i: Package, t: "Preparing", s: "1–2 days" },
              { i: Truck, t: "Dispatch", s: "Then ships" },
              { i: CheckCircle2, t: "Delivery", s: order.eta },
            ].map((x, i) => (
              <div key={i} className="rounded-xl border border-line p-3 text-center">
                <x.i className="mx-auto h-5 w-5 text-green" />
                <p className="mt-1 text-xs font-medium">{x.t}</p>
                <p className="text-[11px] text-ink-dim">{x.s}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button href="/track" variant="subtle" size="sm">Track order</Button>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-line px-4 text-sm hover:border-ink"
            >
              <MessageCircle className="h-4 w-4 text-green" /> WhatsApp us
            </a>
          </div>
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-ink-dim">
          We&apos;ve received your order. <Link href="/track" className="text-green hover:underline">Track it here</Link>.
        </p>
      )}
      <p className="mt-8 text-center text-sm text-ink-dim">
        A confirmation has been sent to your phone via WhatsApp.
      </p>
    </Container>
  );
}
