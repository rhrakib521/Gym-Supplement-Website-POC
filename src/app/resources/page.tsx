import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free guides from Thryve — creatine basics, training, and supplement safety in Bangladesh.",
};

const GUIDES = [
  { title: "Creatine Beginner Guide", desc: "Everything you need to start — dosing, timing, what to expect.", tag: "PDF · 8 pages" },
  { title: "Training for Muscle Mass", desc: "A simple progression framework that actually works.", tag: "PDF · 12 pages" },
  { title: "Bangladesh Supplement Safety", desc: "How to spot fakes and what 'lab-tested' really means.", tag: "PDF · 6 pages" },
  { title: "How to Verify Authentic Supplements", desc: "Use the QR system and read a lab certificate.", tag: "PDF · 4 pages" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Free guides"
        subtitle="Read first, buy later. We'd rather you understand creatine than just take our word for it."
      />
      <section className="py-12">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <div key={g.title} className="flex items-start gap-4 rounded-2xl border border-line bg-surface-1 p-6">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2">
                  <FileText className="h-5 w-5 text-green" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{g.title}</p>
                  <p className="mt-1 text-sm text-ink-dim">{g.desc}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-wide text-ink-dim">{g.tag}</p>
                </div>
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-dim hover:border-green hover:text-green" aria-label={`Download ${g.title}`}>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-dim">Guides are free — we'll ask for your phone so we can send them via WhatsApp.</p>
        </Container>
      </section>
    </>
  );
}
