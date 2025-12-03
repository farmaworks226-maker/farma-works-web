"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";

// Bileşenleri İçe Aktar
import { HeroSection } from "@/components/hero-section";
import { HeroSlider } from "@/components/hero-slider"; // <-- Slider Burada
import { HealthMission } from "@/components/health-mission";
import { ProductShowcase } from "@/components/product-showcase";
import { HealthTips } from "@/components/health-tips";
import Page from "@/components/Page";

// Alt Bileşenler
import { ShowcaseBanner } from "@/components/showcase-banner";
import { PopularProducts } from "@/components/popular-products";
import { ProductCategories } from "@/components/product-categories";
import { FeaturesGrid } from "@/components/features-grid";
import { CtaSection } from "@/components/cta-section";

const components = {
  page: Page,
  hero_slide: HeroSection,
  hero_slider_container: HeroSlider, // <-- BU SATIR ŞART (Teknik isme dikkat)
  health_mission: HealthMission,
  product_showcase: ProductShowcase,
  health_tips: HealthTips,
  showcase_banner: ShowcaseBanner,
  popular_products: PopularProducts,
  product_categories: ProductCategories,
  features_grid: FeaturesGrid,
  cta_section: CtaSection
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}