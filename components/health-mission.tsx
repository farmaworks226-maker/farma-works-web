"use client"

import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, Leaf, FlaskConical, Microscope } from "lucide-react"
import { storyblokEditable } from "@storyblok/react/rsc"

interface HealthMissionBlok {
  _uid: string
  component: string
  small_title?: string
  title?: string
  description?: string
  button_text?: string
  button_link?: {
    cached_url?: string
    url?: string
  }
  image?: {
    filename?: string
  }
  [key: string]: unknown
}

export function HealthMission({ blok }: { blok: HealthMissionBlok }) {
  if (!blok) return null

  // Buton linki kontrolü
  let btnLink = "/kurumsal/hakkimizda"
  if (blok.button_link) {
    if (blok.button_link.cached_url) btnLink = `/${blok.button_link.cached_url.replace(/^\//, "")}`
    else if (blok.button_link.url) btnLink = blok.button_link.url
  }

  return (
    <section {...storyblokEditable(blok)} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* SOL TARAF */}
          <div>
            <h4 className="text-[#00b074] font-bold uppercase tracking-wider mb-2 text-sm">
              {blok.small_title || "Sağlıklı Yaşamın Öncüsü"}
            </h4>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blok.title || "Sağlığınız İçin Her Şey"}
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {blok.description || "Farma Works olarak, premium kalitede doğal sağlık takviyeleri ile optimum sağlığı hedefliyoruz."}
            </p>

            {/* ÖZELLİKLER */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                <div><h5 className="font-bold text-gray-900">GMP Sertifikalı</h5><p className="text-sm text-gray-500">Uluslararası kalite standartları</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0"><Leaf className="w-6 h-6" /></div>
                <div><h5 className="font-bold text-gray-900">Doğal İçerik</h5><p className="text-sm text-gray-500">%100 doğal ham maddeler</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0"><FlaskConical className="w-6 h-6" /></div>
                <div><h5 className="font-bold text-gray-900">Laboratuvar Testli</h5><p className="text-sm text-gray-500">Her ürün test edilir</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0"><Microscope className="w-6 h-6" /></div>
                <div><h5 className="font-bold text-gray-900">Bilimsel Formül</h5><p className="text-sm text-gray-500">Araştırma destekli</p></div>
              </div>
            </div>

            <Link 
              href={btnLink} 
              className="inline-block bg-[#00b074] hover:bg-[#00965e] text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-green-200"
            >
              {blok.button_text || "Daha Fazla Bilgi"}
            </Link>
          </div>

          {/* SAĞ TARAF: Görsel */}
          <div className="relative">
            <div className="absolute -inset-4 bg-green-100 rounded-[2.5rem] transform rotate-3 -z-10"></div>
            
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src={blok.image?.filename || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"} 
                alt="Farma Works Mission" 
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}