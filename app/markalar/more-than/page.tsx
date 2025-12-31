import type { Metadata } from "next"
import { getStoryblokApi } from "@/lib/storyblok"
import { MarkaSayfasiContent } from "@/components/marka-sayfasi-content"

export const metadata: Metadata = {
  title: "More Than - Farma Works",
  description: "More Than markası ile yüksek kaliteli gıda takviyeleri. Vitaminler, mineraller, probiyotikler ve daha fazlası.",
}

async function fetchProducts() {
  const storyblokApi = getStoryblokApi()
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      per_page: 100,
    })
    
    // Sadece "More Than" ile başlayan ürünleri filtrele
    const filteredProducts = data.stories.filter((story: { content: { name: string } }) => 
      story.content.name?.startsWith("More Than")
    )
    
    return filteredProducts
  } catch (error) {
    console.error("Storyblok Hatası:", error)
    return []
  }
}

export default async function MoreThanPage() {
  const products = await fetchProducts()
  
  return (
    <MarkaSayfasiContent 
      marka="More Than"
      aciklama="Yüksek kaliteli, bilimsel formülasyonlarla hazırlanmış gıda takviyeleri"
      products={products}
    />
  )
}