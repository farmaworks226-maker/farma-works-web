"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { storyblokEditable } from "@storyblok/react/rsc"

// --- TİP TANIMLAMALARI ---
interface ProductContent {
  name: string;
  category?: string;
  image?: { filename?: string };
}

interface ProductItem {
  uuid: string;
  content: ProductContent;
}

 
interface ProductShowcaseProps {
  products?: ProductItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blok?: any;
}

// Yedek Statik Veri (Storyblok boşsa bu görünür)
const STATIC_PRODUCTS: ProductItem[] = [
  {
    uuid: "1",
    content: {
      name: "Pure C Vitamini",
      category: "Vitaminler",
      image: { filename: "/images/hero.png" },
    }
  }
];

// DİKKAT: export function kullanıyoruz, default değil.
export function ProductShowcase({ products, blok }: ProductShowcaseProps) {
  // Storyblok'tan veri geldiyse onu kullan, yoksa statiği kullan
  const displayProducts = (products && products.length > 0) ? products : STATIC_PRODUCTS;

  return (
    <section {...storyblokEditable(blok)} id="urun-vitrini" className="bg-white pb-20">
      
      {/* 1. BÖLÜM: YEŞİL GRADIENT BANNER */}
      <div className="bg-gradient-to-r from-[#008c73] to-[#00b09b] py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            {blok?.title || "Sağlıklı Yaşam İçin Premium Ürünler"}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            {blok?.description || "Bilimsel olarak formüle edilmiş, en yüksek kalite standartlarında üretilen takviye ürünlerimizle sağlığınızı destekleyin."}
          </p>
          
          {/* İstatistik Rozetleri */}
          <div className="flex justify-center gap-4 text-sm font-medium">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">100+ Ürün</span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">6 Kategori</span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">Premium Kalite</span>
          </div>
        </div>
      </div>

      {/* 2. BÖLÜM: EN POPÜLER ÜRÜNLER */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[#00b074] bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            {blok?.label || "Öne Çıkan Ürünler"}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            En Popüler Ürünlerimiz
          </h2>
          {blok?.sub_description && (
            <p className="text-gray-500 mt-2">{blok.sub_description}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((item, index) => {
            const product = item.content;
            const imgUrl = product.image?.filename || "/images/hero.png";
            
            // Link oluşturma
            let linkUrl = "/urunler";
            if (product.category === "Mineraller") linkUrl = "/urunler/mineraller";
            if (product.category === "Vitaminler") linkUrl = "/urunler/vitaminler";
            if (product.category === "Multivitaminler") linkUrl = "/urunler/multivitaminler";
            if (product.category === "Probiyotikler") linkUrl = "/urunler/probiyotikler";
            if (product.category === "Özel Takviyeler") linkUrl = "/urunler/ozel-takviyeler";
            if (product.category === "Kişisel Bakım") linkUrl = "/urunler/kisisel-bakim";

            const badgeColors = ["bg-green-500", "bg-blue-500", "bg-orange-500", "bg-purple-500"];
            const badgeColor = badgeColors[index % badgeColors.length];

            return (
              <ProductCard 
                key={item.uuid || index}
                badge="Özel"
                badgeColor={badgeColor}
                category={product.category || "Ürün"}
                title={product.name}
                image={imgUrl}
                link={linkUrl}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Ürün Kartı Bileşeni
interface ProductCardProps {
  badge: string;
  badgeColor: string;
  category: string;
  title: string;
  image: string;
  link: string;
}

function ProductCard({ badge, badgeColor, category, title, image, link }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Link href={link} className="group block">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-64 bg-gray-50 rounded-xl overflow-hidden mb-4">
          <span className={`absolute top-3 right-3 ${badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10`}>
            {badge}
          </span>
          <Image 
            src={imgSrc} 
            alt={title} 
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgSrc("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400")}
          />
        </div>
        
        <div className="text-[#00b074] text-xs font-bold uppercase mb-1">{category}</div>
        <h3 className="font-bold text-gray-900 text-lg mb-4 flex-grow">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 group-hover:text-[#00b074] transition mt-auto">
          İncele <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  )
}