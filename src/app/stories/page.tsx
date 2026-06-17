import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Thryver Stories",
  description: "Real transformations from Bangladeshi athletes on Thryve creatine.",
};

const STORIES = [
  { name: "Rakib Hasan", city: "Dhaka", weeks: 12, stat: "+8kg lean mass", quote: "First creatine I've actually trusted in Bangladesh. Strength went up within a month." },
  { name: "Sadia Islam", city: "Chattogram", weeks: 16, stat: "PR deadlift", quote: "Mango Ice mixes clean and the QR check sold me. COD made trying it zero-risk." },
  { name: "Tahsin Rahman", city: "Sylhet", weeks: 10, stat: "Consistent 5g/day", quote: "Lab certificate gave me confidence. Finally a local brand I can rely on." },
  { name: "Nusrat Jahan", city: "Khulna", weeks: 20, stat: "Down 2 dress sizes", quote: "Watermelon Mojito is unreal. It's part of my prep now, every day." },
];

export default function StoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thryver Stories"
        title="Real people. Real gains."
        subtitle="Submitted by customers, verified by us. Tag #ThryveBD to share yours."
      />
      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {STORIES.map((s) => (
              <figure key={s.name} className="rounded-2xl border border-line bg-surface-1 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 font-display font-semibold text-green">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-medium">
                        {s.name}
                        <BadgeCheck className="h-3.5 w-3.5 text-green" />
                      </p>
                      <p className="text-xs text-ink-dim">{s.city} · {s.weeks} weeks</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-green/12 px-2.5 py-1 text-xs text-green">{s.stat}</span>
                </div>
                <blockquote className="mt-4 text-sm text-ink-dim">“{s.quote}”</blockquote>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
