"use client"

import { storyblokEditable } from "@storyblok/react/rsc"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ShowcaseBanner({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className="bg-gradient-to-r from-[#008c73] to-[#00b09b] py-20 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Başlık Storyblok'tan gelir */}
        <h2 className="text-4xl font-bold mb-4">
          {blok?.title || "Sağlıklı Yaşam İçin Premium Ürünler"}
        </h2>
        
        {/* Açıklama Storyblok'tan gelir */}
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          {blok?.description || "Bilimsel olarak formüle edilmiş, en yüksek kalite standartlarında üretilen takviye ürünlerimizle sağlığınızı destekleyin."}
        </p>
        
        <div className="flex justify-center gap-4 text-sm font-medium">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">100+ Ürün</span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">6 Kategori</span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">Premium Kalite</span>
        </div>
      </div>
    </div>
  )
}