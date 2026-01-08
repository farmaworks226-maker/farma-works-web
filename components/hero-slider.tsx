"use client"

import { useState, useEffect } from "react"
import { storyblokEditable, StoryblokComponent, SbBlokData } from "@storyblok/react"

type Slide = SbBlokData

interface HeroSliderBlok extends SbBlokData {
  slides?: Slide[]
  body?: Slide[]
  slaytlar?: Slide[]
}

export function HeroSlider({ blok }: { blok: HeroSliderBlok }) {
  const [current, setCurrent] = useState(0)

  console.log("HeroSlider Gelen Blok:", blok)

  const slides = blok?.slides || blok?.body || blok?.slaytlar || []

  // Otomatik geçiş
  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  // Slayt yoksa veya boşsa
  if (!slides || slides.length === 0) {
    return (
      <div className="bg-gray-800 text-white p-10 text-center">
        <h2 className="text-2xl font-bold">Slayt Bulunamadı</h2>
        <p>Lütfen Storyblok panelinden &apos;hero_slider_container&apos; bloğunun içine slayt eklediğinizden emin olun.</p>
        <p className="text-sm text-gray-400 mt-2">Beklenen alan adı: &apos;slides&apos;, &apos;body&apos; veya &apos;slaytlar&apos;.</p>
        <pre className="mt-4 text-xs text-left bg-black p-4 overflow-auto max-h-40 border border-gray-700 rounded">
          {JSON.stringify(blok, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <section 
      {...storyblokEditable(blok)} 
      className="relative w-full h-screen overflow-hidden"
    >
      {/* SLAYTLAR */}
      {slides.map((slideBlok, index) => (
        <div
          key={slideBlok._uid}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <StoryblokComponent blok={slideBlok} />
        </div>
      ))}

      {/* NOKTALAR (Navigasyon) */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-all shadow-sm ${
                index === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Slayt ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}