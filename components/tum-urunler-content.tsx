"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Filter, Tag } from "lucide-react"

// --- TÜM ÜRÜNLERİN TEK BİR LİSTEDE TOPLANMIŞ HALİ ---
const ALL_PRODUCTS = [
  // 1. MİNERALLER
  {
    id: 101,
    category: "Mineraller",
    name: "More Than Magnesium Oil",
    image: "/images/magnesium-oil.jpg",
    shortDesc: "Transdermal magnezyum desteği.",
    description: "Doğal Zechstein Magnezyum Klorür içeren, cilt yoluyla hızlı emilen sprey formunda magnezyum takviyesi.",
    features: ["Hızlı emilim", "Kas rahatlaması", "Enerji desteği"],
    netQuantity: "200 ml",
    usage: "Haricen cilde uygulanır. Günde 10-20 puf.",
    ingredientsText: "Magnezyum Klorür, Su.",
    tableData: [{ name: "Magnezyum", amount: "103 mg/ml" }]
  },
  {
    id: 102,
    category: "Mineraller",
    name: "More Than Zeolit",
    image: "/images/zeolit.jpg",
    shortDesc: "Doğal detoks minerali.",
    description: "Vücuttaki ağır metalleri ve toksinleri bağlayarak atılmasına yardımcı olan %100 doğal mikronize zeolit.",
    features: ["Ağır metal detoksu", "pH dengesi", "%95 Klinoptilolit"],
    netQuantity: "200 gr",
    usage: "Su ile karıştırılarak içilir.",
    ingredientsText: "%100 Zeolit.",
    tableData: [{ name: "Zeolit", amount: "2500 mg" }]
  },
  
  // 2. MULTİVİTAMİNLER
  {
    id: 201,
    category: "Multivitaminler",
    name: "More Than Multivitamin Complex",
    image: "/images/multivitamin-complex.jpg",
    shortDesc: "Günlük vitamin mineral kompleksi.",
    description: "13 Vitamin, 10 Mineral ve Koenzim Q10 içeren, günlük enerji ve bağışıklık ihtiyacını karşılayan formül.",
    features: ["Q10 Katkılı", "Enerji metabolizması", "Bağışıklık desteği"],
    netQuantity: "60 Tablet",
    usage: "Günde 1 tablet tok karnına.",
    ingredientsText: "Multivitamin ve Mineral Karışımı.",
    tableData: [{ name: "Vitamin C", amount: "80 mg" }, { name: "D3", amount: "1000 IU" }]
  },
  {
    id: 202,
    name: "More Than Kids Multivitamin",
    category: "Multivitaminler",
    image: "/images/kids-multi.jpg",
    shortDesc: "Çocuklar için şurup form.",
    description: "Çocukların gelişimi için özel formüle edilmiş, lezzetli multivitamin şurubu.",
    features: ["Çocuklara özel", "Zihinsel gelişim", "İştah desteği"],
    netQuantity: "150 ml",
    usage: "Günde 1 ölçek (5ml).",
    ingredientsText: "Vitamin A, C, D, E, Çinko, İyot.",
    tableData: [{ name: "Vitamin D3", amount: "400 IU" }]
  },

  // 3. PROBİYOTİKLER
  {
    id: 301,
    category: "Probiyotikler",
    name: "More Than Probiotic 10 Billion",
    image: "/images/probiotic-10b.jpg",
    shortDesc: "10 Milyar canlı bakteri.",
    description: "Sindirim sistemini düzenlemeye ve bağışıklığı desteklemeye yardımcı 5 farklı probiyotik suşu.",
    features: ["10 Milyar CFU", "5 Suş", "DRcaps Kapsül"],
    netQuantity: "30 Kapsül",
    usage: "Günde 1 kapsül.",
    ingredientsText: "Probiyotik karışımı, İnülin.",
    tableData: [{ name: "Toplam Bakteri", amount: "10 Milyar" }]
  },

  // 4. ÖZEL TAKVİYELER
  {
    id: 401,
    category: "Özel Takviyeler",
    name: "More Than Hydrolyzed Collagen",
    image: "/images/collagen.jpg",
    shortDesc: "Tip 1-3 Hidrolize Kolajen.",
    description: "Cilt, saç ve tırnak sağlığı için hyaluronik asit ve C vitamini ile güçlendirilmiş sığır kolajeni.",
    features: ["Tip 1 & 3", "Hyaluronik Asit", "Nötr Tat"],
    netQuantity: "300 gr",
    usage: "Günde 1 ölçek (10g) suya karıştırılarak.",
    ingredientsText: "Kolajen Peptidleri, Hyaluronik Asit, Vit C.",
    tableData: [{ name: "Kolajen", amount: "10.000 mg" }]
  },
  {
    id: 402,
    category: "Özel Takviyeler",
    name: "More Than Omega-3",
    image: "/images/omega3.jpg",
    shortDesc: "Yüksek EPA/DHA balık yağı.",
    description: "Kalp ve beyin sağlığını destekleyen, ağır metallerden arındırılmış saf balık yağı.",
    features: ["Trigliserid form", "IFOS onaylı", "Yüksek saflık"],
    netQuantity: "60 Kapsül",
    usage: "Günde 1-2 kapsül.",
    ingredientsText: "Balık Yağı, E Vitamini.",
    tableData: [{ name: "EPA", amount: "330 mg" }, { name: "DHA", amount: "220 mg" }]
  },

  // 5. KİŞİSEL BAKIM
  {
    id: 501,
    category: "Kişisel Bakım",
    name: "More Than Hyaluronic Acid Serum",
    image: "/images/hyaluronic.jpg",
    shortDesc: "Yoğun nemlendirici serum.",
    description: "Cildin nem dengesini sağlayan ve dolgunlaştıran %2 Hyaluronik asit serumu.",
    features: ["Yoğun nem", "B5 Vitamini", "Dolgunlaştırıcı"],
    netQuantity: "30 ml",
    usage: "Temiz cilde sabah-akşam.",
    ingredientsText: "Hyaluronic Acid, Panthenol.",
    tableData: [{ name: "Hyaluronik Asit", amount: "%2" }]
  },
  {
    id: 502,
    category: "Kişisel Bakım",
    name: "More Than Vitamin C Serum",
    image: "/images/vitaminc-serum.jpg",
    shortDesc: "Aydınlatıcı cilt serumu.",
    description: "Cilt tonunu eşitlemeye ve ışıltı katmaya yardımcı stabil C vitamini serumu.",
    features: ["Leke karşıtı", "Aydınlatıcı", "Antioksidan"],
    netQuantity: "30 ml",
    usage: "Sadece akşamları.",
    ingredientsText: "L-Ascorbic Acid, Ferulic Acid.",
    tableData: [{ name: "Vitamin C", amount: "%10" }]
  }
]

// KATEGORİ LİSTESİ
const CATEGORIES = ["Tümü", "Mineraller", "Multivitaminler", "Probiyotikler", "Özel Takviyeler", "Kişisel Bakım"]

export function TumUrunlerContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Kategoriye göre filtreleme
  const filteredProducts = selectedCategory === "Tümü" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(product => product.category === selectedCategory)

  // Modal scroll engelleme
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- BAŞLIK VE FİLTRELER --- */}
      <div className="bg-white py-16 text-center border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Tüm Ürünlerimiz</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Sağlığınız için özenle geliştirdiğimiz tüm ürün çeşitlerini buradan inceleyebilir, 
            kategorilere göre filtreleyebilirsiniz.
          </p>

          {/* Kategori Butonları */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#00b074] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- ÜRÜN LİSTESİ --- */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
            >
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                {/* Kategori Etiketi */}
                <span className="absolute top-4 left-4 bg-white/90 text-[#00b074] text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-wide z-10">
                  {product.category}
                </span>
                {/* GÜNCELLENMİŞ RESİM KODU */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400"
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-gray-900 font-bold text-lg mb-2 leading-snug min-h-[3rem]">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{product.shortDesc}</p>
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <span className="text-[#00b074] text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                    İncele <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Bu kategoride henüz ürün bulunmamaktadır.
          </div>
        )}
      </div>

      {/* --- POP-UP MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">
                {selectedProduct.name}
              </h2>

              <div className="grid lg:grid-cols-12 gap-10">
                {/* SOL: RESİM (GÜNCELLENMİŞ) */}
                <div className="lg:col-span-5">
                  <div className="bg-gray-100 rounded-2xl h-[500px] border border-gray-200 overflow-hidden relative shadow-inner">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400"
                      }}
                    />
                  </div>
                </div>

                {/* SAĞ: DETAYLAR */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Ürün Açıklaması</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Özellikler:</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-[#00b074] shrink-0 mt-0.5" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-green-50 text-[#00b074] px-4 py-2 rounded-lg font-semibold border border-green-100 text-sm">
                    <Tag className="w-4 h-4" /> Net Miktar: {selectedProduct.netQuantity}
                  </div>
                </div>
              </div>

              {/* ALT KUTULAR */}
              <div className="mt-8 grid md:grid-cols-2 gap-4 text-sm">
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                      <Info className="w-4 h-4 text-[#00b074]" /> İçerik
                    </div>
                    <p className="text-gray-600">{selectedProduct.ingredientsText}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                      <AlertCircle className="w-4 h-4 text-[#00b074]" /> Kullanım Şekli
                    </div>
                    <p className="text-gray-600">{selectedProduct.usage}</p>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}