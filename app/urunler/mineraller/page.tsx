import { MinerallerContent } from "@/components/mineraller-content";
import { getStoryblokApi } from "@/lib/storyblok";

// --- STORYBLOK VERİ ÇEKME ---
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  // DİKKAT: Filtrelemeyi kaldırdım, her şeyi çekiyoruz.
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft", 
    content_type: "product",
    // filter_query KISMINI SİLDİK
  });
  
  // TERMİNALE NE GELDİĞİNİ YAZDIRIYORUZ (Burayı kontrol edeceğiz)
  console.log("STORYBLOK'TAN GELEN ÜRÜNLER:", JSON.stringify(data.stories, null, 2));

  return data.stories;
}

export const metadata = {
  title: "Mineral Takviyeleri",
  description: "Vücudunuzun ihtiyaç duyduğu temel mineraller.",
};

export default async function MinerallerPage() {
  const products = await fetchData();
  return <MinerallerContent products={products} />;
}