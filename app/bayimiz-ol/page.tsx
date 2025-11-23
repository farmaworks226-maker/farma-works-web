import type { Metadata } from "next";
// DİKKAT: { } içinde import ediyoruz ve dosya adı küçük harfli
import { BayiForm } from "@/components/bayi-form";

export const metadata: Metadata = {
  title: "Bayimiz Olun - Eczane Başvuru Formu",
  description: "Farma Works ailesine katılmak isteyen eczacılarımız için bayilik başvuru formu.",
};

export default function Page() {
  return <BayiForm />;
}