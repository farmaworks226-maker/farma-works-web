import type { Metadata } from "next";
import { BalikYaglariContent } from "@/components/balik-yaglari-content";
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Balık Yağları - Omega-3 Takviyeleri",
  description: "Kalp, beyin ve eklem sağlığı için yüksek kaliteli Omega-3 balık yağı takviyeleri.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      filter_query: {
        category: {
          in: "Balık Yağları"
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function BalikYaglariPage() {
  const products = await fetchData();
  return <BalikYaglariContent products={products} />;
}