"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Activity, Droplets, RefreshCw, ShieldCheck } from "lucide-react"

const PRODUCTS = [
  {
    id: 1,
    name: "More Than Magnesium Oil",
    image: "/images/magnesium-oil.jpg", 
    shortDesc: "Transdermal magnezyum desteği.",
    description: "More Than Magnesium Oil, 250 milyon yıllık kaynaklardan elde edilen doğal Zechstein Magnesium Chloride (Magnezyum klorür) içermektedir. Dünyanın en doğal magnezyumudur. Transdermal (cilt yoluyla) emilim sayesinde sindirim sistemini yormadan kana karışır.",
    features: [
      "Her puff 3 mg elementel magnezyum içerir",
      "Vücuda hızlı emilim sağlar",
      "Yorgunluk ve bitkinlik azaltmaya katkıda bulunur",
      "Kas kramplarını rahatlatmaya yardımcı olur"
    ],
    netQuantity: "200 ml",
    usage: "Haricen kullanılır. Kullanmadan önce iyice çalkalayın. Sabah ve akşam olmak üzere günde 10-20 puf uygulanır.",
    ingredientsText: "Magnezyum (Magnezyum klorür), Deiyonize su.",
    tableData: [
      { name: "Magnezyum Klorür", amount: "103 mg / 1 ml" }
    ]
  },
  {
    id: 2,
    name: "More Than Magnezyum L-Threonate",
    image: "/images/l-threonate.jpg",
    shortDesc: "Beyin fonksiyonları ve hafıza için özel form.",
    description: "L-Threonate formu, kan-beyin bariyerini geçebilme yeteneği en yüksek olan magnezyum formudur. Bilişsel fonksiyonları, hafızayı ve öğrenme kapasitesini desteklemek için özel olarak formüle edilmiştir.",
    features: [
      "Kan-beyin bariyerini geçer",
      "Bilişsel fonksiyonları destekler",
      "Uyku kalitesini artırmaya yardımcı olur",
      "Stres ve kaygı yönetimine destek verir"
    ],
    netQuantity: "90 Kapsül",
    usage: "11 yaş ve üzeri yetişkinler için günde 3 kapsül (tercihen yatmadan 1-2 saat önce) tüketilmesi tavsiye edilir.",
    ingredientsText: "Magnezyum L-Threonate, Bitkisel Kapsül (Hidroksipropil metil selüloz).",
    tableData: [
      { name: "Magnezyum L-Threonate", amount: "2000 mg" },
      { name: "Elementel Magnezyum", amount: "144 mg" }
    ]
  },
  {
    id: 3,
    name: "More Than Magnezyum Quattromag",
    image: "/images/quattromag.jpg",
    shortDesc: "4 farklı magnezyum formu bir arada.",
    description: "Tek bir formda değil, vücudun farklı ihtiyaçlarına yönelik 4 farklı magnezyum formunu (Bisglisinat, Malat, Sitrat, Taurat) içeren kapsamlı bir kombinasyondur. Kas, enerji ve sinir sistemi için tam destek sağlar.",
    features: [
      "4 farklı şelatlı magnezyum formu",
      "Yüksek biyoyararlanım",
      "Kas ve kemik sağlığını destekler",
      "Yorgunluğun azalmasına katkıda bulunur"
    ],
    netQuantity: "60 Tablet",
    usage: "Yetişkinler için günde 1 veya 2 tablet, bol su ile tüketilmesi tavsiye edilir.",
    ingredientsText: "Magnezyum Bisglisinat, Magnezyum Malat, Magnezyum Sitrat, Magnezyum Taurat, P5P (Vit B6).",
    tableData: [
      { name: "Toplam Elementel Magnezyum", amount: "200 mg" },
      { name: "Vitamin B6 (P-5-P)", amount: "10 mg" }
    ]
  },
  {
    id: 4,
    name: "More Than Zeogum",
    image: "/images/zeogum.jpg",
    shortDesc: "Zeolit ve Kitre Gamı kombinasyonu.",
    description: "Sindirim sistemi sağlığını desteklemek ve vücuttaki toksinlerin atılmasına yardımcı olmak için Zeolit (Klinoptilolit) ve doğal lif kaynağı Kitre Gamı'nın özel birleşimidir.",
    features: [
      "Sindirim sistemini düzenlemeye yardımcı",
      "Doğal detoks etkisi",
      "Bağırsak florasını destekler",
      "Şişkinlik ve gaz şikayetlerine karşı"
    ],
    netQuantity: "30 Saşe",
    usage: "Günde 1 saşe, bir bardak (200ml) su içerisine karıştırılarak tüketilir.",
    ingredientsText: "Zeolit (Klinoptilolit), Kitre Gamı (Tragacanth Gum).",
    tableData: [
      { name: "Zeolit", amount: "800 mg" },
      { name: "Kitre Gamı", amount: "200 mg" }
    ]
  },
  {
    id: 5,
    name: "More Than Zeolit",
    image: "/images/zeolit.jpg",
    shortDesc: "%100 Doğal Klinoptilolit.",
    description: "Aktive edilmiş mikronize Zeolit. Vücuttaki ağır metalleri, toksinleri ve serbest radikalleri bağlayarak vücuttan atılmasına yardımcı olan güçlü bir doğal mineraldir.",
    features: [
      "Ağır metal detoksu",
      "pH dengesini düzenlemeye yardımcı",
      "Bağışıklık sistemini destekler",
      "%95 Klinoptilolit saflığı"
    ],
    netQuantity: "200 gr Toz",
    usage: "Günde 1 ölçek (2.5g) toz, bir bardak su ile karıştırılarak içilir. Bol su tüketilmesi önerilir.",
    ingredientsText: "%100 Mikronize Zeolit (Klinoptilolit).",
    tableData: [
      { name: "Zeolit", amount: "2500 mg" }
    ]
  },
  {
    id: 6,
    name: "Raw Material Lugol's Solution İyot %2",
    image: "/images/lugol-2.jpg",
    shortDesc: "%2 İyot çözeltisi.",
    description: "Geleneksel Lugol formülasyonuna uygun olarak hazırlanmış, %2 oranında elementel iyot ve potasyum iyodür içeren takviye edici gıdadır. Tiroid fonksiyonlarını destekler.",
    features: [
      "Orijinal Lugol formülü",
      "Tiroid sağlığını destekler",
      "Metabolizma hızını düzenler",
      "Antiseptik özellik"
    ],
    netQuantity: "30 ml",
    usage: "Yetişkinler için günde 1 damla, bir bardak suya damlatılarak tüketilmesi tavsiye edilir.",
    ingredientsText: "Elementel İyot (%2), Potasyum İyodür, Distile Su.",
    tableData: [
      { name: "İyot", amount: "2.5 mg / damla" }
    ]
  },
  {
    id: 7,
    name: "Raw Material Lugol's Solution İyot %5",
    image: "/images/lugol-5.jpg",
    shortDesc: "%5 İyot çözeltisi (Güçlü Formül).",
    description: "Daha yüksek iyot ihtiyacı olanlar için %5 konsantrasyonunda hazırlanmış Lugol çözeltisidir. Vücudun iyot eksikliğini gidermeye yardımcı olur.",
    features: [
      "Yüksek konsantrasyon",
      "Hızlı emilim",
      "Enerji metabolizmasına katkı",
      "Bilişsel fonksiyonları destekler"
    ],
    netQuantity: "30 ml",
    usage: "Doktor tavsiyesine göre kullanılır. Genellikle günde 1 damla su ile seyreltilerek alınır.",
    ingredientsText: "Elementel İyot (%5), Potasyum İyodür, Distile Su.",
    tableData: [
      { name: "İyot", amount: "6.25 mg / damla" }
    ]
  },
  {
    id: 8,
    name: "Raw Material Lugol 1000 İyot Damla",
    image: "/images/lugol-1000.jpg",
    shortDesc: "Ekonomik boy iyot çözeltisi.",
    description: "Uzun süreli kullanım için geliştirilmiş 50ml'lik özel ambalajında sunulan Lugol çözeltisidir. Aile boyu kullanım için uygundur.",
    features: [
      "Ekonomik büyük boy",
      "Kolay kullanım sağlayan damlalık",
      "Saflık analizi yapılmış hammadde",
      "Koruyucu içermez"
    ],
    netQuantity: "50 ml",
    usage: "Günde 1 damla bir bardak su içerisine damlatılarak tüketilir.",
    ingredientsText: "İyot, Potasyum İyodür, Su.",
    tableData: [
      { name: "İyot", amount: "Değişken" }
    ]
  }
]

export function MinerallerContent() {
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
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Mineral Takviyeleri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vücudunuzun ihtiyaç duyduğu temel mineralleri en saf ve etkili formüllerle 
            sunuyoruz. Magnezyum, iyot ve zeolit ürünlerimizle sağlığınızı destekleyin.
          </p>
        </div>
      </div>

      {/* --- ÜRÜN LİSTESİ GRID --- */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
            >
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <span className="absolute top-4 left-4 bg-white/90 text-[#00b074] text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-wide z-10">
                  Mineraller
                </span>
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
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <span className="text-[#00b074] text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                    Detayları Gör <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- YENİ EKLENEN BÖLÜM: Mineraller Neden Önemlidir? --- */}
        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-lg border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Sol: Başlık ve Açıklama */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mineraller Neden Önemlidir?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mineraller, vücudumuzun düzgün çalışması için gerekli olan temel besin öğeleridir. Kemik sağlığından sinir 
                iletimi, enerji üretiminden bağışıklık sistemine kadar birçok hayati fonksiyonda rol oynarlar.
              </p>
            </div>

            {/* Sağ: Özellik Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              
              {/* Madde 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#00b074] shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Magnezyum</h4>
                  <p className="text-sm text-gray-500">Kas ve sinir fonksiyonları, enerji üretimi ve kemik sağlığı için kritik öneme sahiptir.</p>
                </div>
              </div>

              {/* Madde 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">İyot</h4>
                  <p className="text-sm text-gray-500">Tiroid hormonlarının üretimi ve metabolizma düzenlenmesi için vazgeçilmezdir.</p>
                </div>
              </div>

              {/* Madde 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Zeolit</h4>
                  <p className="text-sm text-gray-500">Doğal detoksifikasyon özelliği ile vücuttaki toksinlerin atılmasına yardımcı olur.</p>
                </div>
              </div>

              {/* Madde 4 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Premium Kalite</h4>
                  <p className="text-sm text-gray-500">Tüm ürünlerimiz en yüksek saflık standartlarında üretilmektedir.</p>
                </div>
              </div>

            </div>
          </div>
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
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400"
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