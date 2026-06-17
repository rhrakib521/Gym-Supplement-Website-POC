import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Whey Protein — 2027",
  description: "Whey protein is on the Thryve roadmap for 2027 — done properly, not first.",
};

export default function WheyPage() {
  return (
    <ComingSoon
      badge="2027"
      when="On the roadmap"
      title="Whey, done properly."
      tagline="We're not rushing whey to be first. When we launch it, it'll be lab-tested, QR-verified, and dosed honestly — like everything else."
      points={["Same lab-tested standard as our creatine", "Real protein content, no amino spiking", "QR-verified, made in Bangladesh"]}
    />
  );
}
