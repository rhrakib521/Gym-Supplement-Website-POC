"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { Stepper } from "@/components/ui/stepper";
import { getTrustJourneySync } from "@/lib/api";
import { useLang } from "@/lib/use-lang";

export function TrustJourney() {
  const lang = useLang();
  const router = useRouter();
  const [serial, setSerial] = useState("");
  const steps = getTrustJourneySync();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = serial.trim().toUpperCase();
    router.push(s ? `/verify/${encodeURIComponent(s)}` : "/verify");
  };

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="noise relative overflow-hidden rounded-3xl border border-line bg-surface-1 p-8 md:p-14">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-volt/10 blur-3xl" />
          <SectionHeading eyebrow="The trust moat" title="Source → Lab → Jar → QR" />

          <div className="mt-10">
            <Stepper steps={steps} lang={lang} />
          </div>

          <form onSubmit={submit} className="mt-12 flex w-full max-w-md items-center gap-2">
            <input
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="THRYVE-LN204-0001"
              aria-label="QR serial"
              className="h-12 w-full rounded-[10px] border border-line bg-bg px-3 text-sm outline-none placeholder:text-ink-dim focus:border-green"
            />
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[10px] bg-green px-5 font-medium text-black transition-colors hover:bg-green-deep hover:text-white"
            >
              Verify <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
