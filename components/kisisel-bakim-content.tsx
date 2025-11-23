"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Sparkles, Sun, Droplets, Shield } from "lucide-react"

// --- KİŞİSEL BAKIM ÜRÜNLERİ VERİSİ ---
const PRODUCTS = [
  {
    id: 1,
    name: "More Than Hyaluronic Acid Serum",
    image: "/images/hyaluronic.jpg", 
    shortDesc: "Yoğun nemlendirme ve dolgunluk.",
    description: "%2 Hyaluronik Asit ve B5 Vitamini içeren bu serum, cildin ihtiyaç duyduğu nemi derinlemesine sağlar. Cildin elastikiyetini artırmaya ve ince çizgi görünümünü azaltmaya yardımcı olur.",
    features: [
      "%2 Hyaluronik Asit",
      "B5 Vitamini (Panthenol) katkılı",
      "Yoğun nem desteği",
      "Dolgunlaştırma etkisi"
    ],
    netQuantity: "30 ml",
    usage: "Temiz cilde sabah ve akşam birkaç damla uygulayın. Üzerine nemlendirici krem sürülmesi tavsiye edilir.",
    ingredientsText: "Aqua, Hyaluronic Acid, Panthenol, Glycerin.",
    tableData: [
      { name: "Hyaluronik Asit", amount: "%2" },
      { name: "Vitamin B5", amount: "%1" }
    ]
  },
  {
    id: 2,
    name: "More Than Vitamin C Serum",
    image: "/images/vitaminc-serum.jpg",
    shortDesc: "Aydınlatıcı ve leke karşıtı.",
    description: "Stabilize edilmiş %10 C Vitamini ve Ferulik Asit kombinasyonu. Cilt tonunu eşitlemeye, lekelerin görünümünü azaltmaya ve cilde ışıltı kazandırmaya yardımcı olur.",
    features: [
      "Aydınlatıcı etki",
      "Leke görünümünü azaltır",
      "Antioksidan koruma",
      "Kollajen sentezini destekler"
    ],
    netQuantity: "30 ml",
    usage: "Sadece akşamları temiz cilde 3-4 damla uygulayın. Gündüzleri mutlaka güneş kremi kullanın.",
    ingredientsText: "L-Ascorbic Acid, Ferulic Acid, Vitamin E.",
    tableData: [
      { name: "Vitamin C", amount: "%10" },
      { name: "Ferulik Asit", amount: "%0.5" }
    ]
  },
  {
    id: 3,
    name: "More Than Retinol Night Cream",
    image: "/images/retinol.jpg",
    shortDesc: "Yaşlanma karşıtı gece bakımı.",
    description: "Enkapsüle Retinol teknolojisi ile formüle edilmiş, güçlü yaşlanma karşıtı gece kremi. Hücre yenilenmesini hızlandırarak kırışıklık ve ince çizgi görünümüyle savaşır.",
    features: [
      "%0.3 Saf Retinol",
      "Hücre yenileme",
      "Kırışıklık karşıtı",
      "Gece onarımı"
    ],
    netQuantity: "50 ml",
    usage: "Akşamları temiz cilde bezelye büyüklüğünde uygulayın. Başlangıçta haftada 2-3 kez kullanın.",
    ingredientsText: "Retinol, Squalane, Ceramide NP.",
    tableData: [
      { name: "Retinol", amount: "%0.3" }
    ]
  },
  {
    id: 4,
    name: "More Than SPF 50+ Sunscreen",
    image: "/images/sunscreen.jpg",
    shortDesc: "Leke karşıtı güneş koruyucu.",
    description: "UVA ve UVB ışınlarına karşı yüksek koruma sağlayan, su bazlı ve beyaz iz bırakmayan güneş kremi. Leke oluşumunu önlemeye yardımcı aktifler içerir.",
    features: [
      "SPF 50+ Tam Koruma",
      "Beyaz iz bırakmaz",
      "Suya dayanıklı",
      "Komedojenik değildir"
    ],
    netQuantity: "50 ml",
    usage: "Güneşe çıkmadan 20 dakika önce bolca uygulayın. 2 saatte bir yenileyin.",
    ingredientsText: "UVA/UVB Filtreleri, Niacinamide, Vitamin E.",
    tableData: [
      { name: "Koruma Faktörü", amount: "SPF 50+" }
    ]
  },
  {
    id: 5,
    name: "More Than Biotin Shampoo",
    image: "/images/shampoo.jpg",
    shortDesc: "Dökülme karşıtı şampuan.",
    description: "Biotin, Kafein ve Keratin kompleksi ile zenginleştirilmiş formül. Saç köklerini besleyerek dökülmeyi azaltmaya ve saçın hızlı uzamasına yardımcı olur.",
    features: [
      "Saç dökülmesine karşı",
      "Hızlı uzama etkisi",
      "Sülfatsız formül",
      "Keratin desteği"
    ],
    netQuantity: "400 ml",
    usage: "Islak saça masaj yaparak uygulayın, 2-3 dakika beklettikten sonra durulayın.",
    ingredientsText: "Biotin, Caffeine, Hydrolyzed Keratin.",
    tableData: [
      { name: "Biotin", amount: "5000 mcg/L" }
    ]
  },
  {
    id: 6,
    name: "More Than Anti-Blemish Gel",
    image: "/images/acne-gel.jpg",
    shortDesc: "Akne ve gözenek karşıtı.",
    description: "Salisilik Asit (BHA) ve Niacinamide içeren arındırıcı jel. Gözenekleri derinlemesine temizler, siyah nokta ve sivilce oluşumunu önlemeye yardımcı olur.",
    features: [
      "Gözenek sıkılaştırıcı",
      "Sebum dengeleyici",
      "Siyah nokta karşıtı",
      "Matlaştırıcı etki"
    ],
    netQuantity: "200 ml",
    usage: "Sabah ve akşam nemli yüze masaj yaparak uygulayın ve durulayın.",
    ingredientsText: "Salicylic Acid, Niacinamide, Zinc PCA.",
    tableData: [
      { name: "Salisilik Asit", amount: "%2" }
    ]
  },
  {
    id: 7,
    name: "More Than Eye Contour Serum",
    image: "/images/eye-serum.jpg",
    shortDesc: "Göz çevresi bakım serumu.",
    description: "Kafein ve Peptid kompleksi ile göz altı torbaları ve morluklarına karşı etkili bakım. Göz çevresini aydınlatır ve yorgunluk belirtilerini azaltır.",
    features: [
      "Morluk karşıtı",
      "Şişlik giderici",
      "Metal başlıklı aplikatör",
      "Hızlı emilim"
    ],
    netQuantity: "15 ml",
    usage: "Sabah ve akşam göz çevresine masaj başlığı ile uygulayın.",
    ingredientsText: "Caffeine %5, EGCG, Peptide Complex.",
    tableData: [
      { name: "Kafein", amount: "%5" }
    ]
  },
  {
    id: 8,
    name: "More Than Ceramide Moisturizer",
    image: "/images/ceramide.jpg",
    shortDesc: "Bariyer onarıcı nemlendirici.",
    description: "5 farklı Seramid ve doğal yağlar içeren yoğun nemlendirici. Cilt bariyerini onarır, hassasiyeti yatıştırır ve uzun süreli nem sağlar.",
    features: [
      "Cilt bariyerini güçlendirir",
      "Yoğun onarım",
      "Kuru ve hassas ciltler için",
      "Parfüm içermez"
    ],
    netQuantity: "50 ml",
    usage: "Sabah ve akşam tüm yüze ve boyna uygulayın.",
    ingredientsText: "Ceramide NP, AP, EOP, Shea Butter.",
    tableData: [
      { name: "Seramid Kompleksi", amount: "%3" }
    ]
  }
]

export function KisiselBakimContent() {
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
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Kişisel Bakım Ürünleri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cildinizin ve saçlarınızın doğal ışıltısını ortaya çıkaran; bilimsel içerikli, 
            temiz formüllü dermo kozmetik bakım ürünleri.
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
                  Kişisel Bakım
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400"
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

        {/* --- ALT BİLGİ --- */}
        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-lg border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Sol */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dermo Kozmetik Bakım Neden Önemlidir?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Cildimiz, bizi dış etkenlerden koruyan en büyük organımızdır. Doğru içeriklerle yapılan düzenli bakım, 
                cilt bariyerini güçlendirir ve yaşlanma belirtilerini geciktirir.
              </p>
            </div>

            {/* Sağ: Özellik Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Nem Dengesi</h4>
                  <p className="text-sm text-gray-500">Hyaluronik asit gibi içerikler cildin su tutma kapasitesini artırarak dolgunluk sağlar.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Güneş Koruması</h4>
                  <p className="text-sm text-gray-500">SPF koruması, erken yaşlanmanın ve leke oluşumunun bir numaralı düşmanıdır.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Hücresel Yenilenme</h4>
                  <p className="text-sm text-gray-500">Retinol ve Peptidler, kolajen üretimini tetikleyerek cildin kendini onarmasını destekler.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#00b074] shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Bariyer Güçlendirme</h4>
                  <p className="text-sm text-gray-500">Seramidler ve doğal yağlar, cildin koruyucu bariyerini onararak hassasiyeti azaltır.</p>
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
                
                {/* SOL: BÜYÜK RESİM */}
                <div className="lg:col-span-5">
                  <div className="bg-gray-100 rounded-2xl h-[500px] border border-gray-200 overflow-hidden relative shadow-inner">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400"
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
                    <h3 className="font-bold text-gray-900 mb-3">Öne Çıkan Özellikler:</h3>
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
                    <Droplets className="w-4 h-4" />
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
                      <span>Aktif Bileşen</span>
                      <span>Oran</span>
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
                      Haricen kullanılır. Gözle temasından kaçınınız. Temas halinde bol su ile yıkayınız.
                   </div>

                   <div className="bg-[#eff6ff] border border-[#bfdbfe] p-5 rounded-xl text-sm text-blue-900">
                      <div className="font-bold mb-1 flex items-center gap-2">
                        <Thermometer className="w-4 h-4" /> Saklama Koşulları:
                      </div>
                      Oda sıcaklığında, direkt güneş ışığından uzakta saklayınız.
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