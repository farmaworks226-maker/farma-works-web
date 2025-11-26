"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

// Storyblok'tan veri gelmezse görünecek YEDEK veri
const DEFAULT_SLIDES = [
  {
    _uid: "1",
    image: { filename: "/images/hero.png" },
    title: "Doğanın Gücü, Bilimin Işığında.",
    description: "Farma Works ile en güvenilir ve doğal takviyelerle sağlığınızı destekleyin.",
    button_text: "Tüm Ürünleri İncele",
    link: "/urunler"
  },
  {
    _uid: "2",
    image: { filename: "/images/hero.png" },
    title: "Sağlığınız Bizim İçin Değerli.",
    description: "Uluslararası kalite standartlarında üretim ve şeffaf içerik garantisi.",
    button_text: "Hikayemiz",
    link: "/kurumsal/hakkimizda"
  }
]

export function HeroSection({ slides }: { slides?: any[] }) {
  const [current, setCurrent] = useState(0)
  
  // Eğer Storyblok verisi (slides) varsa onu kullan, yoksa yedeği kullan
  const activeSlides = (slides && slides.length > 0) ? slides : DEFAULT_SLIDES;

  // 5 saniyede bir otomatik geçiş
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [activeSlides.length])

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      
      {activeSlides.map((slide, index) => {
        // Storyblok resim URL'si veya yerel resim
        const imgUrl = slide.image?.filename || "/images/hero.png";
        
        // Storyblok link objesi kontrolü
        let btnLink = "#";
        if (typeof slide.link === 'string') {
            btnLink = slide.link;
        } else if (slide.link && slide.link.cached_url) {
            // Storyblok link objesi ise
            btnLink = `/${slide.link.cached_url.replace(/^\//, "")}`;
        } else if (slide.link && slide.link.url) {
             btnLink = slide.link.url;
        }


        return (
          <div
            key={slide._uid || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Arka Plan Resmi */}
            <div className="absolute inset-0">
              <Image
                src={imgUrl}
                alt={slide.title || "Hero Image"}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Yazılar */}
            <div className="relative container mx-auto flex h-full flex-col justify-center px-4 text-center z-20">
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mb-8 text-lg text-gray-100 md:text-xl max-w-2xl mx-auto drop-shadow-md">
                {slide.description}
              </p>
              <div>
                <Link
                  href={btnLink}
                  className="inline-block rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-transform hover:scale-105 hover:bg-blue-700 shadow-lg"
                >
                  {slide.button_text || "İncele"}
                </Link>
              </div>
            </div>
          </div>
        )
      })}

      {/* Noktalar */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {activeSlides.map((_, index) => (
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