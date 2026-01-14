"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, AlertCircle, Info, Thermometer, Tag } from "lucide-react"
import { Product } from "@/types/storyblok"
import React from "react"

// --- TİP TANIMLAMALARI ---
interface GalleryImage {
  filename?: string
}

interface TableRow {
  body: Array<{ value: string }>
}

interface TableData {
  tbody?: TableRow[]
  thead?: Array<{ value: string }>
}

interface RichTextNode {
  type: string
  content?: RichTextNode[]
  text?: string
  marks?: { type: string }[]
  attrs?: Record<string, unknown>
}

// --- CUSTOM RICH TEXT RENDERER ---
const renderRichTextContent = (node: RichTextNode, key?: number): React.ReactNode => {
  if (!node) return null

  // Text node
  if (node.type === 'text') {
    let content: React.ReactNode = node.text || ''
    if (node.marks) {
      node.marks.forEach((mark, i) => {
        if (mark.type === 'bold') {
          content = <strong key={`bold-${key}-${i}`}>{content}</strong>
        } else if (mark.type === 'italic') {
          content = <em key={`italic-${key}-${i}`}>{content}</em>
        }
      })
    }
    return content
  }

  // Get children - NO span wrapper for table elements
  const children = node.content?.map((child, i) => renderRichTextContent(child, i))

  switch (node.type) {
    case 'doc':
      return <React.Fragment key={key}>{children}</React.Fragment>
    case 'paragraph':
      return <p key={key} className="mb-4">{children}</p>
    case 'heading':
      const level = (node.attrs?.level as number) || 2
      if (level === 1) return <h1 key={key} className="font-bold mb-2 text-2xl">{children}</h1>
      if (level === 2) return <h2 key={key} className="font-bold mb-2 text-xl">{children}</h2>
      if (level === 3) return <h3 key={key} className="font-bold mb-2 text-lg">{children}</h3>
      return <h4 key={key} className="font-bold mb-2">{children}</h4>
    case 'bullet_list':
      return <div key={key} className="space-y-3 my-4">{children}</div>
    case 'ordered_list':
      return <ol key={key} className="list-decimal list-inside space-y-2 my-4">{children}</ol>
    case 'list_item':
      return (
        <div key={key} className="flex items-start gap-3">
          <div className="mt-1 bg-[#F3EBE2] p-0.5 rounded-full shrink-0">
            <Check className="w-3.5 h-3.5 text-[#ED6E2D]" />
          </div>
          <span className="leading-relaxed text-gray-700">{children}</span>
        </div>
      )
    case 'table':
      return (
        <div key={key} className="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-sm text-left border-collapse">
            <tbody className="divide-y divide-gray-100">{children}</tbody>
          </table>
        </div>
      )
    case 'tableRow':
      return <tr key={key} className="hover:bg-gray-50 transition-colors">{children}</tr>
    case 'tableCell': {
      const cellProps: React.TdHTMLAttributes<HTMLTableCellElement> = {}
      if (node.attrs?.rowspan) cellProps.rowSpan = node.attrs.rowspan as number
      if (node.attrs?.colspan) cellProps.colSpan = node.attrs.colspan as number
      return <td key={key} className="px-6 py-3 border-r border-gray-100 last:border-0 text-gray-600" {...cellProps}>{children}</td>
    }
    case 'tableHeader': {
      const headerProps: React.ThHTMLAttributes<HTMLTableCellElement> = {}
      if (node.attrs?.rowspan) headerProps.rowSpan = node.attrs.rowspan as number
      if (node.attrs?.colspan) headerProps.colSpan = node.attrs.colspan as number
      return <th key={key} className="px-6 py-3 font-bold border-r border-gray-200 last:border-0 uppercase text-xs tracking-wider bg-gray-50" {...headerProps}>{children}</th>
    }
    case 'hard_break':
      return <br key={key} />
    default:
      return <React.Fragment key={key}>{children}</React.Fragment>
  }
}

const renderSafe = (content: unknown) => {
  if (!content) return null
  if (typeof content === 'string') return content
  if (typeof content === 'object' && content !== null) {
    const obj = content as { type?: string }
    if (obj.type === 'doc') {
      try {
        return renderRichTextContent(obj as RichTextNode)
      } catch {
        return null
      }
    }
  }
  return null
}

const hasData = (content: unknown): boolean => {
  if (!content) return false
  if (typeof content === 'string') return content.trim().length > 0
  if (typeof content === 'object' && content !== null) {
    const obj = content as { content?: unknown[] }
    if (obj.content && Array.isArray(obj.content) && obj.content.length > 0) return true
  }
  return false
}

const hasTableData = (table: TableData | undefined): boolean => {
  if (!table?.tbody || !Array.isArray(table.tbody) || table.tbody.length === 0) return false
  return table.tbody.some((row: TableRow) => row.body.some((cell) => cell.value && cell.value.trim() !== ""))
}

// Marka tespiti
const getMarka = (name: string): string => {
  if (name.startsWith("More Than")) return "More Than"
  if (name.startsWith("Smart Caps")) return "Smart Caps"
  if (name.startsWith("Raw Material")) return "Raw Material"
  return "Farma Works"
}

const getMarkaLink = (name: string): string => {
  if (name.startsWith("More Than")) return "/markalar/more-than"
  if (name.startsWith("Smart Caps")) return "/markalar/smart-caps"
  if (name.startsWith("Raw Material")) return "/markalar/raw-material"
  return "/urunler"
}

// --- ANA BİLEŞEN ---
export function UrunDetayContent({ product, productName }: { product: Product; productName: string }) {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const currentImage = useMemo(() => {
    if (activeImage) return activeImage
    return product.image?.filename || "/images/hero.png"
  }, [product, activeImage])

  const galleryList = useMemo(() => {
    const imagesList: string[] = []
    const mainImg = product.image?.filename || "/images/hero.png"
    if (mainImg) imagesList.push(mainImg)

    const multiImages = product.gallery || product.images || []
    if (Array.isArray(multiImages)) {
      multiImages.forEach((img: string | GalleryImage) => {
        if (typeof img === 'string') imagesList.push(img)
        else if (img?.filename) imagesList.push(img.filename)
      })
    }
    return Array.from(new Set(imagesList))
  }, [product])

  const marka = getMarka(product.name)
  const markaLink = getMarkaLink(product.name)

  return (
    <div className="min-h-screen bg-[#F3EBE2]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/urunler" className="text-gray-500 hover:text-[#1E40D8]">Ürünler</Link>
            <span className="text-gray-300">/</span>
            <Link href={markaLink} className="text-gray-500 hover:text-[#1E40D8]">{marka}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#1E40D8] font-medium truncate max-w-[200px]">{productName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Geri Butonu */}
        <Link 
          href={markaLink}
          className="inline-flex items-center gap-2 text-[#1E40D8] hover:text-[#ED6E2D] font-medium mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {marka} Ürünlerine Dön
        </Link>

        {/* Ana İçerik */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-10">
            {/* Başlık */}
            <div className="flex items-start justify-between mb-8 border-b border-gray-100 pb-6">
              <div>
                <span className="text-[#ED6E2D] text-sm font-bold uppercase tracking-wide">{marka}</span>
                <h1 className="text-3xl font-bold text-[#1E40D8] mt-2">{product.name}</h1>
                {product.category && (
                  <span className="inline-block mt-3 bg-[#F3EBE2] text-gray-600 text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
            </div>

            {/* Görsel ve Açıklama */}
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Sol: Görseller */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-[#F3EBE2] rounded-2xl h-[400px] border border-gray-200 overflow-hidden relative shadow-inner">
                  <Image 
                    src={currentImage} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                
                {galleryList.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {galleryList.map((imgUrl, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveImage(imgUrl)} 
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition-all ${
                          currentImage === imgUrl 
                            ? "border-[#ED6E2D] ring-2 ring-[#ED6E2D]/20" 
                            : "border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        <Image src={imgUrl} alt={`Galeri ${i}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sağ: Bilgiler */}
              <div className="lg:col-span-7 space-y-8">
                {/* Açıklama */}
                <div>
                  <h3 className="font-bold text-[#1E40D8] mb-3 text-xl">Ürün Açıklaması</h3>
                  <div className="text-gray-700 text-base leading-loose prose prose-slate max-w-none">
                    {renderSafe(product.description)}
                  </div>
                </div>

                {/* Özellikler */}
                {hasData(product.features) && (
                  <div>
                    <h3 className="font-bold text-[#1E40D8] mb-3">Özellikler</h3>
                    <div className="text-sm text-gray-600">{renderSafe(product.features)}</div>
                  </div>
                )}

                {/* Net Miktar */}
                {hasData(product.net_quantity) && (
                  <div className="inline-flex items-center gap-2 bg-[#F3EBE2] text-[#ED6E2D] px-5 py-2.5 rounded-lg font-bold border border-orange-100 shadow-sm">
                    <Tag className="w-5 h-5" /> 
                    Net Miktar: {product.net_quantity}
                  </div>
                )}
              </div>
            </div>

            {/* Alt Bilgiler */}
            <div className="mt-12 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* İçerik */}
                {hasData(product.ingredients) && (
                  <div className="bg-[#F3EBE2] p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-[#1E40D8] mb-3 text-lg">
                      <Info className="w-6 h-6 text-[#ED6E2D]" /> İçerik
                    </div>
                    <div className="text-gray-700 leading-relaxed text-sm">
                      {renderSafe(product.ingredients)}
                    </div>
                  </div>
                )}

                {/* Kullanım */}
                {hasData(product.usage) && (
                  <div className="bg-[#F3EBE2] p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-[#1E40D8] mb-3 text-lg">
                      <AlertCircle className="w-6 h-6 text-[#ED6E2D]" /> Kullanım Şekli
                    </div>
                    <div className="text-gray-700 leading-relaxed text-sm">
                      {renderSafe(product.usage)}
                    </div>
                  </div>
                )}
              </div>

              {/* Etken Maddeler Tablosu */}
              {hasTableData(product.active_ingredients as TableData) && product.active_ingredients && (
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#1E40D8] text-white">
                      <tr>
                        {(product.active_ingredients as TableData).thead?.map((h, k) => (
                          <th key={k} className="px-6 py-3 font-bold">{h.value}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(product.active_ingredients as TableData).tbody?.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          {row.body.map((cell, j) => (
                            <td key={j} className={`px-6 py-4 ${j === 1 ? 'font-bold text-right' : ''}`}>
                              {cell.value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Uyarılar */}
              {hasData(product.warnings) && (
                <div className="bg-[#fffbeb] border border-[#fcd34d] p-6 rounded-xl text-[#92400e] flex gap-4 shadow-sm">
                  <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1 text-lg">Uyarılar</span>
                    <div className="leading-relaxed opacity-90">{renderSafe(product.warnings)}</div>
                  </div>
                </div>
              )}

              {/* Saklama Koşulları */}
              {hasData(product.storage) && (
                <div className="bg-[#1E40D8]/5 border border-[#1E40D8]/20 p-6 rounded-xl flex items-center gap-5 shadow-sm">
                  <div className="bg-white p-3 rounded-full shadow-md text-[#1E40D8]">
                    <Thermometer className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1E40D8] text-lg mb-1">Saklama Koşulları</div>
                    <div className="text-gray-700 leading-relaxed">{renderSafe(product.storage)}</div>
                  </div>
                </div>
              )}

              {/* Fiyat */}
              {hasData(product.price) && (
                <div className="bg-[#ED6E2D]/10 border border-[#ED6E2D]/30 p-6 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-md text-[#ED6E2D]">
                      <Tag className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-[#1E40D8] text-lg">Satış Fiyatı</div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#ED6E2D]">{product.price}</div>
                </div>
              )}
            </div>

            {/* İletişim CTA */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 mb-4">Bu ürün hakkında daha fazla bilgi almak için</p>
              <Link 
                href="/iletisim" 
                className="inline-block bg-[#ED6E2D] hover:bg-[#d55f24] text-white font-bold py-3 px-8 rounded-full transition"
              >
                Bizimle İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}