import type { Metadata } from "next";
import { ProbiyotikContent } from "@/components/probiyotik-content"; // components'ten çağırıyoruz
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Probiyotik ve Prebiyotik Takviyeleri",
  description: "Sindirim sistemi dengesi ve bağışıklık için probiyotik çözümler.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft", 
      content_type: "product",
      filter_query: {
        category: {
          in: "Probiyotikler" // Storyblok'taki kategori adıyla BİREBİR aynı olmalı
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function ProbiyotiklerPage() {
  const products = await fetchData();
  return <ProbiyotikContent products={products} />;
}