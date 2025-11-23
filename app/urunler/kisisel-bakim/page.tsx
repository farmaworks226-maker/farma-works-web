import type { Metadata } from "next";
import { KisiselBakimContent } from "@/components/kisisel-bakim-content";

export const metadata: Metadata = {
  title: "Dermo Kozmetik Kişisel Bakım Ürünleri",
  description: "Cilt bariyerini güçlendiren serumlar, kremler ve saç bakım ürünleri. Bilimsel içerikli doğal bakım.",
};

export default function Page() {
  return <KisiselBakimContent />;
}