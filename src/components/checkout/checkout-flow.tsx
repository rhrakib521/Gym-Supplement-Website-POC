"use client";

import { useState } from "react";
import type { ReactNode, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Banknote, CreditCard, ShieldCheck } from "lucide-react";
import { useCart, useCartSubtotal } from "@/store/cart";
import { getProductByIdSync, getAthletesSync } from "@/lib/api";
import { formatBDT, tx, isValidBdPhone, normalizeBdPhone } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const DELIVERY_FEE = 60;
const DIVISIONS: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chattogram: ["Chattogram", "Cumilla", "Cox's Bazar"],
  Khulna: ["Khulna", "Jessore"],
  Rajshahi: ["Rajshahi", "Bogura"],
  Sylhet: ["Sylhet", "Moulvibazar"],
  Barishal: ["Barishal", "Patuakhali"],
  Rangpur: ["Rangpur", "Dinajpur"],
  Mymensingh: ["Mymensingh", "Jamalpur"],
};
const ATHLETE_CODES = new Set(getAthletesSync().map((a) => a.code));
const STEPS = ["Delivery", "Payment", "Review"] as const;

const inputCls =
  "h-11 w-full rounded-[10px] border border-line bg-bg px-3 text-sm outline-none placeholder:text-ink-dim focus:border-green";

export function CheckoutFlow() {
  const router = useRouter();
  const lang = useLang();
  const lines = useCart((s) => s.lines);
  const subtotal = useCartSubtotal();
  const clear = useCart((s) => s.clear);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", phone: "", division: "Dhaka", district: "Dhaka", area: "", address: "", apt: "",
  });
  const [payment, setPayment] = useState<"cod" | "bkash" | "nagad" | "card">("cod");
  const [mobileNo, setMobileNo] = useState("");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const itemCount = lines.reduce((n, l) => n + l.qty, 0);
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= site.freeDeliveryThreshold ? 0 : DELIVERY_FEE;
  const total = Math.max(0, subtotal - promoDiscount) + delivery;

  if (lines.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Your cart is empty</h1>
        <Button href="/creatine" className="mt-6">Shop Creatine</Button>
      </Container>
    );
  }

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateDelivery = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!isValidBdPhone(form.phone)) e.phone = "Enter a valid number (01XXXXXXXXX)";
    if (!form.address.trim()) e.address = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateDelivery()) return;
    setStep((s) => Math.min(2, s + 1));
  };

  const applyPromo = () => {
    setPromoApplied(ATHLETE_CODES.has(promo.trim().toUpperCase()));
  };

  const placeOrder = () => {
    const id = "THV-" + Math.floor(100000 + Math.random() * 900000);
    const order = {
      id,
      items: lines.map((l) => {
        const p = getProductByIdSync(l.productId)!;
        const f = p.flavours.find((x) => x.id === l.flavourId);
        return { name: p.name, flavour: f ? tx(f.name, lang) : "", qty: l.qty, price: p.price };
      }),
      total,
      payment,
      address: form,
      placedAt: new Date().toISOString(),
      eta: "3-5 days",
    };
    try {
      sessionStorage.setItem("thryve-last-order", JSON.stringify(order));
    } catch {}
    clear();
    router.push(`/order/${id}`);
  };

  return (
    <Container className="py-10 md:py-14">
      <ol className="mb-8 flex flex-wrap items-center gap-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold", i <= step ? "bg-green text-black" : "bg-surface-2 text-ink-dim")}>{i + 1}</span>
            <span className={cn(i === step ? "text-ink" : "text-ink-dim")}>{s}</span>
            {i < STEPS.length - 1 ? <ChevronRight className="h-4 w-4 text-ink-dim" /> : null}
          </li>
        ))}
      </ol>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {step === 0 ? (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-semibold">Delivery details</h2>
              <Field label="Full name" error={errors.name}>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Your name" />
              </Field>
              <Field label="Phone number" error={errors.phone} hint="We'll send updates on WhatsApp">
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)} onBlur={(e) => set("phone", normalizeBdPhone(e.target.value))} className={inputCls} placeholder="01XXXXXXXXX" inputMode="tel" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Division">
                  <select value={form.division} onChange={(e) => { set("division", e.target.value); set("district", DIVISIONS[e.target.value][0]); }} className={inputCls}>
                    {Object.keys(DIVISIONS).map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="District">
                  <select value={form.district} onChange={(e) => set("district", e.target.value)} className={inputCls}>
                    {(DIVISIONS[form.division] ?? []).map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Area / Thana">
                <input value={form.area} onChange={(e) => set("area", e.target.value)} className={inputCls} placeholder="e.g. Banani" />
              </Field>
              <Field label="Full address" error={errors.address}>
                <input value={form.address} onChange={(e) => set("address", e.target.value)} className={inputCls} placeholder="House, road, landmark" />
              </Field>
              <Field label="Apartment / flat (optional)">
                <input value={form.apt} onChange={(e) => set("apt", e.target.value)} className={inputCls} />
              </Field>
              <Button onClick={next}>Continue to payment</Button>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold">Payment method</h2>
              <PayOption active={payment === "cod"} onClick={() => setPayment("cod")} title="Cash on Delivery" desc="Pay when it arrives. Most popular in Bangladesh." icon={Banknote} badge="Recommended" />
              <PayOption active={payment === "bkash"} onClick={() => setPayment("bkash")} title="bKash" desc="Enter your number, confirm OTP." icon={CreditCard}>
                {payment === "bkash" ? (
                  <div className="mt-3 space-y-2 border-t border-line pt-3">
                    <input value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder="Your bKash number (01XXXXXXXXX)" className={inputCls} />
                    <p className="text-xs text-ink-dim">An OTP will be sent to confirm (demo).</p>
                  </div>
                ) : null}
              </PayOption>
              <PayOption active={payment === "nagad"} onClick={() => setPayment("nagad")} title="Nagad" desc="Number + OTP, same as bKash." icon={CreditCard} />
              <PayOption active={payment === "card"} onClick={() => setPayment("card")} title="Card (Visa / Mastercard)" desc="Securely via SSLCommerz. You'll be redirected." icon={CreditCard} />
              <div className="flex gap-2 pt-2">
                <Button variant="subtle" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={next}>Continue to review</Button>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold">Review & confirm</h2>
              <div className="rounded-2xl border border-line bg-surface-1 p-5 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{form.name}</p>
                    <p className="text-ink-dim">{normalizeBdPhone(form.phone)}</p>
                    <p className="mt-1 text-ink-dim">{form.address}{form.apt ? `, ${form.apt}` : ""}, {form.area}, {form.district}, {form.division}</p>
                  </div>
                  <button onClick={() => setStep(0)} className="text-xs text-green hover:underline">Edit</button>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-ink-dim">Payment</span>
                  <span>{payment === "cod" ? "Cash on Delivery" : payment === "bkash" ? "bKash" : payment === "nagad" ? "Nagad" : "Card"}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input value={promo} onChange={(e) => { setPromo(e.target.value); setPromoApplied(false); }} placeholder="Athlete / promo code (try TANVIR10)" className={inputCls} />
                <Button variant="subtle" onClick={applyPromo}>Apply</Button>
                {promoApplied ? <span className="inline-flex items-center gap-1 text-xs text-green"><Check className="h-3.5 w-3.5" /> 10% off</span> : null}
              </div>

              <Button onClick={placeOrder} size="lg" className="w-full">Place Order · {formatBDT(total, lang)}</Button>
              <p className="text-center text-xs text-ink-dim">By placing your order you agree to Thryve&apos;s terms. Cash on delivery available nationwide.</p>
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface-1 p-6">
          <p className="font-display text-base font-semibold">Your order ({itemCount})</p>
          <ul className="mt-4 space-y-3">
            {lines.map((l) => {
              const p = getProductByIdSync(l.productId);
              if (!p) return null;
              return (
                <li key={`${l.productId}-${l.flavourId}`} className="flex items-center gap-3 text-sm">
                  <img src={p.images[0]} alt="" className="h-10 w-10 rounded bg-surface-2 object-contain p-1" />
                  <div className="flex-1">
                    <p className="font-medium">{p.name} × {l.qty}</p>
                    <p className="text-xs text-ink-dim">{tx(p.flavours.find((f) => f.id === l.flavourId)?.name, lang)}</p>
                  </div>
                  <span>{formatBDT(p.price * l.qty, lang)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-ink-dim">Subtotal</dt><dd>{formatBDT(subtotal, lang)}</dd></div>
            {promoApplied ? <div className="flex justify-between"><dt className="text-ink-dim">Promo (10%)</dt><dd className="text-amber">−{formatBDT(promoDiscount, lang)}</dd></div> : null}
            <div className="flex justify-between"><dt className="text-ink-dim">Delivery</dt><dd>{delivery === 0 ? "Free" : formatBDT(delivery, lang)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatBDT(total, lang)}</dd></div>
          </dl>
          <div className="mt-4 flex items-center gap-2 text-xs text-ink-dim"><ShieldCheck className="h-4 w-4 text-green" /> Secure checkout</div>
        </aside>
      </div>
    </Container>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {hint && !error ? <span className="mt-1 block text-xs text-ink-dim">{hint}</span> : null}
      {error ? <span className="mt-1 block text-xs text-red">{error}</span> : null}
    </label>
  );
}

function PayOption({
  active, onClick, title, desc, icon: Icon, badge, children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className={cn("w-full rounded-2xl border p-4 text-left transition-colors", active ? "border-green bg-green/5" : "border-line hover:border-ink")}>
      <div className="flex items-center gap-3">
        <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full", active ? "bg-green text-black" : "bg-surface-2 text-ink-dim")}><Icon className="h-5 w-5" /></span>
        <div className="flex-1">
          <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {title}
            {badge ? <span className="rounded-full bg-green/12 px-2 py-0.5 text-[10px] uppercase tracking-wide text-green">{badge}</span> : null}
          </p>
          <p className="text-xs text-ink-dim">{desc}</p>
        </div>
        <span className={cn("inline-flex h-5 w-5 items-center justify-center rounded-full border", active ? "border-green bg-green text-black" : "border-line")}>{active ? <Check className="h-3 w-3" /> : null}</span>
      </div>
      {children}
    </button>
  );
}
