import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getStoryblokApi } from "@/lib/storyblok"
import { UrunDetayContent } from "@/components/urun-detay-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function fetchProduct(slug: string) {
  const storyblokApi = getStoryblokApi()
  
  try {
    // Önce slug ile dene
    const { data } = await storyblokApi.get(`cdn/stories/urunler/${slug}`, {
      version: "draft",
    })
    return data.story
  } catch {
    // Slug bulunamazsa tüm ürünlerde ara
    try {
      const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        content_type: "product",
        per_page: 100,
      })
      
      // Slug'a göre ürün bul
      const product = data.stories.find((story: { slug: string }) => story.slug === slug)
      return product || null
    } catch {
      return null
    }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const story = await fetchProduct(slug)
  
  if (!story) {
    return {
      title: "Ürün Bulunamadı",
    }
  }
  
  return {
    title: `${story.content.name} - Farma Works`,
    description: story.content.seo_description || `${story.content.name} ürün detayları`,
  }
}

export default async function UrunDetayPage({ params }: PageProps) {
  const { slug } = await params
  const story = await fetchProduct(slug)
  
  if (!story) {
    notFound()
  }
  
  return <UrunDetayContent product={story.content} productName={story.name} />
}