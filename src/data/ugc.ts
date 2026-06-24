import type { UgcItem } from "@/types";

const IMG =
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80";

export const ugc: UgcItem[] = [
  { id: "u-1", image: IMG, handle: "@rifat.lifts", caption: { en: "Shoulders day. #ThryveMode" } },
  { id: "u-2", image: IMG, handle: "@sumaiya.fit", caption: { en: "Cutting, still strong." } },
  { id: "u-3", image: IMG, handle: "@tanvir.presses", caption: { en: "Mango Ice hit different." } },
  { id: "u-4", image: IMG, handle: "@dhaka.barbell", caption: { en: "Made in BD. Proud." } },
  { id: "u-5", image: IMG, handle: "@nusrat.trains", caption: { en: "5g a day, every day." } },
  { id: "u-6", image: IMG, handle: "@ctg.iron", caption: { en: "Verified my jar." } },
];
