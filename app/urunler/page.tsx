import type { Metadata } from "next";
import { TumUrunlerContent } from "@/components/tum-urunler-content";
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Tüm Ürünler - Ürün Kataloğu",
  description: "Farma Works'ün tüm vitamin, mineral, probiyotik ve kişisel bakım ürünlerini tek bir sayfada inceleyin.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft", 
      content_type: "product", // Sadece ürünleri çek
      per_page: 100 // Tek seferde 100 ürün çek (Sayfalama yoksa)
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function TumUrunlerPage() {
  const products = await fetchData();
  return <TumUrunlerContent products={products} />;
}