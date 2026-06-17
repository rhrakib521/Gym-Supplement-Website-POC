import type { Athlete } from "@/types";

export const athletes: Athlete[] = [
  {
    id: "tanvir",
    name: "Tanvir Ahmed",
    sport: { en: "Powerlifting", bn: "পাওয়ারলিফটিং" },
    city: { en: "Dhaka", bn: "ঢাকা" },
    code: "TANVIR10",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
    quote: {
      en: "First creatine I've actually trusted in Bangladesh. The QR check sold me.",
      bn: "বাংলাদেশে প্রথম ক্রিয়েটিন যা আমি বিশ্বাস করি।",
    },
    instagram: "https://instagram.com",
  },
  {
    id: "rifa",
    name: "Rifa Tasnia",
    sport: { en: "Bodybuilding", bn: "বডিবিল্ডিং" },
    city: { en: "Chattogram", bn: "চট্টগ্রাম" },
    code: "RIFA15",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
    quote: {
      en: "Mango Ice mixes clean, no chalky aftertaste. It's part of my prep now.",
      bn: "ম্যাঙ্গো আইস দারুণ মিক্স হয়।",
    },
    instagram: "https://instagram.com",
  },
  {
    id: "shad",
    name: "Shadman Kabir",
    sport: { en: "CrossFit", bn: "ক্রসফিট" },
    city: { en: "Sylhet", bn: "সিলেট" },
    code: "SHAD20",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=80",
    quote: {
      en: "Strength is up, recovery feels faster. COD made trying it zero-risk.",
      bn: "শক্তি বেড়েছে, রিকভারি দ্রুত।",
    },
    instagram: "https://instagram.com",
  },
];
