import { HeroSection } from "@/components/hero-section"
import { HealthMission } from "@/components/health-mission"
import { ProductShowcase } from "@/components/product-showcase"
import { HealthTips } from "@/components/health-tips"
import { getStoryblokApi } from "@/lib/storyblok"

// 1. Slaytları Çek
async function fetchSlides() {
  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "hero_slide", 
      sort_by: "position:asc"
    });
    return data.stories.map((story: any) => ({ _uid: story.uuid, ...story.content }));
  } catch (error) {
    return [];
  }
}

// 2. Ürünleri Çek (YENİ EKLENDİ)
async function fetchFeaturedProducts() {
  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      per_page: 4, // Sadece en son eklenen 4 ürünü getir
    });
    return data.stories;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const slides = await fetchSlides();
  const featuredProducts = await fetchFeaturedProducts(); // Ürünleri al

  return (
    <main className="min-h-screen bg-white">
      
      {/* Slayt */}
      <HeroSection slides={slides} />

      {/* Misyon */}
      <HealthMission />

      {/* Ürün Vitrini (Veriyi Gönderiyoruz) */}
      <ProductShowcase products={featuredProducts} />

      {/* Blog/İpuçları */}
      <HealthTips />

    </main>
  )
}