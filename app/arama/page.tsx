import { getStoryblokApi } from "@/lib/storyblok"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, FileText, Package } from "lucide-react"

export const metadata = {
  title: "Arama Sonuçları | FW İlaç",
  description: "FW İlaç ürün ve sayfa arama sonuçları",
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

async function searchContent(query: string) {
  const storyblokApi = getStoryblokApi()
  
  try {
    // Ürünlerde ara
    const { data: productsData } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      content_type: "product",
      search_term: query,
      per_page: 20,
    })

    // Sayfalarda ara
    const { data: pagesData } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      search_term: query,
      per_page: 20,
      excluding_fields: "body",
    })

    // Ürün olmayanları filtrele (sayfalar)
    const pages = pagesData.stories.filter(
      (story: { content: { component: string } }) => story.content.component !== "product"
    )

    return {
      products: productsData.stories,
      pages: pages,
    }
  } catch {
    return { products: [], pages: [] }
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""
  
  const { products, pages } = query ? await searchContent(query) : { products: [], pages: [] }
  
  const totalResults = products.length + pages.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-[#F3EBE2] py-16 border-b border-[#e5d9ca]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white text-[#ED6E2D] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Search className="w-4 h-4" />
            Arama
          </div>
          <h1 className="text-4xl font-bold text-[#1E40D8] mb-4">
            {query ? `"${query}" için sonuçlar` : "Arama"}
          </h1>
          {query && (
            <p className="text-gray-600">
              {totalResults} sonuç bulundu
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {!query ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-400 mb-2">Arama yapmak için bir kelime girin</h2>
            <p className="text-gray-500">Ürünler ve sayfalar arasında arama yapabilirsiniz.</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-400 mb-2">Sonuç bulunamadı</h2>
            <p className="text-gray-500">"{query}" için herhangi bir sonuç bulunamadı.</p>
            <Link 
              href="/urunler" 
              className="inline-flex items-center gap-2 mt-6 text-[#ED6E2D] font-semibold hover:underline"
            >
              Tüm ürünleri görüntüle <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* ÜRÜN SONUÇLARI */}
            {products.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-[#ED6E2D]" />
                  <h2 className="text-xl font-bold text-[#1E40D8]">Ürünler ({products.length})</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((item: { uuid: string; full_slug: string; content: { name: string; image?: { filename: string }; category?: string } }) => (
                    <Link
                      key={item.uuid}
                      href={`/${item.full_slug}`}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        {item.content.image?.filename ? (
                          <Image
                            src={item.content.image.filename}
                            alt={item.content.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                        {item.content.category && (
                          <span className="absolute top-3 left-3 bg-white/90 text-[#ED6E2D] text-[10px] font-bold px-2 py-1 rounded border border-orange-100 uppercase">
                            {item.content.category}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.content.name}</h3>
                        <span className="text-[#ED6E2D] text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          İncele <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* SAYFA SONUÇLARI */}
            {pages.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-[#1E40D8]" />
                  <h2 className="text-xl font-bold text-[#1E40D8]">Sayfalar ({pages.length})</h2>
                </div>
                <div className="space-y-3">
                  {pages.map((item: { uuid: string; full_slug: string; name: string }) => (
                    <Link
                      key={item.uuid}
                      href={`/${item.full_slug}`}
                      className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:border-[#1E40D8] hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F3EBE2] rounded-full flex items-center justify-center text-[#1E40D8]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-gray-900">{item.name}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#ED6E2D] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}