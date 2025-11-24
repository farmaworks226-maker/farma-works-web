import { VitaminlerContent } from "@/components/vitaminler-content";
import { getStoryblokApi } from "@/lib/storyblok";

// --- STORYBLOK VERİ ÇEKME ---
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    content_type: "product",
    filter_query: {
      category: {
        in: "Vitaminler" // Storyblok'taki kategori adıyla birebir aynı olmalı
      }
    }
  });
  
  return data.stories;
}

export const metadata = {
  title: "Vitamin Takviyeleri",
  description: "Günlük C, D, B12 vitamini ihtiyaçlarınız için.",
};

export default async function VitaminlerPage() {
  const products = await fetchData();
  return <VitaminlerContent products={products} />;
}