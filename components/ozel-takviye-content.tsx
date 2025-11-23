"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Sparkles, Heart, Activity, Shield } from "lucide-react"

// --- ÖZEL TAKVİYE ÜRÜNLERİ VERİSİ ---
const PRODUCTS = [
  {
    id: 1,
    name: "More Than Hydrolyzed Collagen",
    image: "/images/collagen.jpg", 
    shortDesc: "Tip 1 ve Tip 3 Hidrolize Kolajen.",
    description: "Cilt elastikiyeti, saç ve tırnak sağlığı için geliştirilmiş, düşük molekül ağırlıklı (2000 dalton) hidrolize sığır kolajeni. Hyaluronik asit ve Vitamin C ile zenginleştirilmiş formül.",
    features: [
      "Tip 1 & 3 Sığır Kolajeni",
      "Hyaluronik Asit katkılı",
      "Şeker ve glüten içermez",
      "Nötr tat, kolay kullanım"
    ],
    netQuantity: "300 gr Toz",
    usage: "Günde 1 ölçek (10g) toz, su veya favori içeceğinize karıştırılarak tüketilir.",
    ingredientsText: "Hidrolize Kolajen Peptidleri, Hyaluronik Asit, Vitamin C, Biotin.",
    tableData: [
      { name: "Hidrolize Kolajen", amount: "10.000 mg" },
      { name: "Hyaluronik Asit", amount: "100 mg" },
      { name: "Vitamin C", amount: "80 mg" }
    ]
  },
  {
    id: 2,
    name: "More Than Omega-3 Fish Oil",
    image: "/images/omega3.jpg",
    shortDesc: "Yüksek EPA ve DHA oranı.",
    description: "Ağır metallerden arındırılmış, soğuk sularda yaşayan küçük balıklardan elde edilen saf balık yağı. Kalp ve damar sağlığını, beyin fonksiyonlarını ve göz sağlığını destekler.",
    features: [
      "Trigliserid form",
      "Yüksek EPA/DHA değerleri",
      "IFOS onaylı hammadde",
      "Koku ve tat bırakmaz"
    ],
    netQuantity: "60 Yumuşak Kapsül",
    usage: "Yetişkinler için günde 1 veya 2 kapsül, tok karnına.",
    ingredientsText: "Balık Yağı (Omega-3), E Vitamini.",
    tableData: [
      { name: "Balık Yağı", amount: "1000 mg" },
      { name: "EPA", amount: "330 mg" },
      { name: "DHA", amount: "220 mg" }
    ]
  },
  {
    id: 3,
    name: "More Than Coenzyme Q10",
    image: "/images/coq10.jpg",
    shortDesc: "Hücresel enerji ve kalp desteği.",
    description: "Yaşla birlikte azalan Koenzim Q10 seviyelerini desteklemek için Ubiquinone formunda hazırlanmış takviyedir. Enerji üretimine katkıda bulunur ve güçlü bir antioksidandır.",
    features: [
      "100 mg CoQ10",
      "Enerji metabolizmasına destek",
      "Kalp sağlığı dostu",
      "Antioksidan koruma"
    ],
    netQuantity: "30 Kapsül",
    usage: "Günde 1 kapsül, yağlı bir öğünle birlikte alınması önerilir.",
    ingredientsText: "Koenzim Q10 (Ubiquinone), Zeytinyağı bazlı.",
    tableData: [
      { name: "Koenzim Q10", amount: "100 mg" }
    ]
  },
  {
    id: 4,
    name: "More Than Glucosamine Complex",
    image: "/images/glucosamine.jpg",
    shortDesc: "Eklem ve kıkırdak sağlığı.",
    description: "Eklem hareketliliğini desteklemek için Glukozamin, Kondroitin, MSM ve Tip 2 Kolajen içeren güçlü kombinasyon. Aktif yaşamı destekler.",
    features: [
      "Kompleks formül",
      "Kıkırdak dokuyu besler",
      "Eklem esnekliğine katkı",
      "MSM ve Boswellia ilaveli"
    ],
    netQuantity: "90 Tablet",
    usage: "Yetişkinler için günde 3 tablet.",
    ingredientsText: "Glukozamin Sülfat, Kondroitin Sülfat, MSM, Akgünlük Ekstresi.",
    tableData: [
      { name: "Glukozamin Sülfat", amount: "1500 mg" },
      { name: "Kondroitin Sülfat", amount: "1200 mg" },
      { name: "MSM", amount: "600 mg" }
    ]
  },
  {
    id: 5,
    name: "More Than Alpha Lipoic Acid",
    image: "/images/ala.jpg",
    shortDesc: "Evrensel antioksidan.",
    description: "Hem suda hem de yağda çözünebilen güçlü bir antioksidan olan Alfa Lipoik Asit (ALA). Kan şekeri dengesini desteklemeye ve sinir hasarına karşı korumaya yardımcı olur.",
    features: [
      "600 mg ALA",
      "Güçlü antioksidan etki",
      "Metabolik destek",
      "Hücre yenilenmesi"
    ],
    netQuantity: "60 Tablet",
    usage: "Günde 1 tablet, yemeklerden önce.",
    ingredientsText: "Alfa Lipoik Asit (R-Form).",
    tableData: [
      { name: "Alfa Lipoik Asit", amount: "600 mg" }
    ]
  },
  {
    id: 6,
    name: "More Than Liposomal Glutathione",
    image: "/images/glutathione.jpg",
    shortDesc: "Detoks ve bağışıklık ustası.",
    description: "Vücudun ana antioksidanı olan Glutatyon'un lipozomal teknoloji ile üretilmiş, yüksek emilimli formudur. Karaciğer detoksu ve cilt aydınlanması için destek sağlar.",
    features: [
      "Lipozomal teknoloji",
      "Maksimum emilim",
      "Karaciğer dostu",
      "Cilt tonunu eşitlemeye yardımcı"
    ],
    netQuantity: "150 ml Sıvı",
    usage: "Günde 5 ml (1 tatlı kaşığı) aç karnına.",
    ingredientsText: "Lipozomal Glutatyon, C Vitamini.",
    tableData: [
      { name: "Glutatyon", amount: "400 mg" },
      { name: "Vitamin C", amount: "100 mg" }
    ]
  },
  {
    id: 7,
    name: "More Than Bromelain 2400 GDU",
    image: "/images/bromelain.jpg",
    shortDesc: "Ödem atıcı ananas enzimi.",
    description: "Ananastan elde edilen doğal bir enzim olan Bromelain. Sindirimi kolaylaştırmaya ve vücuttaki ödemin atılmasına yardımcı olur. Yüksek enzim aktivitesine (2400 GDU) sahiptir.",
    features: [
      "Yüksek enzim aktivitesi",
      "Ödem atmaya yardımcı",
      "Sindirimi destekler",
      "Selülit görünümüne karşı"
    ],
    netQuantity: "60 Kapsül",
    usage: "Günde 1 veya 2 kapsül, bol su ile.",
    ingredientsText: "Bromelain (Ananas Ekstresi).",
    tableData: [
      { name: "Bromelain (2400 GDU/g)", amount: "500 mg" }
    ]
  },
  {
    id: 8,
    name: "More Than Sambucus Nigra",
    image: "/images/sambucus.jpg",
    shortDesc: "Kara mürver bağışıklık kalkanı.",
    description: "Kara Mürver (Sambucus Nigra), C Vitamini ve Çinko içeren üçlü kombinasyon. Mevsim geçişlerinde ve kış aylarında bağışıklık sisteminin normal fonksiyonunu destekler.",
    features: [
      "Kara Mürver Ekstresi",
      "Efervesan form",
      "Hızlı etki",
      "Lezzetli tad"
    ],
    netQuantity: "20 Efervesan Tablet",
    usage: "Günde 1 efervesan tablet, bir bardak suda eritilerek.",
    ingredientsText: "Kara Mürver Ekstresi, Vitamin C, Çinko.",
    tableData: [
      { name: "Kara Mürver Ekstresi", amount: "200 mg" },
      { name: "Vitamin C", amount: "80 mg" }
    ]
  }
]

export function OzelTakviyeContent() {
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
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Özel Takviyeler</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Spesifik sağlık ihtiyaçlarınıza yönelik geliştirilmiş; Kolajen, Omega-3, 
            Glukozamin ve bitkisel ekstreler içeren premium ürün grubu.
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
                  Özel Destek
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400"
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

        {/* --- FAYDALAR BÖLÜMÜ --- */}
        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-lg border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Sol: Başlık ve Açıklama */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Özel Takviyeler Neden Gereklidir?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Vücudumuzun bazı yapı taşları (Kolajen, Q10 gibi) yaşla birlikte azalır veya besinlerle yeterince alınamaz. 
                Özel takviyeler, bu eksiklikleri nokta atışı formüllerle tamamlamayı hedefler.
              </p>
            </div>

            {/* Sağ: Özellik Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              
              {/* Fayda 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Cilt ve Gençlik</h4>
                  <p className="text-sm text-gray-500">Kolajen ve Glutatyon, cildin elastikiyetini korumaya ve yaşlanma etkilerini yavaşlatmaya yardımcı olur.</p>
                </div>
              </div>

              {/* Fayda 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Kalp ve Damar</h4>
                  <p className="text-sm text-gray-500">Omega-3 ve CoQ10, kalp ritmini ve damar sağlığını destekleyen en güçlü besinlerdir.</p>
                </div>
              </div>

              {/* Fayda 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Eklem Sağlığı</h4>
                  <p className="text-sm text-gray-500">Glukozamin ve Kondroitin, eklem kıkırdaklarını besleyerek hareket kabiliyetini artırır.</p>
                </div>
              </div>

              {/* Fayda 4 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#00b074] shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Antioksidan Koruma</h4>
                  <p className="text-sm text-gray-500">ALA ve Bromelain gibi bileşenler vücuttaki toksinleri atmaya ve iltihabı azaltmaya destek olur.</p>
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
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400"
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