"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Droplets, Sun, Fish, Moon, Activity, Brain, Coffee, CheckCircle } from "lucide-react"

// Sağlık Önerileri Verileri (İkonlu ve Metinli)
const TIPS = [
  {
    id: 1,
    icon: <Droplets className="w-12 h-12 text-blue-500" />,
    title: "Bol Su Tüketin",
    category: "Hidrasyon",
    description: "Vücut fonksiyonlarının düzenli çalışması için günde en az 2-3 litre su için."
  },
  {
    id: 2,
    icon: <Sun className="w-12 h-12 text-orange-500" />,
    title: "D Vitamini Alımı",
    category: "Vitaminler",
    description: "Kemik sağlığı ve bağışıklık için güneş ışığından faydalanın veya takviye alın."
  },
  {
    id: 3,
    icon: <Fish className="w-12 h-12 text-blue-600" />,
    title: "Omega-3 Desteği",
    category: "Kalp Sağlığı",
    description: "Beyin fonksiyonları ve kalp sağlığı için balık yağı veya Omega-3 kaynaklarını tüketin."
  },
  {
    id: 4,
    icon: <CheckCircle className="w-12 h-12 text-green-600" />,
    title: "Probiyotik Tüketimi",
    category: "Sindirim",
    description: "Sindirim sistemini düzenlemek ve bağışıklığı güçlendirmek için probiyotiklere yer verin."
  },
  {
    id: 5,
    icon: <Moon className="w-12 h-12 text-indigo-500" />,
    title: "Kaliteli Uyku",
    category: "Dinlenme",
    description: "Vücudun yenilenmesi için her gece 7-8 saat kesintisiz uyumaya özen gösterin."
  },
  {
    id: 6,
    icon: <Activity className="w-12 h-12 text-red-500" />,
    title: "Düzenli Egzersiz",
    category: "Hareket",
    description: "Haftada en az 150 dakika orta tempolu egzersiz yaparak formunuzu koruyun."
  },
  {
    id: 7,
    icon: <Brain className="w-12 h-12 text-purple-500" />,
    title: "Stres Yönetimi",
    category: "Zihin Sağlığı",
    description: "Meditasyon, yoga veya nefes egzersizleri ile günlük stresi azaltın."
  },
  {
    id: 8,
    icon: <Coffee className="w-12 h-12 text-green-700" />,
    title: "Yeşil Çay Tüketimi",
    category: "Antioksidan",
    description: "Metabolizmayı hızlandırmak ve toksin atmak için günde 1-2 fincan yeşil çay için."
  }
]

export function HealthTipsSlider() {
  const [current, setCurrent] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  // Ekran boyutuna göre gösterilecek kart sayısını ayarla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3) // Masaüstü: 3 kart
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2) // Tablet: 2 kart
      } else {
        setItemsPerPage(1) // Mobil: 1 kart
      }
    }

    handleResize() // İlk yüklemede çalıştır
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % (TIPS.length - itemsPerPage + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? TIPS.length - itemsPerPage : prev - 1))
  }

  // Otomatik geçiş
  useEffect(() => {
    const timer = setInterval(() => {
        // Döngüsel geçiş (Başa sarma)
        setCurrent((prev) => {
            const maxIndex = TIPS.length - itemsPerPage;
            return prev >= maxIndex ? 0 : prev + 1;
        });
    }, 4000)
    return () => clearInterval(timer)
  }, [itemsPerPage])

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Sağlıklı Yaşam İpuçları</h2>
          <p className="text-gray-500 mt-2">Daha iyi bir yaşam için günlük alışkanlıklar.</p>
        </div>

        <div className="relative group">
          
          {/* Slider Penceresi */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * (100 / itemsPerPage)}%)` }}
            >
              {TIPS.map((tip) => (
                <div 
                  key={tip.id} 
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className="mb-4 p-4 bg-gray-50 rounded-full">
                      {tip.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                      {tip.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oklar */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white text-gray-600 hover:text-[#00b074] p-3 rounded-full shadow-md border border-gray-100 transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Önceki İpucu"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white text-gray-600 hover:text-[#00b074] p-3 rounded-full shadow-md border border-gray-100 transition-all z-10 opacity-0 group-hover:opacity-100"
            aria-label="Sonraki İpucu"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Noktalar (Opsiyonel, çok fazla madde olduğu için kalabalık olabilir ama eklenebilir) */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: TIPS.length - itemsPerPage + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === current ? "bg-[#00b074] w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}