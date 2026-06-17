"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { QrCode, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

export function QrVerifyCta() {
  const { t } = useTranslation();
  const [serial, setSerial] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = serial.trim().toUpperCase();
    router.push(s ? `/verify/${encodeURIComponent(s)}` : "/verify");
  };

  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="noise relative overflow-hidden rounded-3xl border border-line bg-surface-1 p-8 md:p-14">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-green/10 blur-3xl" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">
                <ShieldCheck className="h-4 w-4" /> {t("trust.authentic")}
              </p>
              <h2 className="text-balance font-display text-2xl font-semibold md:text-4xl">
                Verify your Thryve is authentic.
              </h2>
              <p className="mt-3 max-w-md text-ink-dim">
                Every jar carries a unique QR serial. Enter it and know — in
                seconds — that yours is real.
              </p>
            </div>
            <form onSubmit={submit} className="flex w-full max-w-md items-center gap-2 lg:w-auto">
              <div className="relative flex-1">
                <QrCode className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-dim" />
                <input
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  placeholder="THRYVE-LN204-0001"
                  aria-label="QR serial"
                  className="h-12 w-full rounded-[10px] border border-line bg-bg pl-10 pr-3 text-sm outline-none placeholder:text-ink-dim focus:border-green"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-green px-5 font-medium text-black transition-colors hover:bg-green-deep hover:text-white"
              >
                Verify <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
