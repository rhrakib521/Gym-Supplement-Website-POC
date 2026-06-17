import type { Lang } from "@/types";

const BN_DIGITS: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
};

export function toBnNumerals(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[d] ?? d);
}

/** Format a BDT amount, e.g. 1899 -> "৳1,899" (en) / "৳১,৮৯৯" (bn). */
export function formatBDT(amount: number, lang: Lang = "en"): string {
  const grouped = new Intl.NumberFormat("en-US").format(Math.round(amount));
  const withSymbol = "৳" + grouped;
  return lang === "bn" ? toBnNumerals(withSymbol) : withSymbol;
}

/** Normalize messy BD phone input to 01XXXXXXXXX where possible. */
export function normalizeBdPhone(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("880")) d = "0" + d.slice(3);
  else if (d.startsWith("88")) d = "0" + d.slice(2);
  return d;
}

export function isValidBdPhone(input: string): boolean {
  return /^01[3-9]\d{8}$/.test(normalizeBdPhone(input));
}

export function formatDate(iso: string, lang: Lang = "en"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const out = d.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return out;
}

/** Pick the right language value from a Localized string, EN fallback. */
export function tx(value: { en: string; bn?: string } | undefined, lang: Lang): string {
  if (!value) return "";
  return lang === "bn" && value.bn ? value.bn : value.en;
}
