import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Activewear — New Brand",
  description: "A new Thryve brand, built to train in. Under Thryve Holdings.",
};

export default function ActivewearPage() {
  return (
    <ComingSoon
      badge="New Brand"
      when="New brand dropping"
      title="Built to train in."
      tagline="A separate identity under Thryve Holdings. We're doing activewear the way we did creatine — properly."
      accent
      points={["Designed for real training, not just the mirror", "Bangladeshi fit, premium fabric", "Early access + launch event invites"]}
    />
  );
}
