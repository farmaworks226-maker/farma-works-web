import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"

// ÜRÜN VERİLERİ (Fiyatları sildik)
const PRODUCTS = [
  {
    id: 1,
    name: "Lipozomal C Vitamini",
    category: "Vitaminler",
    image: "/images/hero.png", 
    rating: 5,
    link: "/urunler/vitaminler"
  },
  {
    id: 2,
    name: "Magnezyum Kompleks",
    category: "Mineraller",
    image: "/images/hero.png",
    rating: 4,
    link: "/urunler/mineraller"
  },
  {
    id: 3,
    name: "Omega 3 Balık Yağı",
    category: "Özel Takviyeler",
    image: "/images/hero.png",
    rating: 5,
    link: "/urunler/ozel-takviyeler"
  },
  {
    id: 4,
    name: "Probiyotik 10 Milyar",
    category: "Probiyotikler",
    image: "/images/hero.png",
    rating: 5,
    link: "/urunler/probiyotikler"
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Başlık Alanı */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Öne Çıkan Ürünler</h2>
            <p className="text-gray-500">Kullanıcılarımızın en çok tercih ettiği takviyeler.</p>
          </div>
          <Link 
            href="/urunler/vitaminler" 
            className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Tüm Ürünleri Gör <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={product.link} className="group block">
              <div className="border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col h-full">
                
                {/* Resim Alanı */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPÜLER
                  </span>
                </div>

                {/* Bilgi Alanı */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wider">
                    {product.category}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>

                  {/* Yıldızlar */}
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>

                  {/* Alt Kısım: 'İncele' Yazısı (Fiyat ve Sepet yerine) */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                    Ürünü İncele <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}