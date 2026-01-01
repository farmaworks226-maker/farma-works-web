import type { Metadata } from "next";
import { BitkiselEkstrelerContent } from "@/components/bitkisel-ekstreler-content";
import { getStoryblokApi } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Bitkisel Ekstreler - Doğal Takviyeler",
  description: "Doğanın gücünden faydalanan bitkisel ekstre ve fitoterapötik ürünler.",
};

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      filter_query: {
        category: {
          in: "Bitkisel Ekstreler"
        }
      }
    });
    return data.stories;
  } catch (error) {
    console.error("Storyblok Hatası:", error);
    return [];
  }
}

export default async function BitkiselEkstrelerPage() {
  const products = await fetchData();
  return <BitkiselEkstrelerContent products={products} />;
}