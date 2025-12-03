import type { Metadata } from "next";
import { KisiselBakimContent } from "@/components/kisisel-bakim-content";
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Dermo Kozmetik Kişisel Bakım Ürünleri",
  description: "Cilt bariyerini güçlendiren serumlar, kremler ve saç bakım ürünleri.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    // 1. Önce Türkçe karakterli dene
    let { data } = await storyblokApi.get("cdn/stories", {
      version: "draft", 
      content_type: "product",
      filter_query: {
        category: {
          in: "Kişisel Bakım" 
        }
      }
    });

    // 2. Eğer boş geldiyse, İngilizce karakterli dene (Yedek plan)
    if (!data.stories || data.stories.length === 0) {
        const response = await storyblokApi.get("cdn/stories", {
            version: "draft", 
            content_type: "product",
            filter_query: {
              category: {
                in: "Kisisel Bakim" 
              }
            }
          });
          data = response.data;
    }

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