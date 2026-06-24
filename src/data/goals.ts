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
      { title: { en: "Daily 5g creatine", bn: "প্রতিদিন ৫g ক্রিয়েটিন" }, detail: { en: "One scoop, any time. Consistency beats timing.", bn: "এক স্কুপ, যেকোনো সময়। নিয়মিততাই আসল।" } },
      { title: { en: "Train 4–5×/week", bn: "সপ্তাহে ৪–৫ দিন ট্রেনিং" }, detail: { en: "Compound lifts, progressive overload.", bn: "কম্পাউন্ড লিফট, ধারাবাহিক ওভারলোড।" } },
      { title: { en: "Eat in a surplus", bn: "সারপ্লাসে খান" }, detail: { en: "~300–500 kcal above maintenance.", bn: "মেইনটেন্যান্সের চেয়ে ~৩০০–৫০০ ক্যালরি বেশি।" } },
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
      { title: { en: "Stay on creatine", bn: "ক্রিয়েটিন চালিয়ে যান" }, detail: { en: "Keeps output high while calories drop.", bn: "ক্যালরি কমলেও আউটপুট ধরে রাখে।" } },
      { title: { en: "Keep protein high", bn: "প্রোটিন বেশি রাখুন" }, detail: { en: "~2g/kg to spare muscle.", bn: "পেশি রক্ষায় ~২g/kg।" } },
      { title: { en: "Small deficit", bn: "অল্প ডেফিসিট" }, detail: { en: "~300–500 kcal under maintenance.", bn: "মেইনটেন্সের ~৩০০–৫০০ ক্যালরি নিচে।" } },
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
      { title: { en: "Creatine pre-heavy days", bn: "ভারী দিনে ক্রিয়েটিন" }, detail: { en: "Saturate for peak power output.", bn: "পিক পাওয়ারের জন্য স্যাচুরেট করুন।" } },
      { title: { en: "Use a belt on maxes", bn: "ম্যাক্সে বেল্ট ব্যবহার করুন" }, detail: { en: "Bracing > raw for top sets.", bn: "টপ সেটে ব্রেসিং দরকার।" } },
      { title: { en: "Wrap for pressing", bn: "প্রেসে র‍্যাপ" }, detail: { en: "Lock the wrists under load.", bn: "লোডের নিচে কবজি স্থির রাখুন।" } },
    ],
  },
];
