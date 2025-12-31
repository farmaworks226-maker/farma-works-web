import type { Metadata } from "next"
import { getStoryblokApi } from "@/lib/storyblok"
import { MarkaSayfasiContent } from "@/components/marka-sayfasi-content"

export const metadata: Metadata = {
  title: "Raw Material - Farma Works",
  description: "Raw Material markası ile saf ve doğal hammaddeler. Lugol's Solution iyot ürünleri.",
}

async function fetchProducts() {
  const storyblokApi = getStoryblokApi()
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      per_page: 100,
    })
    
    // Sadece "Raw Material" ile başlayan ürünleri filtrele
    const filteredProducts = data.stories.filter((story: { content: { name: string } }) => 
      story.content.name?.startsWith("Raw Material")
    )
    
    return filteredProducts
  } catch (error) {
    console.error("Storyblok Hatası:", error)
    return []
  }
}

export default async function RawMaterialPage() {
  const products = await fetchProducts()
  
  return (
    <MarkaSayfasiContent 
      marka="Raw Material"
      aciklama="Saf ve doğal hammaddelerle üretilmiş, yüksek kaliteli iyot çözümleri"
      products={products}
    />
  )
}