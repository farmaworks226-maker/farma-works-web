import { KisiselBakimContent } from "@/components/kisisel-bakim-content";
import { getStoryblokApi } from "@/lib/storyblok";

// --- STORYBLOK VERİ ÇEKME ---
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    content_type: "product",
    filter_query: {
      category: {
        in: "Kişisel Bakım" // DİKKAT: Storyblok'taki kategori ismiyle BİREBİR aynı olmalı
      }
    }
  });
  
  return data.stories;
}

export const metadata = {
  title: "Kişisel Bakım Ürünleri",
  description: "Cilt ve saç bakımınız için dermo kozmetik ürünler.",
};

export default async function KisiselBakimPage() {
  const products = await fetchData();
  return <KisiselBakimContent products={products} />;
}