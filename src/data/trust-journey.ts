import type { TrustStep } from "@/types";

export const trustJourney: TrustStep[] = [
  {
    id: "source",
    icon: "source",
    title: { en: "Source" },
    detail: { en: "Raw creatine monohydrate, micronized for clean mixing." },
  },
  {
    id: "lab",
    icon: "lab",
    title: { en: "Lab-tested" },
    detail: { en: "Every batch third-party tested for purity and dose." },
  },
  {
    id: "jar",
    icon: "jar",
    title: { en: "Sealed in the jar" },
    detail: { en: "Sealed fresh with a unique QR serial on every jar." },
  },
  {
    id: "qr",
    icon: "qr",
    title: { en: "Verify by QR" },
    detail: { en: "Scan or enter your serial — know yours is real in seconds." },
  },
];
