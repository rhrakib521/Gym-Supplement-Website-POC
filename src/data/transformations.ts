import type { Transformation } from "@/types";

export const transformations: Transformation[] = [
  {
    id: "t-1",
    name: "Rifat",
    city: { en: "Dhaka", bn: "ঢাকা" },
    duration: { en: "12 weeks", bn: "১২ সপ্তাহ" },
    quote: {
      en: "Consistency + 5g a day. First time my lifts actually moved.",
      bn: "নিয়মিত + দিনে ৫g। প্রথমবার লিফট এগোলো।",
    },
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "t-2",
    name: "Sumaiya",
    city: { en: "Chattogram", bn: "চট্টগ্রাম" },
    duration: { en: "16 weeks", bn: "১৬ সপ্তাহ" },
    quote: {
      en: "Held my strength through a cut. The QR thing made me trust it.",
      bn: "কাটে শক্তি ধরে রেখেছি। QR-এ ভরসা হলো।",
    },
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "t-3",
    name: "Tanvir",
    city: { en: "Sylhet", bn: "সিলেট" },
    duration: { en: "8 weeks", bn: "৮ সপ্তাহ" },
    quote: {
      en: "Mango Ice mixes clean. No weird aftertaste, no fillers.",
      bn: "ম্যাঙ্গো আইস দারুণ মিক্স হয়। কোনো অদ্ভুত স্বাদ নেই।",
    },
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
  },
];
