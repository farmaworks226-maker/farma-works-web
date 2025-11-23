"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Tag, Sun, Zap, Shield, Heart } from "lucide-react"

// --- 8 ADET VİTAMİN ÜRÜNÜ VERİSİ ---
const PRODUCTS = [
  {
    id: 1,
    name: "More Than Pure C Vitamini",
    image: "/images/vitamin-c.jpg", // Resim isminizi buraya göre ayarlayın
    shortDesc: "Saf L-Askorbik Asit formunda C vitamini.",
    description: "More Than Pure C Vitamini, yüksek saflıkta L-Askorbik asit içeren, bağışıklık sistemini desteklemeye yardımcı olan güçlü bir antioksidandır. Katkı maddesi içermeyen saf formülü ile günlük C vitamini ihtiyacınızı karşılar.",
    features: [
      "1000 mg Saf C Vitamini",
      "Bağışıklık sisteminin normal fonksiyonuna katkıda bulunur",
      "Yorgunluk ve bitkinliğin azalmasına yardımcı olur",
      "Kolajen oluşumunu destekler"
    ],
    netQuantity: "30 Saşe",
    usage: "11 yaş ve üzeri yetişkinler için günde 1 saşe, bir bardak (200ml) suda eritilerek tüketilmesi tavsiye edilir.",
    ingredientsText: "L-Askorbik Asit (C Vitamini).",
    tableData: [
      { name: "C Vitamini (L-Askorbik Asit)", amount: "1000 mg" }
    ]
  },
  {
    id: 2,
    name: "More Than Avokado D3K2",
    image: "/images/d3k2.jpg",
    shortDesc: "Doğal avokado yağı ile güçlendirilmiş formül.",
    description: "D3 ve K2 vitaminlerini doğal avokado yağı bazında sunan özel bir formülasyondur. Yağda çözünen bu vitaminlerin emilimi, avokado yağı sayesinde maksimum seviyeye çıkarılmıştır.",
    features: [
      "Doğal Avokado Yağı bazı",
      "Menakinon-7 (K2) formu",
      "Kemik ve diş sağlığını korur",
      "Bağışıklık sistemini destekler"
    ],
    netQuantity: "20 ml Damla",
    usage: "Yetişkinler için günde 1 puf veya 3 damla tüketilmesi önerilir.",
    ingredientsText: "Avokado Yağı, Kolekalsiferol (D3), Menakinon-7 (K2).",
    tableData: [
      { name: "Vitamin D3", amount: "1000 IU" },
      { name: "Vitamin K2", amount: "25 mcg" }
    ]
  },
  {
    id: 3,
    name: "More Than Lipozomal C",
    image: "/images/lipozomal-c.jpg",
    shortDesc: "Yüksek emilimli lipozomal teknoloji.",
    description: "Lipozomal teknoloji ile üretilen C vitamini, hücre içine doğrudan taşınarak standart C vitaminlerine göre çok daha yüksek biyoyararlanım sağlar. Mide hassasiyeti olanlar için idealdir.",
    features: [
      "Lipozomal taşıyıcı sistem",
      "Mide dostu formül",
      "Maksimum hücresel emilim",
      "Güçlü antioksidan destek"
    ],
    netQuantity: "150 ml Sıvı",
    usage: "Günde 5 ml (1 ölçek) tüketilmesi tavsiye edilir.",
    ingredientsText: "Lipozomal C Vitamini, Fosfolipidler, Saf Su.",
    tableData: [
      { name: "Lipozomal C Vitamini", amount: "1000 mg" }
    ]
  },
  {
    id: 4,
    name: "More Than Methyl B12 Sprey",
    image: "/images/b12.jpg",
    shortDesc: "Aktif formda Metilkobalamin.",
    description: "Dil altı sprey formu sayesinde sindirim sistemine uğramadan doğrudan kana karışan B12 vitamini. Vücut tarafından dönüştürülmeye ihtiyaç duymayan aktif Metilkobalamin formundadır.",
    features: [
      "Dil altı sprey ile hızlı emilim",
      "Metilkobalamin (Aktif B12)",
      "Enerji oluşum metabolizmasına katkı",
      "Sinir sistemini destekler"
    ],
    netQuantity: "20 ml Sprey",
    usage: "Dil altına günde 1 veya 2 puf sıkılarak uygulanır.",
    ingredientsText: "Metilkobalamin (Vitamin B12), Deiyonize Su, Doğal Aroma.",
    tableData: [
      { name: "Vitamin B12", amount: "1000 mcg" }
    ]
  },
  {
    id: 5,
    name: "More Than B-Complex",
    image: "/images/b-complex.jpg",
    shortDesc: "Tüm B vitaminleri tek kapsülde.",
    description: "B1, B2, B3, B5, B6, B12, Biotin ve Folik Asit içeren kapsamlı bir B vitamini kompleksidir. Enerji metabolizması ve sinir sistemi için tam destek sağlar.",
    features: [
      "Aktif vitamin formları",
      "Yorgunluk ve bitkinliğin azalması",
      "Saç ve cilt sağlığına destek",
      "Odaklanmayı artırır"
    ],
    netQuantity: "60 Kapsül",
    usage: "Yetişkinler için günde 1 kapsül, yemekle birlikte alınması önerilir.",
    ingredientsText: "B1, B2, B3, B5, B6, B12, Biotin, Folat.",
    tableData: [
      { name: "Vitamin B12", amount: "500 mcg" },
      { name: "Biotin", amount: "2500 mcg" },
      { name: "Folat", amount: "400 mcg" }
    ]
  },
  {
    id: 6,
    name: "More Than D3 1000 IU",
    image: "/images/d3.jpg",
    shortDesc: "Saf D3 vitamini desteği.",
    description: "Zeytinyağı bazlı, katkısız ve koruyucusuz D3 vitamini. Güneş ışığından yeterince faydalanamayanlar için ideal bir destek.",
    features: [
      "Doğal sızma zeytinyağı bazı",
      "Koruyucu ve tatlandırıcı içermez",
      "Kemik sağlığını korur",
      "Bağışıklığı destekler"
    ],
    netQuantity: "20 ml Damla",
    usage: "Günde 1 damla tüketilmesi tavsiye edilir.",
    ingredientsText: "Doğal Sızma Zeytinyağı, Kolekalsiferol (Vitamin D3).",
    tableData: [
      { name: "Vitamin D3", amount: "1000 IU" }
    ]
  },
  {
    id: 7,
    name: "More Than Biotin 5000",
    image: "/images/biotin.jpg",
    shortDesc: "Saç, cilt ve tırnak sağlığı.",
    description: "Yüksek dozda Biotin (Vitamin B7) içeren özel formül. Saç dökülmesini önlemeye, tırnakları güçlendirmeye ve cilt kalitesini artırmaya yardımcı olur.",
    features: [
      "Yüksek doz Biotin (5000 mcg)",
      "Saç köklerini besler",
      "Tırnak kırılmalarını önler",
      "Cildin normal fonksiyonunu korur"
    ],
    netQuantity: "60 Tablet",
    usage: "Günde 1 tablet bol su ile tüketilmelidir.",
    ingredientsText: "Biotin (D-Biotin), Mikrokristalin Selüloz.",
    tableData: [
      { name: "Biotin", amount: "5000 mcg" }
    ]
  },
  {
    id: 8,
    name: "More Than Kids Multivitamin",
    image: "/images/kids-multi.jpg",
    shortDesc: "Çocuklar için özel formül.",
    description: "Çocukların günlük vitamin ve mineral ihtiyaçlarını karşılamak üzere geliştirilmiş, lezzetli ve kolay içilebilir sıvı formda multivitamin.",
    features: [
      "Çocuklara özel dozaj",
      "Lezzetli doğal aroma",
      "Büyüme ve gelişimi destekler",
      "Zihinsel gelişime katkı sağlar"
    ],
    netQuantity: "150 ml Şurup",
    usage: "4-10 yaş grubu çocuklar için günde 5 ml (1 ölçek) tüketilmesi önerilir.",
    ingredientsText: "A, C, D, E, B Vitaminleri, Çinko, İyot.",
    tableData: [
      { name: "Vitamin C", amount: "80 mg" },
      { name: "Vitamin D3", amount: "400 IU" }
    ]
  }
]

export default function VitaminlerPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Modal açılınca arkadaki scroll'u engelleme
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
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Vitamin Takviyeleri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bağışıklık sisteminizi güçlendirmek, enerjinizi artırmak ve günlük besin 
            ihtiyacınızı karşılamak için en saf vitamin kaynakları.
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
                  Vitaminler
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  // Resim yoksa placeholder göster (Hata almamak için)
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400"
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
          
          {/* Modal Kutusu */}
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Kapatma Butonu */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal İçeriği */}
            <div className="p-6 md:p-10">
              
              {/* Başlık */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">
                {selectedProduct.name}
              </h2>

              <div className="grid lg:grid-cols-12 gap-10">
                
                {/* SOL: Büyük Resim */}
                <div className="lg:col-span-5">
                  <div className="bg-gray-100 rounded-2xl h-[500px] border border-gray-200 overflow-hidden relative shadow-inner">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400"
                      }}
                    />
                  </div>
                </div>

                {/* SAĞ: Açıklama */}
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
                    <Tag className="w-4 h-4" />
                    Net Miktar: {selectedProduct.netQuantity}
                  </div>
                </div>
              </div>

              {/* --- ALT BİLGİLER --- */}
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

                {/* Tablo */}
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

                {/* Uyarılar & Saklama */}
                <div className="bg-[#fffbeb] border border-[#fcd34d] p-5 rounded-xl text-sm text-[#92400e] flex gap-3">
                   <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                   <div>
                      <span className="font-bold">Uyarılar:</span> İlaç değildir. Hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz.
                   </div>
                </div>

                <div className="bg-[#eff6ff] border border-[#bfdbfe] p-5 rounded-xl flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Thermometer className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-blue-900 text-sm">Saklama Koşulları:</div>
                    <div className="text-blue-800 text-xs mt-1">Serin ve kuru yerde, kapağı kapalı olarak muhafaza ediniz.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. BÖLÜM: Alt Bilgi Kartı (Vitaminler Neden Önemli?) */}
      <div className="container mx-auto px-4 mb-20 max-w-7xl">
        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-lg border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vitaminler Neden Önemlidir?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Vitaminler, vücudun normal fonksiyonlarını sürdürebilmesi için eser miktarda ihtiyaç duyduğu organik bileşiklerdir. Eksiklikleri, enerji düşüklüğünden ciddi sağlık sorunlarına kadar birçok probleme yol açabilir.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">D Vitamini</h4>
                  <p className="text-sm text-gray-500">Bağışıklık sistemi ve kemik sağlığı için güneş ışığı vitamini.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">B Vitaminleri</h4>
                  <p className="text-sm text-gray-500">Enerji metabolizması ve sinir sistemi sağlığı için gereklidir.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">C Vitamini</h4>
                  <p className="text-sm text-gray-500">Güçlü antioksidan etkisiyle vücut direncini artırır.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Özel Formüller</h4>
                  <p className="text-sm text-gray-500">İhtiyaca yönelik geliştirilmiş kombine vitamin destekleri.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}