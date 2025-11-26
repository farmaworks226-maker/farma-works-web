import type { Metadata } from "next";
import { OzelTakviyeContent } from "@/components/ozel-takviye-content";
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Özel Takviyeler - Kolajen, Omega-3 ve Daha Fazlası",
  description: "Spesifik sağlık ihtiyaçlarınız için geliştirilmiş premium takviye edici gıdalar.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft", 
      content_type: "product",
      filter_query: {
        category: {
          in: "Özel Takviyeler" // Storyblok'ta kategorinin tam olarak bu isimde olduğundan emin olun
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function OzelTakviyelerPage() {
  const products = await fetchData();
  return <OzelTakviyeContent products={products} />;
}