import type { TrustStep } from "@/types";

export const trustJourney: TrustStep[] = [
  {
    id: "source",
    icon: "source",
    title: { en: "Source", bn: "উৎস" },
    detail: {
      en: "Raw creatine monohydrate, micronized for clean mixing.",
      bn: "খাঁটি ক্রিয়েটিন মনোহাইড্রেট, মাইক্রোনাইজড — দারুণ মিক্স হয়।",
    },
  },
  {
    id: "lab",
    icon: "lab",
    title: { en: "Lab-tested", bn: "ল্যাব-টেস্টেড" },
    detail: {
      en: "Every batch third-party tested for purity and dose.",
      bn: "প্রতি ব্যাচ থার্ড-পার্টি পরীক্ষিত — বিশুদ্ধতা ও ডোজ।",
    },
  },
  {
    id: "jar",
    icon: "jar",
    title: { en: "Sealed in the jar", bn: "জারে সিলড" },
    detail: {
      en: "Sealed fresh with a unique QR serial on every jar.",
      bn: "প্রতি জারে আলাদা QR সিরিয়াল দিয়ে সিল।",
    },
  },
  {
    id: "qr",
    icon: "qr",
    title: { en: "Verify by QR", bn: "QR দিয়ে যাচাই" },
    detail: {
      en: "Scan or enter your serial — know yours is real in seconds.",
      bn: "সিরিয়াল দিন — কয়েক সেকেন্ডে নিশ্চিত হন আপনারটা আসল।",
    },
  },
];
