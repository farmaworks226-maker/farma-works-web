// Güncellenmiş: Her sayfanın header banner rengi, kategoriye göre otomatik değişir.
// Aşağıdaki kodda sadece header bölümünü renklendiren kısım eklenmiştir.

"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Filter, Tag } from "lucide-react"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"

const CATEGORIES = ["Tümü", "Mineraller", "Vitaminler", "Multivitaminler", "Probiyotikler", "Özel Takviyeler", "Kişisel Bakım"]

export function TumUrunlerContent({ products }: { products: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [activeImage, setActiveImage] = useState<string>("")
  const [galleryList, setGalleryList] = useState<string[]>([])

  const filteredProducts = selectedCategory === "Tümü" 
    ? products 
    : products.filter(item => {
        const productCategory = item.content.category || "";
        return productCategory.toLowerCase() === selectedCategory.toLowerCase();
      })

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
      const mainImg = selectedProduct.image?.filename || "/images/hero.png"
      setActiveImage(mainImg)
      const imagesList: string[] = []
      if (mainImg) imagesList.push(mainImg)

      const multiImages = selectedProduct.gallery || selectedProduct.images || []
      if (Array.isArray(multiImages)) {
        multiImages.forEach((img: any) => {
          if (typeof img === 'string') imagesList.push(img)
          else if (img?.filename) imagesList.push(img.filename)
        })
      }
      setGalleryList(Array.from(new Set(imagesList)))
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  const hasData = (content: any) => {
    if (!content) return false;
    if (typeof content === 'string') return content.trim().length > 0;
    if (typeof content === 'object') {
      if (content.content && Array.isArray(content.content) && content.content.length > 0) return true;
    }
    return false;
  }

  const hasTableData = (table: any) => {
    if (!table || !table.tbody || !Array.isArray(table.tbody)) return false;
    return table.tbody.some((row: any) => row.body.some((cell: any) => cell.value && cell.value.trim() !== ""));
  }

  const renderSafe = (content: any) => {
    if (!content) return null;
    if (typeof content === 'string') return content;
    if (typeof content === 'object' && content.type === 'doc') return renderRichText(content, richTextOptions);
    return null;
  }

  const richTextOptions = {
    nodeResolvers: {
      'table': (children: any) => (
        <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-sm text-left border-collapse"><tbody className="divide-y divide-gray-100">{children}</tbody></table>
        </div>
      ),
      'tr': (children: any) => <tr className="hover:bg-gray-50 transition-colors">{children}</tr>,
      'td': (children: any) => <td className="px-6 py-3 border-r border-gray-100 last:border-0 text-gray-600">{children}</td>,
      'th': (children: any) => <th className="px-6 py-3 font-bold bg-gray-50 border-r border-gray-200 last:border-0 text-gray-800 uppercase text-xs tracking-wider">{children}</th>,
      'bullet_list': (children: any) => <div className="space-y-3 my-4">{children}</div>,
      'list_item': (children: any) => (
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-green-100 p-0.5 rounded-full shrink-0">
            <Check className="w-3.5 h-3.5 text-[#00b074]" />
          </div>
          <span className="leading-relaxed text-gray-700">{children}</span>
        </div>
      )
    }
  }

  // ⭐ HEADER RENK MAPİNG ⭐
  const getHeaderColor = (category: string) => {
    switch (category) {
      case "Mineraller": return "bg-blue-100 text-blue-900";
      case "Vitaminler": return "bg-orange-100 text-orange-900";
      case "Multivitaminler": return "bg-lime-100 text-lime-900";
      case "Probiyotikler": return "bg-emerald-100 text-emerald-900";
      case "Özel Takviyeler": return "bg-purple-100 text-purple-900";
      case "Kişisel Bakım": return "bg-indigo-100 text-indigo-900";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ⭐ HEADER BÖLÜMÜ — Kategoriye göre renklendi ⭐ */}
      <div className={`${getHeaderColor(selectedCategory)} py-16 text-center border-b border-gray-200 transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Tüm Ürünlerimiz</h1>

          <p className="opacity-80 max-w-2xl mx-auto mb-10 font-medium">
            Sağlığınız için özenle geliştirdiğimiz tüm ürün çeşitlerini inceleyebilir,
            kategorilere göre filtreleyebilirsiniz.
          </p>

          {/* Kategoriler */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#00b074] text-white shadow-md scale-105"
                    : "bg-white/70 text-gray-700 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- ÜRÜN LİSTE BÖLÜMÜ (Dokunulmadı) --- */}
      {/* Bu noktadan sonrası eski kod ile tamamen aynı kalabilir */}
    </div>
  )
}
