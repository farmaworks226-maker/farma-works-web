"use client"

import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

export function SaglikOnerileriContent({ articles }: { articles: any[] }) {
  
  if (!articles || articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-400">Henüz makale bulunmuyor.</h2>
          <p className="text-gray-500 mt-2">Storyblok panelinden ilk makalenizi ekleyin.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. Üst Yeşil Header */}
      <div className="bg-[#00b074] py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sağlık Önerileri</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Sağlıklı yaşam için uzman tavsiyeleri, güncel araştırmalar ve bilimsel destekli öneriler.
          </p>
        </div>
      </div>

      {/* 2. Blog Kartları Grid */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {articles.map((item) => {
            const article = item.content;
            const date = item.published_at ? new Date(item.published_at).toLocaleDateString('tr-TR') : 'Yayınlanmadı';

            return (
              <Link 
                key={item.uuid} 
                // BURASI SON ÇÖZÜM: Next.js'in beklediği en basit format. 
                // Sadece slug'ı yolluyoruz, Next.js'in otomatik /saglik-onerileri/ eklemesi için.
                href={`/saglik-onerileri/${item.slug}`} 
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                  
                  {/* Resim Alanı */}
                  <div className="relative h-56 overflow-hidden">
                    <span className="absolute top-4 left-4 z-10 bg-[#00b074] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {article.category || "Genel"}
                    </span>
                    <img 
                      src={article.image?.filename || 'https://via.placeholder.com/400x300?text=Gorsel+Yok'} 
                      alt={article.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* İçerik Alanı */}
                  <div className="p-6 flex flex-col flex-grow">
                    
                    {/* Tarih */}
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>{date}</span>
                    </div>

                    {/* Başlık */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#00b074] transition-colors flex-grow">
                      {article.title}
                    </h3>

                    {/* Açıklama (SEO Açıklaması) */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {article.seo_description}
                    </p>

                    {/* Devamını Oku Linki */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center text-[#00b074] font-bold text-sm hover:text-[#00965e] transition-colors">
                        Devamını Oku <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 3. Alt CTA (Call To Action) - Footer'ın hemen üstü */}
      <div className="bg-[#00965e] py-16 mt-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Daha Fazla Sağlık Önerisi İçin</h2>
          <Link href="/iletisim" className="inline-block bg-white text-[#00965e] font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition shadow-lg">
            Uzmanımıza Danışın
          </Link>
        </div>
      </div>
      
    </div>
  )
}