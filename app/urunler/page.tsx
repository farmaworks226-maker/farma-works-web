import type { Metadata } from "next";
import { TumUrunlerContent } from "@/components/tum-urunler-content";

export const metadata: Metadata = {
  title: "Tüm Ürünler - Ürün Kataloğu",
  description: "Farma Works'ün tüm vitamin, mineral, probiyotik ve kişisel bakım ürünlerini tek bir sayfada inceleyin.",
};

export default function Page() {
  return <TumUrunlerContent />;
}