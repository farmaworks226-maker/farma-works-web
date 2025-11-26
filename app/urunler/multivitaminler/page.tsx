import type { Metadata } from "next";
import { MultivitaminContent } from "@/components/multivitamin-content"; // components klasöründen çağırıyoruz
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Multivitamin Takviyeleri",
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
          in: "Multivitaminler" // Storyblok'ta 'Multivitaminler' yazdığınızdan emin olun
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function MultivitaminlerPage() {
  const products = await fetchData();
  return <MultivitaminContent products={products} />;
}