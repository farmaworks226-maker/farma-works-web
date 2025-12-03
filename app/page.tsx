import { getStoryblokApi } from "@/lib/storyblok"
import StoryblokProvider from "@/components/StoryblokProvider"
import { HeroSlider } from "@/components/hero-slider"
import { HeroSection } from "@/components/hero-section"
import { HealthMission } from "@/components/health-mission"
import { ProductShowcase } from "@/components/product-showcase"
import { ProductCategories } from "@/components/product-categories"
import { FeaturesGrid } from "@/components/features-grid"
import { HealthTips } from "@/components/health-tips"
import { HealthTipsSlider } from "@/components/health-tips-slider"

export const metadata = {
  title: "Farma Works - Doğal Takviye Edici Gıdalar",
  description: "Sağlıklı yaşam için güvenilir gıda takviyeleri.",
}

export const revalidate = 0

interface Blok {
  component: string
  [key: string]: unknown
}

async function fetchHomePage() {
  const storyblokApi = getStoryblokApi()
  try {
    const { data } = await storyblokApi.get("cdn/stories/home", {
      version: "draft",
    })
    return data.story
  } catch {
    return null
  }
}

async function fetchFeaturedProducts() {
  const storyblokApi = getStoryblokApi()
  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      per_page: 4,
    })
    return data.stories
  } catch {
    return []
  }
}

export default async function Home() {
  const story = await fetchHomePage()
  const featuredProducts = await fetchFeaturedProducts()

  if (!story) {
    return <div className="p-20 text-center">Storyblok&apos;ta &apos;Home&apos; sayfası bulunamadı.</div>
  }

  const body: Blok[] = story.content.body || []

  // BLOKLARI BULUYORUZ
  const heroSliderBlok = body.find((b) => b.component === "hero_slider_container")
  const heroBlok = body.find((b) => b.component === "hero_slide")
  const missionBlok = body.find((b) => b.component === "health_mission")
  const showcaseBlok = body.find((b) => b.component === "product_showcase")
  const categoriesBlok = body.find((b) => b.component === "product_categories")
  const featuresBlok = body.find((b) => b.component === "features_grid")
  const healthTipsBlok = body.find((b) => b.component === "health_tips")

  return (
    <StoryblokProvider>
      <main className="min-h-screen bg-white">
        {/* 1. HERO ALANI */}
        {heroSliderBlok ? (
          <HeroSlider blok={heroSliderBlok} />
        ) : (
          heroBlok && <HeroSection blok={heroBlok} />
        )}

        {/* 2. SAĞLIK MİSYONU */}
        {missionBlok && <HealthMission blok={missionBlok} />}

        {/* 3. ÜRÜN VİTRİNİ */}
        <ProductShowcase products={featuredProducts} blok={showcaseBlok} />

        {/* 4. ÜRÜN KATEGORİLERİ */}
        {categoriesBlok && <ProductCategories blok={categoriesBlok} />}

        {/* 5. NEDEN BİZ? */}
        {featuresBlok && <FeaturesGrid blok={featuresBlok} />}

        {/* 6. SAĞLIK İPUÇLARI */}
        <HealthTips blok={healthTipsBlok} />

        {/* 7. SAĞLIKLI YAŞAM GALERİSİ */}
        <HealthTipsSlider />
      </main>
    </StoryblokProvider>
  )
}