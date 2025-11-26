import { SaglikOnerileriContent } from "@/components/saglik-onerileri-content";
import { getStoryblokApi } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sağlık Önerileri ve Blog",
  description: "Makale listesi.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft", 
      content_type: "article",
      sort_by: "created_at:desc",
    });
    
    console.log("\n--------------------------------------------------");
    console.log("🔍 MAKALE SLUG KONTROLÜ BAŞLADI");

    if (data.stories.length > 0) {
        // Makale listesini aldık
        const makale = data.stories[0];
        
        // Next.js'in aradığı tam yolu yazdırıyoruz
        console.log("--------------------------------------------------");
        console.log("✅ BULUNAN İLK MAKALE:", makale.name);
        console.log("🌐 TAM YOLU (full_slug):", makale.full_slug);
        console.log("--------------------------------------------------");
        console.log("İPUCU: Detay linkiniz şu şekilde OLMALIDIR:");
        console.log(`/saglik-onerileri/${makale.full_slug.split('/').pop()}`); 
        console.log("--------------------------------------------------\n");
    } else {
        console.log("❌ Storyblok'tan hiç makale gelmedi. Publish edildi mi?");
    }

    return data.stories;
  } catch (error) {
    console.error("🚨 API Hatası:", error);
    return [];
  }
}

export default async function SaglikOnerileriPage() {
  const articles = await fetchData();
  return <SaglikOnerileriContent articles={articles} />;
}