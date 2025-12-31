import type { Metadata } from "next"
import { getStoryblokApi } from "@/lib/storyblok"
import { MarkaSayfasiContent } from "@/components/marka-sayfasi-content"

export const metadata: Metadata = {
  title: "Smart Caps - Farma Works",
  description: "Smart Caps markası ile akıllı formülasyonlar. Vitaminler, mineraller, probiyotikler ve özel takviyeler.",
}

async function fetchProducts() {
  const storyblokApi = getStoryblokApi()
  
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      per_page: 100,
    })
    
    // Sadece "Smart Caps" ile başlayan ürünleri filtrele
    const filteredProducts = data.stories.filter((story: { content: { name: string } }) => 
      story.content.name?.startsWith("Smart Caps")
    )
    
    return filteredProducts
  } catch (error) {
    console.error("Storyblok Hatası:", error)
    return []
  }
}

export default async function SmartCapsPage() {
  const products = await fetchProducts()
  
  return (
    <MarkaSayfasiContent 
      marka="Smart Caps"
      aciklama="Akıllı formülasyonlarla tasarlanmış, etkili ve güvenilir gıda takviyeleri"
      products={products}
    />
  )
}