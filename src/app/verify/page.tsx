"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QrCode, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
  const router = useRouter();
  const [serial, setSerial] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = serial.trim().toUpperCase();
    router.push(s ? `/verify/${encodeURIComponent(s)}` : "/verify");
  };

  return (
    <>
      <PageHeader
        eyebrow="Authenticity"
        title="Verify your Thryve"
        subtitle="Every jar carries a unique QR serial under the lid. Enter it to confirm yours is genuine — in seconds."
      />
      <Container className="py-12">
        <form onSubmit={submit} className="mx-auto flex max-w-lg items-center gap-2">
          <div className="relative flex-1">
            <QrCode className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-dim" />
            <input
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="THRYVE-LN204-0001"
              className="h-12 w-full rounded-[10px] border border-line bg-bg pl-10 pr-3 text-sm outline-none focus:border-green"
            />
          </div>
          <Button type="submit" size="lg">Verify</Button>
        </form>

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-surface-1 p-6">
          <ShieldCheck className="h-6 w-6 text-green" />
          <p className="mt-3 font-medium">Why verify?</p>
          <p className="mt-1 text-sm text-ink-dim">
            Counterfeit supplements are a real problem in Bangladesh. Our QR system means every jar is
            traceable to its batch and lab certificate — no guessing.
          </p>
        </div>
      </Container>
    </>
  );
}
