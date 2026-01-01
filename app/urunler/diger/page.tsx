import type { Metadata } from "next";
import { DigerContent } from "@/components/diger-content";
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Diğer Ürünler - Özel Takviyeler",
  description: "Farklı ihtiyaçlara yönelik özel formüllü takviye ürünleri.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      filter_query: {
        category: {
          in: "Diğer"
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function DigerPage() {
  const products = await fetchData();
  return <DigerContent products={products} />;
}