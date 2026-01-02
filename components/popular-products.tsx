"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { storyblokEditable } from "@storyblok/react/rsc"
import { getStoryblokApi } from "@/lib/storyblok"

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

 
interface PopularProductsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blok?: any;
}

// Yedek Veri (Storyblok boşsa veya hata olursa)
const STATIC_PRODUCTS: ProductItem[] = [
  {
    uuid: "1",
    content: { name: "Pure C Vitamini", category: "Vitaminler", image: { filename: "/images/hero.png" } },
  },
  {
    uuid: "2",
    content: { name: "Magnesium Oil", category: "Mineraller", image: { filename: "/images/hero.png" } },
  }
]

export function PopularProducts({ blok }: PopularProductsProps) {
  const [products, setProducts] = useState<ProductItem[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const storyblokApi = getStoryblokApi();
      try {
        const { data } = await storyblokApi.get("cdn/stories", {
          version: "draft",
          content_type: "product",
          per_page: 4, // En popüler 4 ürün
        });
        setProducts(data.stories);
      } catch (error) {
        console.error("Hata:", error);
      }
    }
    fetchProducts();
  }, [])

  const displayProducts = (products.length > 0) ? products : STATIC_PRODUCTS;

  // --- KATEGORİ RENK SEÇİCİ
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mineraller": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Vitaminler": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Multivitaminler": return "bg-lime-100 text-lime-700 border-lime-200";
      case "Probiyotikler": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Özel Takviyeler": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Kişisel Bakım": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "Balık Yağları": return "bg-cyan-100 text-cyan-700 border-cyan-200";
      case "Bitkisel Ekstreler": return "bg-green-100 text-green-700 border-green-200";
      case "Diğer": return "bg-violet-100 text-violet-700 border-violet-200";
      default: return "bg-green-100 text-green-700 border-green-200";
    }
  }

  // --- KATEGORİ LİNK SEÇİCİ
  const getCategoryLink = (category: string) => {
    switch (category) {
      case "Mineraller": return "/urunler/mineraller";
      case "Vitaminler": return "/urunler/vitaminler";
      case "Multivitaminler": return "/urunler/multivitaminler";
      case "Probiyotikler": return "/urunler/probiyotikler";
      case "Özel Takviyeler": return "/urunler/ozel-takviyeler";
      case "Kişisel Bakım": return "/urunler/kisisel-bakim";
      case "Balık Yağları": return "/urunler/balik-yaglari";
      case "Bitkisel Ekstreler": return "/urunler/bitkisel-ekstreler";
      case "Diğer": return "/urunler/diger";
      default: return "/urunler";
    }
  }

  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-20 bg-white">
      <div className="text-center mb-12">
        <span className="text-[#00b074] bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          {blok?.label || "Öne Çıkan Ürünler"}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mt-3">
          {blok?.title || "En Popüler Ürünlerimiz"}
        </h2>
        <p className="text-gray-500 mt-2">
          {blok?.description || "Müşterilerimizin en çok tercih ettiği ürünler."}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayProducts.map((item, index) => {
          const product = item.content;
          const imgUrl = product.image?.filename || "/images/hero.png";
          const linkUrl = getCategoryLink(product.category || "");
          const badgeColors = ["bg-green-500", "bg-blue-500", "bg-orange-500", "bg-purple-500"];
          const badgeColor = badgeColors[index % badgeColors.length];
          const categoryClass = getCategoryColor(product.category || "Genel");

          return (
            <Link key={item.uuid || index} href={linkUrl} className="group block">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                
                {/* Resim Alanı */}
                <div className="relative h-64 bg-gray-50 rounded-xl overflow-hidden mb-4">
                  {/* Sol Üst: Kategori Etiketi */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wide z-20 ${categoryClass}`}>
                    {product.category || "Ürün"}
                  </span>
                  
                  {/* Sağ Üst: Özel Badge */}
                  <span className={`absolute top-3 right-3 ${badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-20 shadow-sm`}>
                    Özel
                  </span>

                  {/* Resim */}
                  <Image
                    src={imgUrl}
                    alt={product.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Alt Bilgiler */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 flex-grow line-clamp-2 group-hover:text-[#00b074] transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-sm font-semibold text-[#00b074] group-hover:translate-x-1 transition-transform">
                    İncele <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Tüm Ürünleri Gör Butonu */}
      <div className="text-center mt-12">
        <Link 
          href="/urunler" 
          className="inline-flex items-center gap-2 bg-[#1E40D8] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1a38c0] transition-colors"
        >
          Tüm Ürünleri Gör <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}