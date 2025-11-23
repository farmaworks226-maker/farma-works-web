import { HeroSection } from "@/components/hero-section"
import { HealthMission } from "@/components/health-mission"
import { ProductShowcase } from "@/components/product-showcase" // <-- 1. YENİ IMPORT
import { Features } from "@/components/features"
import { FeaturedProducts } from "@/components/featured-products"
import { HealthTips } from "@/components/health-tips"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Slayt */}
      <HeroSection />

      {/* 2. Sağlığınız İçin Her Şey (Hakkımızda Özeti) */}
      <HealthMission />

      {/* 3. ÜRÜN VİTRİNİ (Görseldeki Tasarım - YENİ) */}
      <ProductShowcase />

      {/* 4. Diğer Bölümler (İsterseniz Features ve FeaturedProducts'ı silebilirsiniz çünkü ProductShowcase içinde benzerleri var) */}
      {/* <Features /> */} 
      {/* <FeaturedProducts /> */}

      {/* 5. Sağlık İpuçları */}
      <HealthTips />

    </main>
  )
}