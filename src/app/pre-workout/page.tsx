import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Pre-Workout — Katana",
  description: "Katana — Thryve's pre-workout. Clean energy, zero crash. Dropping August 2026.",
};

export default function PreWorkoutPage() {
  return (
    <ComingSoon
      badge="Coming Soon"
      when="Dropping August 2026"
      title="Katana"
      tagline="Our pre-workout. Clean energy and pump, zero crash — in a sachet box for trial and a jar for the committed."
      points={[
        "Clean caffeine + pump, no jitters",
        "Sachet box to trial, jar for the committed",
        "Early-access pricing for the waitlist",
      ]}
    />
  );
}
