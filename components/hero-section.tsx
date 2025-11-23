"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// SLAYT AYARLARI
const SLIDES = [
  {
    id: 1,
    image: "/images/hero-bg.jpg", 
    title: "Doğanın Gücü, Bilimin Işığında.",
    description: "Farma Works ile en güvenilir ve doğal takviyelerle sağlığınızı destekleyin.",
    buttonText: "Ürünleri İncele",
    link: "/urunler" // DÜZELTİLDİ: Artık 'Tüm Ürünler' sayfasına gidiyor
  },
  {
    id: 2,
    image: "/images/hero-bg1.jpg", 
    title: "Sağlığınız Bizim İçin Değerli.",
    description: "Uluslararası kalite standartlarında üretim ve şeffaf içerik garantisi.",
    buttonText: "Hikayemiz",
    link: "/kurumsal/hakkimizda" // DÜZELTİLDİ: Eski '/hakkimizda' yerine doğrusu yazıldı
  }
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  // 5 saniyede bir otomatik geçiş
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* 1. KATMAN: Arka Plan Resmi */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Resmi biraz karartalım ki beyaz yazı okunsun */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* 2. KATMAN: Yazılar */}
          <div className="relative container mx-auto flex h-full flex-col justify-center px-4 text-center z-20">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="mb-8 text-lg text-gray-100 md:text-xl max-w-2xl mx-auto drop-shadow-md">
              {slide.description}
            </p>
            <div>
              <Link
                href={slide.link}
                className="inline-block rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-transform hover:scale-105 hover:bg-blue-700 shadow-lg"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Alt Kısımdaki Noktalar (Navigation Dots) */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  )
}