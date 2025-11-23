"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer } from "lucide-react"

// --- MULTİVİTAMİN ÜRÜNLERİ VERİSİ ---
const PRODUCTS = [
  {
    id: 1,
    name: "More Than Multivitamin Complex",
    image: "/images/multivitamin-complex.jpg", 
    shortDesc: "Günlük vitamin ve mineral desteği.",
    description: "Vücudun günlük ihtiyaç duyduğu temel vitamin ve mineralleri tek bir tablette sunan kapsamlı formüldür. Bağışıklık sistemini güçlendirmeye, enerji oluşum metabolizmasına ve yorgunluğun azalmasına katkıda bulunur.",
    features: [
      "13 Vitamin ve 10 Mineral",
      "Koenzim Q10 ilaveli",
      "Yüksek biyoyararlanım",
      "Enerji ve zindelik sağlar"
    ],
    netQuantity: "60 Tablet",
    usage: "11 yaş ve üzeri yetişkinler için günde 1 tablet, tok karnına tüketilmesi tavsiye edilir.",
    ingredientsText: "Vitamin C, Vitamin D3, Vitamin B12, Çinko, Magnezyum, Koenzim Q10.",
    tableData: [
      { name: "Vitamin C", amount: "80 mg" },
      { name: "Vitamin D3", amount: "1000 IU" },
      { name: "Çinko", amount: "10 mg" },
      { name: "Koenzim Q10", amount: "50 mg" }
    ]
  },
  {
    id: 2,
    name: "More Than B-Complex Plus",
    image: "/images/b-complex.jpg",
    shortDesc: "Aktif formda B vitaminleri.",
    description: "Sinir sistemi sağlığı ve enerji metabolizması için kritik öneme sahip B grubu vitaminlerinin tamamını aktif formda (Metilfolat, Metilkobalamin) içeren özel kombinasyondur.",
    features: [
      "Metilfolat ve Metilkobalamin içerir",
      "Sinir sistemini destekler",
      "Saç ve cilt sağlığına katkı",
      "Homosistein metabolizmasını düzenler"
    ],
    netQuantity: "50 Kapsül",
    usage: "Günde 1 kapsül, sabahları tok karnına alınması önerilir.",
    ingredientsText: "B1, B2, B3, B5, B6 (P5P), B12, Folat, Biotin.",
    tableData: [
      { name: "Vitamin B12 (Metilkobalamin)", amount: "1000 mcg" },
      { name: "Folat (Metilfolat)", amount: "400 mcg" },
      { name: "Biotin", amount: "5000 mcg" }
    ]
  },
  {
    id: 3,
    name: "More Than Kids Multivitamin",
    image: "/images/kids-multi.jpg",
    shortDesc: "Çocuklar için özel formül.",
    description: "Çocukların büyüme ve gelişme dönemindeki ihtiyaçlarına özel olarak formüle edilmiş, lezzetli ve kolay tüketilebilir şurup formunda multivitamin ve mineral desteğidir.",
    features: [
      "Çocuklar için güvenli içerik",
      "Doğal meyve aromalı",
      "Zihinsel gelişimi destekler",
      "İştah düzenlemeye yardımcı"
    ],
    netQuantity: "150 ml",
    usage: "4-10 yaş grubu çocuklar için günde 1 ölçek (5ml) tüketilmesi önerilir.",
    ingredientsText: "Vitamin A, C, D, E, Çinko, İyot, Selenyum.",
    tableData: [
      { name: "Vitamin D3", amount: "400 IU" },
      { name: "Çinko", amount: "5 mg" },
      { name: "İyot", amount: "75 mcg" }
    ]
  },
  {
    id: 4,
    name: "More Than Women's Daily",
    image: "/images/women-multi.jpg",
    shortDesc: "Kadınlara özel multivitamin.",
    description: "Kadın metabolizmasının ihtiyaçlarına göre özelleştirilmiş; Demir, Folik Asit ve Biotin açısından zenginleştirilmiş günlük destek.",
    features: [
      "Saç, cilt ve tırnak desteği",
      "Hormonal dengeye katkı",
      "Demir eksikliğine destek",
      "Antioksidan etki"
    ],
    netQuantity: "60 Tablet",
    usage: "Yetişkin kadınlar için günde 1 tablet.",
    ingredientsText: "Demir, Folik Asit, Biotin, Vitamin E, Primrose Oil.",
    tableData: [
      { name: "Demir (Bisglisinat)", amount: "17 mg" },
      { name: "Folik Asit", amount: "400 mcg" }
    ]
  },
  {
    id: 5,
    name: "More Than Men's Energy",
    image: "/images/men-multi.jpg",
    shortDesc: "Erkeklere özel performans.",
    description: "Erkek sağlığı için önemli olan Çinko, Selenyum ve Ginseng ile güçlendirilmiş, enerji ve performans odaklı multivitamin.",
    features: [
      "Kas fonksiyonlarını destekler",
      "Testosteron seviyesini dengeler",
      "Enerji artışı sağlar",
      "Ginseng katkılı"
    ],
    netQuantity: "60 Tablet",
    usage: "Yetişkin erkekler için günde 1 tablet.",
    ingredientsText: "Ginseng, Çinko, Selenyum, Vitamin D.",
    tableData: [
      { name: "Panax Ginseng", amount: "100 mg" },
      { name: "Çinko", amount: "15 mg" }
    ]
  },
  {
    id: 6,
    name: "Lipozomal Multivitamin",
    image: "/images/lipozomal-multi.jpg",
    shortDesc: "Maksimum emilim teknolojisi.",
    description: "Lipozomal teknoloji ile üretilmiş vitaminler, hücre içine doğrudan taşınarak maksimum emilim ve biyoyararlanım sağlar. Mide hassasiyeti yaratmaz.",
    features: [
      "%90+ Emilim oranı",
      "Hücre içi teslimat",
      "Mide dostu",
      "Sıvı form"
    ],
    netQuantity: "250 ml",
    usage: "Günde 10 ml (1 ölçek) aç karnına.",
    ingredientsText: "Lipozomal C, D3, K2, B Kompleks.",
    tableData: [
      { name: "Vitamin C", amount: "1000 mg" },
      { name: "Vitamin D3", amount: "2000 IU" }
    ]
  },
  {
    id: 7,
    name: "More Than D3K2 Damla",
    image: "/images/d3k2.jpg",
    shortDesc: "Kemik ve bağışıklık desteği.",
    description: "Doğal zeytinyağı bazlı, yüksek emilimli Vitamin D3 ve K2 (Menakinon-7) kombinasyonu. Kemik sağlığının korunması için ideal ikili.",
    features: [
      "Doğal zeytinyağı bazlı",
      "Koruyucu içermez",
      "K2 vitamini ile kalsiyum yönlendirmesi",
      "Bağışıklık desteği"
    ],
    netQuantity: "20 ml",
    usage: "Günde 1 puf/damla.",
    ingredientsText: "Vitamin D3, Vitamin K2 (MK-7), Zeytinyağı.",
    tableData: [
      { name: "Vitamin D3", amount: "1000 IU" },
      { name: "Vitamin K2", amount: "25 mcg" }
    ]
  },
  {
    id: 8,
    name: "More Than Vitamin C 1000",
    image: "/images/vitamin-c.jpg",
    shortDesc: "Yüksek doz C vitamini.",
    description: "Asitliği giderilmiş (tamponlanmış) formda 1000 mg C vitamini. Turunçgil bioflavonoidleri ile zenginleştirilmiş, mideyi yormayan formül.",
    features: [
      "Mide dostu (Sodium Ascorbate)",
      "Bioflavonoid katkılı",
      "Güçlü antioksidan",
      "Kolajen üretimini destekler"
    ],
    netQuantity: "30 Tablet",
    usage: "Günde 1 tablet.",
    ingredientsText: "Vitamin C (L-Askorbik Asit), Turunçgil Bioflavonoidleri.",
    tableData: [
      { name: "Vitamin C", amount: "1000 mg" }
    ]
  }
]

export function MultivitaminContent() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- ÜST BAŞLIK --- */}
      <div className="bg-white py-20 text-center border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Multivitaminler</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Günlük beslenmenizi destekleyen, enerji ve bağışıklık sisteminizi güçlendiren 
            kapsamlı vitamin ve mineral kompleksleri.
          </p>
        </div>
      </div>

      {/* --- ÜRÜN LİSTESİ --- */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
            >
              {/* LİSTE GÖRÜNÜMÜ */}
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <span className="absolute top-4 left-4 bg-white/90 text-[#00b074] text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-wide z-10">
                  Multivitamin
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1577401239170-8979412966f3?auto=format&fit=crop&q=80&w=400"
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-gray-900 font-bold text-lg mb-2 leading-snug min-h-[3rem]">
                  {product.name}
                </h3>
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <span className="text-[#00b074] text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                    Detayları Gör <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
                
                {/* SOL: BÜYÜK RESİM (TAM KAPLAYAN) */}
                <div className="lg:col-span-5">
                  <div className="bg-gray-100 rounded-2xl h-[500px] border border-gray-200 overflow-hidden relative shadow-inner">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1577401239170-8979412966f3?auto=format&fit=crop&q=80&w=400"
                      }}
                    />
                  </div>
                </div>

                {/* SAĞ: DETAYLAR */}
                <div className="lg:col-span-7 space-y-8">
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Ürün Açıklaması</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Özellikler:</h3>
                    <ul className="space-y-3">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <Check className="w-5 h-5 text-[#00b074] shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-green-50 text-[#00b074] px-4 py-2 rounded-lg font-semibold border border-green-100">
                    <Thermometer className="w-4 h-4" />
                    Net Miktar: {selectedProduct.netQuantity}
                  </div>
                </div>

              </div>

              <div className="mt-12 space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                      <Info className="w-5 h-5 text-[#00b074]" /> İçerik
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedProduct.ingredientsText}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                      <AlertCircle className="w-5 h-5 text-[#00b074]" /> Kullanım Şekli
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedProduct.usage}</p>
                  </div>
                </div>

                {/* TABLO */}
                {selectedProduct.tableData.length > 0 && (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-100 px-6 py-3 font-bold text-gray-800 text-sm border-b border-gray-200 flex justify-between">
                      <span>Etken Madde</span>
                      <span>Miktar</span>
                    </div>
                    <div className="divide-y divide-gray-100 bg-white">
                      {selectedProduct.tableData.map((row: any, i: number) => (
                        <div key={i} className="flex justify-between px-6 py-4 text-sm hover:bg-gray-50">
                          <span className="font-medium text-gray-700">{row.name}</span>
                          <span className="font-bold text-gray-900">{row.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* UYARI ve SAKLAMA */}
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-[#fffbeb] border border-[#fcd34d] p-5 rounded-xl text-sm text-[#92400e]">
                      <div className="font-bold mb-1 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Uyarılar:
                      </div>
                      İlaç değildir. Hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz.
                   </div>

                   <div className="bg-[#eff6ff] border border-[#bfdbfe] p-5 rounded-xl text-sm text-blue-900">
                      <div className="font-bold mb-1 flex items-center gap-2">
                        <Thermometer className="w-4 h-4" /> Saklama Koşulları:
                      </div>
                      Serin ve kuru yerde, kapağı kapalı olarak muhafaza ediniz.
                   </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}