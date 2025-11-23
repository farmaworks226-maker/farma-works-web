"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Sun, Droplets, Utensils, Fish, Moon, Activity, Brain, Coffee } from "lucide-react"

// İPUCU VERİLERİ
const TIPS = [
  {
    id: 1,
    category: "Bağışıklık",
    title: "Probiyotik Tüketimi",
    description: "Bağırsak florası için düzenli probiyotik tüketin. Yoğurt, kefir gibi fermente gıdalar veya probiyotik takviyeler bağışıklık sisteminizi güçlendirir.",
    icon: <Utensils className="w-8 h-8 text-white" />
  },
  {
    id: 2,
    category: "Vitamin Desteği",
    title: "D Vitamini Alımı",
    description: "Günde en az 15-20 dakika güneş ışığından faydalanın. Eksikliği durumunda kemik sağlığı ve bağışıklık için takviye almayı ihmal etmeyin.",
    icon: <Sun className="w-8 h-8 text-white" />
  },
  {
    id: 3,
    category: "Hidrasyon",
    title: "Bol Su Tüketin",
    description: "Vücut fonksiyonlarının düzgün çalışması için günde en az 2-2.5 litre su için. Su, toksinlerin atılmasına ve cildin nemlenmesine yardımcı olur.",
    icon: <Droplets className="w-8 h-8 text-white" />
  },
  {
    id: 4,
    category: "Kalp Sağlığı",
    title: "Omega-3 Desteği",
    description: "Kalp ve beyin sağlığı için haftada iki kez balık tüketin veya düzenli Omega-3 takviyesi alın. Hafızayı güçlendirir ve iltihabı azaltır.",
    icon: <Fish className="w-8 h-8 text-white" />
  },
  {
    id: 5,
    category: "Dinlenme",
    title: "Kaliteli Uyku",
    description: "Günde 7-8 saat karanlık ve sessiz bir ortamda uyumaya özen gösterin. Kaliteli uyku, vücudun yenilenmesi için en önemli süreçtir.",
    icon: <Moon className="w-8 h-8 text-white" />
  },
  {
    id: 6,
    category: "Hareket",
    title: "Düzenli Egzersiz",
    description: "Haftada en az 150 dakika orta tempolu yürüyüş veya egzersiz yapın. Hareket etmek kalp ritmini düzenler ve stresi azaltır.",
    icon: <Activity className="w-8 h-8 text-white" />
  },
  {
    id: 7,
    category: "Zihin Sağlığı",
    title: "Stres Yönetimi",
    description: "Günlük hayatın stresinden uzaklaşmak için meditasyon veya nefes egzersizleri yapın. Zihinsel sağlık, fiziksel sağlık kadar önemlidir.",
    icon: <Brain className="w-8 h-8 text-white" />
  },
  {
    id: 8,
    category: "Antioksidan",
    title: "Yeşil Çay Tüketimi",
    description: "Metabolizmayı hızlandırmak ve hücreleri korumak için günde 1 fincan yeşil çay tüketin. Güçlü bir antioksidan kaynağıdır.",
    icon: <Coffee className="w-8 h-8 text-white" />
  }
]

// İSTATİSTİK VERİLERİ
const STATS = [
  { number: "100+", label: "Sağlık İpucu" },
  { number: "50+", label: "Ürün Çeşidi" },
  { number: "15+", label: "Yıllık Deneyim" },
  { number: "10K+", label: "Mutlu Müşteri" },
]

export function HealthTips() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TIPS.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TIPS.length - 1 : prev - 1))
  }

  return (
    <section className="py-20 bg-[#f0fdf4] overflow-hidden"> {/* Açık yeşil arka plan */}
      <div className="container mx-auto px-4">
        
        {/* --- SLIDER ALANI --- */}
        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-20 min-h-[300px] flex items-center justify-center">
          
          {/* Sol Ok */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#10b981] hover:scale-110 transition z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Kart İçeriği */}
          <div className="text-center w-full max-w-2xl transition-all duration-500 ease-in-out transform">
            
            {/* İkon Kutusu */}
            <div className="w-16 h-16 bg-[#10b981] rounded-xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-green-200">
              {TIPS[currentIndex].icon}
            </div>

            {/* Kategori Badge */}
            <span className="inline-block bg-green-100 text-[#10b981] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              {TIPS[currentIndex].category}
            </span>

            {/* Başlık ve Açıklama */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {TIPS[currentIndex].title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-lg">
              {TIPS[currentIndex].description}
            </p>
          </div>

          {/* Sağ Ok */}
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#10b981] hover:scale-110 transition z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Alt Noktalar (Pagination) */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {TIPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-6 bg-[#10b981]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>

        {/* --- İSTATİSTİK ALANI (Alt Kısım) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-green-100 pt-12 max-w-5xl mx-auto">
          {STATS.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold text-[#10b981] mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}