import type { UgcItem } from "@/types";

const IMG =
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80";

export const ugc: UgcItem[] = [
  { id: "u-1", image: IMG, handle: "@rifat.lifts", caption: { en: "Shoulders day. #ThryveMode", bn: "শোল্ডার ডে। #ThryveMode" } },
  { id: "u-2", image: IMG, handle: "@sumaiya.fit", caption: { en: "Cutting, still strong.", bn: "কাট করছি, তবু শক্তিশালী।" } },
  { id: "u-3", image: IMG, handle: "@tanvir.presses", caption: { en: "Mango Ice hit different.", bn: "ম্যাঙ্গো আইস অন্যরকম।" } },
  { id: "u-4", image: IMG, handle: "@dhaka.barbell", caption: { en: "Made in BD. Proud.", bn: "বাংলাদেশে তৈরি। গর্বিত।" } },
  { id: "u-5", image: IMG, handle: "@nusrat.trains", caption: { en: "5g a day, every day.", bn: "প্রতিদিন ৫g।" } },
  { id: "u-6", image: IMG, handle: "@ctg.iron", caption: { en: "Verified my jar.", bn: "আমার জার যাচাই করেছি।" } },
];
