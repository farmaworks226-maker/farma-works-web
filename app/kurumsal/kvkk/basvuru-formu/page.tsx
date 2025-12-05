import { getStoryblokApi } from "@/lib/storyblok"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veri Sahibi Başvuru Formu - Farma Works",
  description: "KVKK kapsamında veri sahibi başvuru formu ve bilgilendirme.",
}

async function fetchContent() {
  const storyblokApi = getStoryblokApi()
  
  // 1. YÖNTEM: Olası slug yollarını dene
  const possibleSlugs = [
    "kurumsal/kvkk/basvuru-formu",
    "kvkk/basvuru-formu",
    "basvuru-formu"
  ]
  
  for (const slug of possibleSlugs) {
    try {
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version: "draft" })
      if (data?.story) {
        return data.story
      }
    } catch {
      // Devam et
    }
  }
  
  // 2. YÖNTEM: Bulunamazsa isme göre ara
  try {
    const { data } = await storyblokApi.get('cdn/stories', {
      version: "draft",
      search_term: "basvuru",
      per_page: 1
    })
    
    if (data.stories && data.stories.length > 0) {
      return data.stories[0]
    }
  } catch (error) {
    console.error("Storyblok Arama Hatası:", error)
  }
  
  return null
}

interface TableCellProps {
  rowspan?: number
  colspan?: number
  [key: string]: unknown
}

export default async function BasvuruFormuPage() {
  const story = await fetchContent()
  
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 p-4 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">İçerik Bulunamadı</h2>
          <p>Storyblok&apos;ta &quot;basvuru-formu&quot; slug&apos;ına sahip veya isminde &quot;basvuru&quot; geçen bir içerik oluşturduğunuzdan emin olun.</p>
        </div>
      </div>
    )
  }
  
  const content = story.content
  
  const richTextContent = content.body || content.content || content.text || content.aciklama
  
  // RichText render ayarları
  const richTextOptions = {
    nodeResolvers: {
      'table': (children: React.ReactNode) => (
        <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-sm text-left border-collapse">
            <tbody className="divide-y divide-gray-100">{children}</tbody>
          </table>
        </div>
      ),
      'tr': (children: React.ReactNode) => <tr className="hover:bg-gray-50 transition-colors">{children}</tr>,
      'td': (children: React.ReactNode, props?: TableCellProps) => {
        const { rowspan, colspan, ...rest } = props || {}
        return (
          <td 
            {...(rowspan && { rowSpan: rowspan })}
            {...(colspan && { colSpan: colspan })}
            className="px-6 py-3 border-r border-gray-100 last:border-0 text-gray-600"
            {...rest}
          >
            {children}
          </td>
        )
      },
      'th': (children: React.ReactNode, props?: TableCellProps) => {
        const { rowspan, colspan, ...rest } = props || {}
        return (
          <th 
            {...(rowspan && { rowSpan: rowspan })}
            {...(colspan && { colSpan: colspan })}
            className="px-6 py-3 font-bold bg-gray-50 border-r border-gray-200 last:border-0 text-gray-800 uppercase text-xs tracking-wider"
            {...rest}
          >
            {children}
          </th>
        )
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 pt-10 max-w-4xl">
        {/* Sayfa Başlığı */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4 border-b pb-4 inline-block">
            {content.title || story.name}
          </h1>
        </div>
        
        {/* İçerik Alanı */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {richTextContent ? renderRichText(richTextContent, richTextOptions) : (
              <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg text-center">
                <p>İçerik yüklenemedi veya henüz eklenmemiş.</p>
                <p className="text-sm mt-1">Lütfen Storyblok panelinden bu sayfa için içerik (body, content veya text alanı) girdiğinizden emin olun.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}