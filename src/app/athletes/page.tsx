import type { Metadata } from "next";
import { getAthletes } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Athletes",
  description: "The Bangladeshi athletes who train with Thryve — and the codes that get you 10% off.",
};

export default async function AthletesPage() {
  const athletes = await getAthletes();
  return (
    <>
      <PageHeader
        eyebrow="Thryve athletes"
        title="The people who lift with us"
        subtitle="Powerlifters, bodybuilders, CrossFit athletes — across Bangladesh. Use their code at checkout for 10% off."
      />
      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {athletes.map((a) => (
              <div key={a.id} className="overflow-hidden rounded-2xl border border-line bg-surface-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={a.image} alt={a.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-semibold">{a.name}</p>
                  <p className="text-sm text-ink-dim">{a.sport.en} · {a.city.en}</p>
                  <blockquote className="mt-3 text-sm text-ink-dim">“{a.quote.en}”</blockquote>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-dim">
                      Code <b className="text-green">{a.code}</b>
                    </span>
                    <Button href={`/shop?code=${a.code}`} variant="secondary" size="sm">Shop with code</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
