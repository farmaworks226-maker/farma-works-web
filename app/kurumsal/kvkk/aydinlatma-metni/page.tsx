import { getStoryblokApi } from "@/lib/storyblok"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Kişisel Verilerle İlgili Aydınlatma Metni - FW İlaç",
}

async function fetchContent() {
  const storyblokApi = getStoryblokApi()
  
  // 1. YÖNTEM: Doğrudan Slug Denemeleri
  const possibleSlugs = [
    "kurumsal/kvkk/aydinlatma-metni",
    "kvkk/aydinlatma-metni",
    "aydinlatma-metni" 
  ]
  
  for (const slug of possibleSlugs) {
    try {
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version: "draft" })
      if (data?.story) {
        console.log(`✅ Tam Eşleşme Bulundu: ${slug}`)
        return data.story
      }
    } catch {
      /* Devam et */
    }
  }
  
  // 2. YÖNTEM: İsminde "aydinlatma" geçen İLK sayfayı bul
  try {
    console.log("🔍 Tam eşleşme bulunamadı, arama yapılıyor...")
    const { data } = await storyblokApi.get('cdn/stories', {
      version: "draft",
      search_term: "aydinlatma",
      per_page: 1
    })
    
    if (data.stories && data.stories.length > 0) {
      const foundStory = data.stories[0]
      console.log(`✅ Arama Sonucu Bulundu: ${foundStory.full_slug}`)
      return foundStory
    }
  } catch (error) {
    console.error("Arama Hatası:", error)
  }
  
  return null
}

export default async function AydinlatmaMetniPage() {
  const story = await fetchContent()
  
  if (!story) {
    console.error("❌ HATA: Storyblok'ta 'aydinlatma' içeren bir hikaye bulunamadı.")
    return notFound()
  }
  
  const content = story.content
  
  const richTextContent = content.body || content.text || content.description || content.icerik || content.content
  
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl pt-20">
        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-8 border-b pb-4">
          {content.title || story.name}
        </h1>
        
        {/* İçerik */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {richTextContent ? renderRichText(richTextContent) : (
            <p className="text-red-500">
              İçerik alanı bulunamadı. Storyblok&apos;ta metin alanının ismini kontrol edin (örn: body, text).
              <br/>
              Gelen Alanlar: {Object.keys(content).join(", ")}
            </p>
          )}
        </div>
        
        {/* Alt Bilgi */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-500 text-center">
          Bu metin en son {new Date(story.published_at || story.created_at).toLocaleDateString('tr-TR')} tarihinde güncellenmiştir.
        </div>
      </div>
    </div>
  )
}