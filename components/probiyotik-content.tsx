"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, ShieldCheck, Activity, Smile, Zap } from "lucide-react"

// --- PROBİYOTİK ÜRÜNLERİ VERİSİ ---
const PRODUCTS = [
  {
    id: 1,
    name: "More Than Probiotic 10 Billion",
    image: "/images/probiotic-10b.jpg", 
    shortDesc: "Günlük sindirim desteği.",
    description: "Her kapsülde 10 milyar canlı bakteri (CFU) içeren güçlü formül. 5 farklı probiyotik suşu ile bağırsak florasını dengelemeye ve sindirim sistemini düzenlemeye yardımcı olur.",
    features: [
      "10 Milyar CFU",
      "5 Farklı Probiyotik Suşu",
      "DRcaps™ (Mide asidine dayanıklı kapsül)",
      "Sindirim konforu sağlar"
    ],
    netQuantity: "30 Kapsül",
    usage: "11 yaş ve üzeri yetişkinler için günde 1 kapsül, yemeklerden önce tüketilmesi tavsiye edilir.",
    ingredientsText: "Lactobacillus acidophilus, Bifidobacterium lactis, Lactobacillus rhamnosus, İnülin (Prebiyotik).",
    tableData: [
      { name: "Toplam Mikroorganizma", amount: "10 Milyar KOB" },
      { name: "İnülin", amount: "50 mg" }
    ]
  },
  {
    id: 2,
    name: "More Than Saccharomyces Boulardii",
    image: "/images/saccharomyces.jpg",
    shortDesc: "Seyahat dostu probiyotik maya.",
    description: "Antibiyotik kullanımı ve seyahat sırasında bozulan bağırsak dengesini korumak için özel probiyotik maya. İshal gibi sindirim sorunlarının giderilmesine destek olur.",
    features: [
      "5 Milyar S. Boulardii",
      "Seyahatler için ideal",
      "Antibiyotik ile kullanıma uygun",
      "Bağırsak bariyerini güçlendirir"
    ],
    netQuantity: "10 Saşe",
    usage: "Günde 1 saşe, su veya yoğurt ile karıştırılarak tüketilir.",
    ingredientsText: "Saccharomyces boulardii, Çinko.",
    tableData: [
      { name: "Saccharomyces boulardii", amount: "250 mg" },
      { name: "Çinko", amount: "5 mg" }
    ]
  },
  {
    id: 3,
    name: "More Than Synbiotic Complex",
    image: "/images/synbiotic.jpg",
    shortDesc: "Probiyotik + Prebiyotik.",
    description: "Probiyotik bakteriler ve onların besini olan Prebiyotikleri (lifleri) bir arada sunan Sinbiyotik formül. Bakterilerin bağırsakta daha uzun süre canlı kalmasını ve çoğalmasını sağlar.",
    features: [
      "Sinbiyotik (Pro + Pre) etki",
      "Bağırsak florasını besler",
      "Kabızlık sorununa destek",
      "Yüksek lif içeriği"
    ],
    netQuantity: "60 Kapsül",
    usage: "Yetişkinler için günde 2 kapsül bol su ile.",
    ingredientsText: "Probiyotik karışımı, Frukto-oligosakkarit (FOS).",
    tableData: [
      { name: "Probiyotik Karışımı", amount: "5 Milyar KOB" },
      { name: "Prebiyotik Lif (FOS)", amount: "200 mg" }
    ]
  },
  {
    id: 4,
    name: "More Than Kids Probiotic Drops",
    image: "/images/kids-probiotic.jpg",
    shortDesc: "Bebek ve çocuklar için damla.",
    description: "Bebeklerin ve çocukların hassas bağırsak florası için geliştirilmiş, kullanımı kolay damla formunda probiyotik. Gaz sancısı (kolik) ve sindirim düzensizliklerine karşı destek.",
    features: [
      "Bifidobacterium BB-12 içerir",
      "Kolay kullanım (Damlalık)",
      "Tat ve koku içermez",
      "Gaz giderici etki"
    ],
    netQuantity: "10 ml",
    usage: "Günde 6 damla bir kaşığa veya mamaya damlatılarak verilir.",
    ingredientsText: "Ayçiçek yağı, Bifidobacterium animalis subsp. lactis.",
    tableData: [
      { name: "Bifidobacterium BB-12", amount: "1 Milyar KOB" }
    ]
  },
  {
    id: 5,
    name: "More Than Women's Flora",
    image: "/images/womens-flora.jpg",
    shortDesc: "Kadınlara özel probiyotik.",
    description: "Kadın ürogenital sağlığını ve vajinal florayı desteklemek için özel olarak seçilmiş suşlar ve Turna Yemişi (Cranberry) ekstresi içeren kombinasyon.",
    features: [
      "Vajinal florayı dengeler",
      "Cranberry katkılı",
      "İdrar yolu sağlığına destek",
      "L. rhamnosus & L. reuteri"
    ],
    netQuantity: "30 Kapsül",
    usage: "Günde 1 veya 2 kapsül.",
    ingredientsText: "L. rhamnosus, L. reuteri, Cranberry Ekstresi.",
    tableData: [
      { name: "Probiyotik Karışımı", amount: "5 Milyar KOB" },
      { name: "Cranberry Ekstresi", amount: "100 mg" }
    ]
  },
  {
    id: 6,
    name: "More Than Digestive Enzymes",
    image: "/images/digestive-enzymes.jpg",
    shortDesc: "Sindirim enzimleri ve probiyotik.",
    description: "Yemek sonrası şişkinlik ve hazımsızlık yaşayanlar için sindirim enzimleri (Amilaz, Proteaz, Lipaz) ve probiyotiklerin güçlü birleşimi.",
    features: [
      "Hazmı kolaylaştırır",
      "Şişkinliği azaltır",
      "Besin emilimini artırır",
      "Geniş spektrumlu enzimler"
    ],
    netQuantity: "45 Tablet",
    usage: "Ana öğünlerden hemen önce 1 tablet.",
    ingredientsText: "Enzim Karışımı (Amilaz, Proteaz, Lipaz, Laktaz), Probiyotik.",
    tableData: [
      { name: "Enzim Kompleksi", amount: "300 mg" },
      { name: "Probiyotik", amount: "2 Milyar KOB" }
    ]
  },
  {
    id: 7,
    name: "More Than Fiber Biotic",
    image: "/images/fiber-biotic.jpg",
    shortDesc: "Lif kaynağı ve probiyotik.",
    description: "Suda çözünebilen lifler ve probiyotik bakteriler ile bağırsak hareketlerini düzenlemeye yardımcı toz formül. Düzenli tuvalet alışkanlığı için ideal.",
    features: [
      "Yüksek lif kaynağı",
      "Bağırsak tembelliğine karşı",
      "Tokluk hissi verir",
      "Kolay çözünür"
    ],
    netQuantity: "200 gr Toz",
    usage: "Günde 1 ölçek suya veya meyve suyuna karıştırılarak.",
    ingredientsText: "Psyllium Husk (Karnıyarık Otu), Probiyotik.",
    tableData: [
      { name: "Psyllium Lif", amount: "5000 mg" },
      { name: "Probiyotik", amount: "1 Milyar KOB" }
    ]
  },
  {
    id: 8,
    name: "More Than Oral Biotic",
    image: "/images/oral-biotic.jpg",
    shortDesc: "Ağız ve diş sağlığı probiyotiği.",
    description: "Ağız kokusu, diş eti hassasiyeti ve boğaz enfeksiyonlarına karşı ağız florasını dengeleyen, emilebilir tablet formunda özel probiyotik.",
    features: [
      "S. salivarius K12 suşu",
      "Ağız kokusunu önlemeye yardımcı",
      "Üst solunum yolu desteği",
      "Nane aromalı"
    ],
    netQuantity: "30 Emme Tableti",
    usage: "Dişler fırçalandıktan sonra günde 1 tablet emilerek tüketilir.",
    ingredientsText: "Streptococcus salivarius K12.",
    tableData: [
      { name: "S. salivarius K12", amount: "1 Milyar KOB" }
    ]
  }
]

// DİKKAT: export function (default yok)
export function ProbiyotikContent() {
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
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Probiyotik Takviyeleri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sindirim sisteminizi düzenlemeye ve bağışıklık sisteminizi desteklemeye yardımcı olan 
            dost bakterilerle tanışın. Her yaşa ve ihtiyaca uygun formüller.
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
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <span className="absolute top-4 left-4 bg-white/90 text-[#00b074] text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-wide z-10">
                  Probiyotikler
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=400"
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

        {/* --- PROBİYOTİK FAYDALARI BÖLÜMÜ --- */}
        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-lg border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Probiyotiklerin Faydaları Nelerdir?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Probiyotikler, bağırsak florasının dengesini koruyan ve sağlığımız üzerinde sayısız olumlu etkisi bulunan canlı mikroorganizmalardır.
                "İkinci beyin" olarak adlandırılan bağırsaklarımızın en önemli dostlarıdır.
              </p>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Sindirim Dengesi</h4>
                  <p className="text-sm text-gray-500">Gaz, şişkinlik ve kabızlık gibi sindirim sorunlarının giderilmesine yardımcı olur.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#00b074] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Güçlü Bağışıklık</h4>
                  <p className="text-sm text-gray-500">Bağışıklık hücrelerinin %70'i bağırsaktadır. Probiyotikler savunma sistemini güçlendirir.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Smile className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Ruh Hali ve Zihin</h4>
                  <p className="text-sm text-gray-500">Bağırsak-Beyin ekseni sayesinde stres yönetimi ve ruh hali üzerinde olumlu etkileri vardır.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Besin Emilimi</h4>
                  <p className="text-sm text-gray-500">Tüketilen gıdalardaki vitamin ve minerallerin vücut tarafından daha iyi emilmesini sağlar.</p>
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
                
                <div className="lg:col-span-5">
                  <div className="bg-gray-100 rounded-2xl h-[500px] border border-gray-200 overflow-hidden relative shadow-inner">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=400"
                      }}
                    />
                  </div>
                </div>

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