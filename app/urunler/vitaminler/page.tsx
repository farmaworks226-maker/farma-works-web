import type { Metadata } from "next";
import { VitaminlerContent } from "@/components/vitaminler-content"; // Yeni bileşeni çağırıyoruz
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Vitamin Takviyeleri",
  description: "Bağışıklık ve enerji için temel vitaminler.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      filter_query: {
        category: {
          in: "Vitaminler" // Storyblok'taki kategori ismi (Dikkat: Mineraller DEĞİL)
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function VitaminlerPage() {
  const products = await fetchData();
  return <VitaminlerContent products={products} />;
}