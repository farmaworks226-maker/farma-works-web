import { SaglikOnerileriContent } from "@/components/saglik-onerileri-content";
import { getStoryblokApi } from "@/lib/storyblok";
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