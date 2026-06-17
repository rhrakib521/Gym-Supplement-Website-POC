import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout — cash on delivery, bKash, Nagad, or card.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
