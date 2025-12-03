"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // ✅ Next.js Image bileşeni eklendi
import { Calendar, ArrowRight } from "lucide-react"
import { storyblokEditable } from "@storyblok/react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HealthTips({ blok }: { blok: any }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Aynı token'ı kullan: NEXT_PUBLIC_STORYBLOK_TOKEN
        const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN
        if (!token) {
          throw new Error("NEXT_PUBLIC_STORYBLOK_TOKEN tanımlı değil!")
        }

        // Public token için "published" kullan
        const url = `https://api.storyblok.com/v2/cdn/stories?version=published&content_type=article&per_page=3&sort_by=first_published_at:desc&token=${token}`
        
        const response = await fetch(url)
        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Hatası:", response.status, errorText)
          throw new Error(`API Hatası: ${response.status}`)
        }

        const data = await response.json()
        setArticles(data.stories || [])
      } catch (err: unknown) { // 'any' yerine 'unknown' kullanıldı
         
        console.error("Fetch hatası:", err)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError((err as any).message || "Makaleler yüklenemedi")
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <section {...storyblokEditable(blok)} className="min-h-screen bg-gray-50 py-20">
      
      {/* ÜST BAŞLIK */}
      <div className="bg-[#00b074] py-20 text-center text-white mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {blok?.title || "Sağlık Önerileri"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {blok?.description || "Sağlıklı yaşam için uzman tavsiyeleri, güncel araştırmalar ve bilimsel destekli öneriler."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {loading && (
          <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">
            <p className="font-bold">Hata:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12 text-gray-500">Henüz makale yok.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => {
            const article = item.content
            const date = item.published_at
              ? new Date(item.published_at).toLocaleDateString("tr-TR")
              : "Tarih Yok"
            
            const linkHref = item.full_slug?.startsWith("saglik-onerileri")
              ? `/${item.full_slug}`
              : `/saglik-onerileri/${item.slug}`

            return (
              <Link
                key={item.uuid}
                href={linkHref}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                  
                  {/* RESİM ALANI - DÜZELTİLDİ */}
                  <div className="relative h-56 overflow-hidden">
                    <span className="absolute top-4 left-4 z-10 bg-[#00b074] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {article?.category || "Genel"}
                    </span>
                    
                    <Image
                      src={article?.image?.filename || "https://via.placeholder.com/800x600?text=Gorsel+Yok"}
                      alt={article?.title || "Makale"}
                      fill // Kapsayıcıyı doldurur (responsive)
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>{date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#00b074] transition-colors flex-grow">
                      {article?.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {article?.seo_description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center text-[#00b074] font-bold text-sm hover:text-[#00965e] transition-colors">
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="bg-[#00965e] py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Daha Fazla Sağlık Önerisi İçin
          </h2>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-[#00965e] font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            Uzmanımıza Danışın
          </Link>
        </div>
      </div>
    </section>
  )
}