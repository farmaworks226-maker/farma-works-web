import type { Metadata } from "next";
import { KisiselBakimContent } from "@/components/kisisel-bakim-content";
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Dermo Kozmetik Kişisel Bakım Ürünleri",
  description: "Cilt bariyerini güçlendiren serumlar, kremler ve saç bakım ürünleri. Bilimsel içerikli doğal bakım.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft", 
      content_type: "product",
      filter_query: {
        category: {
          in: "Kişisel Bakım" // Storyblok'taki kategori adıyla BİREBİR aynı olmalı
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function KisiselBakimPage() {
  const products = await fetchData();
  return <KisiselBakimContent products={products} />;
}