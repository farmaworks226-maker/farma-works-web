import { OzelTakviyeContent } from "@/components/ozel-takviye-content";
import { getStoryblokApi } from "@/lib/storyblok";

// --- STORYBLOK VERİ ÇEKME ---
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    content_type: "product",
    filter_query: {
      category: {
        // DİKKAT: Storyblok'taki kategori adıyla birebir aynı olmalı (Türkçe karakterlere dikkat)
        in: "Özel Takviyeler" 
      }
    }
  });
  
  return data.stories;
}

export const metadata = {
  title: "Özel Takviyeler",
  description: "Kolajen, Omega-3 ve diğer özel destekler.",
};

export default async function OzelTakviyelerPage() {
  const products = await fetchData();
  return <OzelTakviyeContent products={products} />;
}