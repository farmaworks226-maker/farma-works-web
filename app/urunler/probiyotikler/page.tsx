import { ProbiyotikContent } from "@/components/probiyotik-content";
import { getStoryblokApi } from "@/lib/storyblok";

// --- STORYBLOK VERİ ÇEKME ---
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    content_type: "product",
    filter_query: {
      category: {
        in: "Probiyotikler" // Storyblok'taki kategori adıyla birebir aynı olmalı
      }
    }
  });
  
  return data.stories;
}

export const metadata = {
  title: "Probiyotik Takviyeleri",
  description: "Sindirim sistemi ve bağışıklık için probiyotik çözümler.",
};

export default async function ProbiyotiklerPage() {
  const products = await fetchData();
  return <ProbiyotikContent products={products} />;
}