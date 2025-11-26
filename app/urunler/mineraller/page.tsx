import type { Metadata } from "next";
import { MinerallerContent } from "@/components/mineraller-content";
import { getStoryblokApi } from "@/lib/storyblok";

// 1. SEO AYARLARI
export const metadata: Metadata = {
  title: "Mineral Takviyeleri",
  description: "Vücudunuzun ihtiyaç duyduğu Magnezyum, İyot ve Zeolit gibi temel mineralleri en saf haliyle keşfedin.",
};

// 2. VERİ ÇEKME FONKSİYONU
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    // Storyblok'tan 'product' tipindeki içerikleri çekiyoruz
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft", // Canlıya alınca 'published' yapabilirsiniz
      content_type: "product",
      filter_query: {
        category: {
          in: "Mineraller" // Storyblok'taki kategori adıyla BİREBİR aynı olmalı (Büyük/Küçük harf)
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

// 3. SAYFA BİLEŞENİ
export default async function MinerallerPage() {
  const products = await fetchData();
  
  // Veriyi client bileşenine (MinerallerContent) gönderiyoruz
  return <MinerallerContent products={products} />;
}