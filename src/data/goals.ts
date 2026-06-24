import type { Goal } from "@/types";

export const goals: Goal[] = [
  {
    id: "build",
    label: { en: "Build", bn: "গঠন" },
    blurb: {
      en: "Add lean mass and strength. Creatine daily, train heavy, eat surplus.",
      bn: "পেশি ও শক্তি বাড়ান। প্রতিদিন ক্রিয়েটিন, ভারী ট্রেনিং।",
    },
    productSlugs: ["creatine-monohydrate", "creatine-starter-stack", "thryve-shaker"],
    plan: [
      { title: { en: "Daily 5g creatine" }, detail: { en: "One scoop, any time. Consistency beats timing." } },
      { title: { en: "Train 4–5×/week" }, detail: { en: "Compound lifts, progressive overload." } },
      { title: { en: "Eat in a surplus" }, detail: { en: "~300–500 kcal above maintenance." } },
    ],
  },
  {
    id: "cut",
    label: { en: "Cut", bn: "কাট" },
    blurb: {
      en: "Hold muscle while losing fat. Creatine preserves strength in a deficit.",
      bn: "ফ্যাট কমান, পেশি ধরে রাখুন।",
    },
    productSlugs: ["creatine-monohydrate", "thryve-wrist-wraps", "thryve-shaker"],
    plan: [
      { title: { en: "Stay on creatine" }, detail: { en: "Keeps output high while calories drop." } },
      { title: { en: "Keep protein high" }, detail: { en: "~2g/kg to spare muscle." } },
      { title: { en: "Small deficit" }, detail: { en: "~300–500 kcal under maintenance." } },
    ],
  },
  {
    id: "perform",
    label: { en: "Perform", bn: "পারফর্ম" },
    blurb: {
      en: "Power, output, recovery. Gear up and dose for explosive work.",
      bn: "পাওয়ার ও রিকভারির জন্য গিয়ার।",
    },
    productSlugs: ["creatine-monohydrate", "thryve-lifting-belt", "thryve-wrist-wraps"],
    plan: [
      { title: { en: "Creatine pre-heavy days" }, detail: { en: "Saturate for peak power output." } },
      { title: { en: "Use a belt on maxes" }, detail: { en: "Bracing > raw for top sets." } },
      { title: { en: "Wrap for pressing" }, detail: { en: "Lock the wrists under load." } },
    ],
  },
];
