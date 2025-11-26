import type { Metadata } from "next";
// Client Component'i buraya import ediyoruz
import { EczaneBul } from "@/components/eczane-bul";

export const metadata: Metadata = {
  title: "Anlaşmalı Eczaneler - Farma Works",
  description: "Size en yakın Farma Works satış noktasını ve nöbetçi eczaneleri harita üzerinde görüntüleyin.",
};

export default function Page() {
  return <EczaneBul />;
}

