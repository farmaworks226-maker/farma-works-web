"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Tip tanımlamaları
interface ProductContent {
  name: string
  category?: string
  image?: { filename?: string }
}

interface ProductStory {
  uuid: string
  slug: string
  content: ProductContent
}

interface MarkaSayfasiContentProps {
  marka: string
  aciklama: string
  products: ProductStory[]
}

export function MarkaSayfasiContent({ marka, aciklama, products }: MarkaSayfasiContentProps) {
  // Ürünleri kategoriye göre grupla
  const kategoriler = useMemo(() => {
    const grouped: Record<string, ProductStory[]> = {}
    
    products.forEach((product) => {
      const kategori = product.content.category || "Diğer"
      if (!grouped[kategori]) {
        grouped[kategori] = []
      }
      grouped[kategori].push(product)
    })
    
    // Kategori sıralaması
    const sira = [
      "Vitaminler",
      "Mineraller", 
      "Multivitaminler",
      "Probiyotikler",
      "Balık Yağları",
      "Bitkisel Ekstreler",
      "Özel Takviyeler",
      "Kişisel Bakım",
      "Setler",
      "Diğer"
    ]
    
    const sorted: Record<string, ProductStory[]> = {}
    sira.forEach((kat) => {
      if (grouped[kat]) {
        sorted[kat] = grouped[kat]
      }
    })
    
    // Sıralamada olmayan kategorileri ekle
    Object.keys(grouped).forEach((kat) => {
      if (!sorted[kat]) {
        sorted[kat] = grouped[kat]
      }
    })
    
    return sorted
  }, [products])

  const toplamUrun = products.length
  const kategoriSayisi = Object.keys(kategoriler).length

  return (
    <div className="min-h-screen bg-[#F3EBE2]">
      {/* Hero Banner */}
      <div className="bg-[#1E40D8] py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <span className="text-[#ED6E2D] bg-white/10 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            Marka
          </span>
          <h1 className="text-5xl font-bold mt-4 mb-4">{marka}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {aciklama}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">{toplamUrun} Ürün</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">{kategoriSayisi} Kategori</span>
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {toplamUrun === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">Henüz ürün bulunamadı.</h2>
            <p className="text-gray-500 mt-2">Bu markaya ait ürünler yakında eklenecektir.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(kategoriler).map(([kategori, urunler]) => (
              <div key={kategori} id={kategori.toLowerCase().replace(/\s+/g, '-')}>
                {/* Kategori Başlığı */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E40D8]">{kategori}</h2>
                    <p className="text-gray-500 text-sm mt-1">{urunler.length} ürün</p>
                  </div>
                </div>
                
                {/* Ürün Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {urunler.map((item) => {
                    const product = item.content
                    const imageUrl = product.image?.filename || "/images/hero.png"
                    
                    return (
                      <Link 
                        key={item.uuid} 
                        href={`/urunler/${item.slug}`}
                        className="group block"
                      >
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          {/* Ürün Görseli */}
                          <div className="relative aspect-square bg-[#F3EBE2] overflow-hidden">
                            <Image 
                              src={imageUrl} 
                              alt={product.name} 
                              fill 
                              className="object-cover transform group-hover:scale-110 transition-transform duration-500" 
                            />
                          </div>
                          
                          {/* Ürün Bilgileri */}
                          <div className="p-5 flex flex-col flex-grow">
                            <span className="text-[#ED6E2D] text-xs font-bold uppercase tracking-wide mb-2">
                              {marka}
                            </span>
                            <h3 className="text-gray-900 font-bold text-sm mb-4 leading-snug flex-grow line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="pt-3 border-t border-gray-100">
                              <span className="text-[#1E40D8] text-sm font-bold flex items-center group-hover:text-[#ED6E2D] transition-colors">
                                Ürünü İncele 
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Alt CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-4">Ürünlerimiz hakkında daha fazla bilgi almak için</p>
          <Link 
            href="/iletisim" 
            className="inline-block bg-[#ED6E2D] hover:bg-[#d55f24] text-white font-bold py-4 px-8 rounded-full transition"
          >
            Bizimle İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  )
}