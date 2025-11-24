import { MultivitaminContent } from "@/components/multivitamin-content";
import { getStoryblokApi } from "@/lib/storyblok";

// --- STORYBLOK VERİ ÇEKME ---
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    content_type: "product",
    filter_query: {
      category: {
        in: "Multivitaminler" // Storyblok'taki kategori isminizle AYNI OLMALI
      }
    }
  });
  
  return data.stories;
}

export const metadata = {
  title: "Multivitamin Takviyeleri",
  description: "Günlük enerji ve bağışıklık desteği için multivitaminler.",
};

export default async function MultivitaminlerPage() {
  const products = await fetchData();
  return <MultivitaminContent products={products} />;
}