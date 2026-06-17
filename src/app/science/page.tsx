import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, BookOpen, QrCode, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Science",
  description: "Lab results, ingredient explainers, and QR verification — the Thryve trust moat, made visible.",
};

const BATCHES = [
  { id: "LN-204", date: "2026-04", purity: "99.6%", status: "Passed" },
  { id: "LN-198", date: "2026-02", purity: "99.4%", status: "Passed" },
  { id: "LN-190", date: "2025-12", purity: "99.5%", status: "Passed" },
];

export default function SciencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Science"
        title="Trust you can check."
        subtitle="Lab results per batch. Plain-language explainers. And a QR you can verify yourself. This is the moat."
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface-1 p-6">
              <FlaskConical className="h-6 w-6 text-green" />
              <h2 className="mt-3 font-display text-xl font-semibold">Lab results</h2>
              <p className="mt-2 text-sm text-ink-dim">Every batch is third-party tested for purity and heavy metals.</p>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {BATCHES.map((b) => (
                  <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-mono">{b.id}</span>
                    <span className="text-ink-dim">{b.date} · {b.purity}</span>
                    <span className="rounded-full bg-green/12 px-2 py-0.5 text-xs text-green">{b.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface-1 p-6">
              <BookOpen className="h-6 w-6 text-green" />
              <h2 className="mt-3 font-display text-xl font-semibold">Ingredient explainers</h2>
              <p className="mt-2 text-sm text-ink-dim">What creatine actually does — minus the bro-science.</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li><Link href="/blog/creatine-101-what-5g-a-day-does" className="inline-flex items-center gap-1 text-ink hover:text-green">Creatine 101 <ArrowRight className="h-3.5 w-3.5" /></Link></li>
                <li><Link href="/blog/fake-supplements-bangladesh-truth" className="inline-flex items-center gap-1 text-ink hover:text-green">Fake supplements in BD <ArrowRight className="h-3.5 w-3.5" /></Link></li>
              </ul>
            </div>

            <div className="rounded-2xl border-t-2 border-green bg-surface-1 p-6">
              <QrCode className="h-6 w-6 text-green" />
              <h2 className="mt-3 font-display text-xl font-semibold">QR verification</h2>
              <p className="mt-2 text-sm text-ink-dim">Every jar carries a unique serial. Check yours in seconds.</p>
              <form action="/verify" className="mt-5 flex gap-2">
                <input name="q" placeholder="THRYVE-LN204-0001" className="h-11 flex-1 rounded-[10px] border border-line bg-bg px-3 text-sm outline-none focus:border-green" />
                <Button type="submit" size="md">Verify</Button>
              </form>
              <p className="mt-3 text-xs text-ink-dim">Tip: the serial is under the lid of every jar.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
