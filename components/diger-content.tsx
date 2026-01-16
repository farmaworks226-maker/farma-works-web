"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Tag, Package, Beaker, FlaskConical, Pill, Stethoscope, Gem } from "lucide-react"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"
import { Product, StoryblokStory } from "@/types/storyblok"

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

// --- YARDIMCI FONKSİYONLAR ---
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
    'td': (children: React.ReactNode, node: { attrs?: { colspan?: number; rowspan?: number } }) => { const props: React.TdHTMLAttributes<HTMLTableCellElement> = { className: "px-6 py-3 border-r border-gray-100 last:border-0 text-gray-600" }; if (node?.attrs?.colspan) props.colSpan = node.attrs.colspan; if (node?.attrs?.rowspan) props.rowSpan = node.attrs.rowspan; return <td {...props}>{children}</td> },
    'th': (children: React.ReactNode, node: { attrs?: { colspan?: number; rowspan?: number } }) => { const props: React.ThHTMLAttributes<HTMLTableCellElement> = { className: "px-6 py-3 font-bold bg-gray-50 border-r border-gray-200 last:border-0 text-gray-800 uppercase text-xs tracking-wider" }; if (node?.attrs?.colspan) props.colSpan = node.attrs.colspan; if (node?.attrs?.rowspan) props.rowSpan = node.attrs.rowspan; return <th {...props}>{children}</th> },
    'bullet_list': (children: React.ReactNode) => <div className="space-y-3 my-4">{children}</div>,
    'list_item': (children: React.ReactNode) => (
      <div className="flex items-start gap-3">
        <div className="mt-1 bg-violet-100 p-0.5 rounded-full shrink-0">
          <Check className="w-3.5 h-3.5 text-violet-600" />
        </div>
        <span className="leading-relaxed text-gray-700">{children}</span>
      </div>
    )
  }
}

const renderSafe = (content: unknown) => {
  if (!content) return null
  if (typeof content === 'string') return content
  if (typeof content === 'object' && content !== null) {
    const obj = content as { type?: string }
    if (obj.type === 'doc') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return renderRichText(content as any, richTextOptions)
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

// --- ANA BİLEŞEN ---
export function DigerContent({ products }: { products: StoryblokStory<Product>[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [manualActiveImage, setManualActiveImage] = useState<string | null>(null)

  const handleCloseModal = () => {
    setManualActiveImage(null)
    setSelectedProduct(null)
  }

  const activeImage = useMemo(() => {
    if (!selectedProduct) return ""
    if (manualActiveImage !== null) return manualActiveImage
    return selectedProduct.image?.filename || "/images/hero.png"
  }, [selectedProduct, manualActiveImage])

  const galleryList = useMemo(() => {
    if (!selectedProduct) return []
    const imagesList: string[] = []
    const mainImg = selectedProduct.image?.filename || "/images/hero.png"
    if (mainImg) imagesList.push(mainImg)

    const multiImages = selectedProduct.gallery || selectedProduct.images || []
    if (Array.isArray(multiImages)) {
      multiImages.forEach((img: string | GalleryImage) => {
        if (typeof img === 'string') imagesList.push(img)
        else if (img?.filename) imagesList.push(img.filename)
      })
    }
    return Array.from(new Set(imagesList))
  }, [selectedProduct])

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION - Mor/Slate Tema */}
      <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-slate-50 py-20 text-center border-b border-violet-100">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            Özel Formüller
          </div>
          <h1 className="text-4xl font-bold text-violet-900 mb-4">Diğer Ürünler</h1>
          <p className="text-lg text-violet-800/80 max-w-3xl mx-auto">Farklı sağlık ihtiyaçlarınıza yönelik özel olarak formüle edilmiş takviye ürünleri.</p>
        </div>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {(!products || products.length === 0) ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">Henüz ürün bulunamadı.</h2>
            <p className="text-gray-500 mt-2">Storyblok panelinden &apos;Diğer&apos; kategorisine içerik ekleyiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {products.map((item) => {
              const product = item.content
              const imageUrl = product.image?.filename || "/images/hero.png"
              return (
                <div key={item.uuid} onClick={() => setSelectedProduct(product)} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full">
                  <div className="relative h-80 bg-gradient-to-br from-violet-50 to-purple-50 overflow-hidden">
                    <span className="absolute top-4 left-4 bg-white/90 text-violet-600 text-[10px] font-bold px-2 py-1 rounded border border-violet-100 uppercase tracking-wide z-10">{product.category || "Diğer"}</span>
                    <Image src={imageUrl} alt={product.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-gray-900 font-bold text-lg mb-4 leading-snug">{product.name}</h3>
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <span className="text-violet-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">İncele <ArrowRight className="w-4 h-4 ml-1" /></span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* DİĞER ÜRÜN KATEGORİLERİ */}
      <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-slate-50 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-violet-900 mb-4">Özel İhtiyaçlara Özel Çözümler</h2>
            <p className="text-lg text-violet-800/70 max-w-2xl mx-auto">Ana kategorilere girmeyen, ancak sağlığınız için önemli olan farklı ürün grupları.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-violet-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center mb-6 text-violet-600"><Beaker className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Özel Formülasyonlar</h3>
              <p className="text-gray-600 leading-relaxed">Belirli sağlık hedeflerine yönelik olarak geliştirilmiş kombinasyon ürünler.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-violet-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600"><FlaskConical className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Amino Asitler</h3>
              <p className="text-gray-600 leading-relaxed">Kas gelişimi, enerji üretimi ve metabolizma için gerekli amino asit takviyeleri.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-violet-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600"><Pill className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enzimler</h3>
              <p className="text-gray-600 leading-relaxed">Sindirim ve besin emilimini destekleyen özel enzim formülleri.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-violet-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6 text-pink-600"><Stethoscope className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sağlık Destek</h3>
              <p className="text-gray-600 leading-relaxed">Genel sağlık ve wellness için kapsamlı destek ürünleri.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-violet-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-600"><Package className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paket Çözümler</h3>
              <p className="text-gray-600 leading-relaxed">Farklı ihtiyaçlara göre hazırlanmış kombine ürün paketleri.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-violet-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600"><Gem className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Ürünler</h3>
              <p className="text-gray-600 leading-relaxed">En yüksek kalite standartlarında üretilmiş özel takviyeler.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"><X className="w-6 h-6" /></button>
            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">{selectedProduct.name}</h2>
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl h-[400px] border border-violet-200 overflow-hidden relative shadow-inner flex items-center justify-center">
                    {activeImage && <Image src={activeImage} alt={selectedProduct.name} fill className="object-cover" />}
                  </div>
                  {galleryList.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {galleryList.map((imgUrl, i) => (
                        <button key={i} onClick={() => setManualActiveImage(imgUrl)} className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition-all ${activeImage === imgUrl ? "border-violet-600 ring-2 ring-violet-600/20" : "border-gray-100 hover:border-gray-300"}`}>
                          <Image src={imgUrl} alt={`Galeri ${i}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-xl">Ürün Açıklaması</h3>
                    <div className="text-gray-700 text-base leading-loose prose prose-slate max-w-none">{renderSafe(selectedProduct.description)}</div>
                  </div>
                  {hasData(selectedProduct.features) && (
                    <div><h3 className="font-bold text-gray-900 mb-3">Özellikler:</h3><div className="text-sm text-gray-600">{renderSafe(selectedProduct.features)}</div></div>
                  )}
                  {hasData(selectedProduct.net_quantity) && (
                    <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 px-5 py-2.5 rounded-lg font-bold border border-violet-100 shadow-sm"><Tag className="w-5 h-5" /> Net Miktar: {selectedProduct.net_quantity}</div>
                  )}
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {hasData(selectedProduct.ingredients) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><Info className="w-6 h-6 text-violet-600" /> İçerik</div>
                      <div className="text-gray-700 leading-relaxed text-sm">{renderSafe(selectedProduct.ingredients)}</div>
                    </div>
                  )}
                  {hasData(selectedProduct.usage) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><AlertCircle className="w-6 h-6 text-violet-600" /> Kullanım Şekli</div>
                      <div className="text-gray-700 leading-relaxed text-sm">{renderSafe(selectedProduct.usage)}</div>
                    </div>
                  )}
                </div>
                {hasTableData(selectedProduct.active_ingredients as TableData) && selectedProduct.active_ingredients && (
                  <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-violet-50 border-b border-violet-200">
                        <tr>{(selectedProduct.active_ingredients as TableData).thead?.map((h, k) => <th key={k} className="px-6 py-3 font-bold text-violet-900">{h.value}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(selectedProduct.active_ingredients as TableData).tbody?.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50">{row.body.map((cell, j) => <td key={j} className={`px-6 py-4 ${j === 1 ? 'font-bold text-right' : ''}`}>{cell.value}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {hasData(selectedProduct.warnings) && (
                  <div className="bg-[#fffbeb] border border-[#fcd34d] p-6 rounded-xl text-[#92400e] flex gap-4 shadow-sm">
                    <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <div><span className="font-bold block mb-1 text-lg">Uyarılar:</span><div className="leading-relaxed opacity-90">{renderSafe(selectedProduct.warnings)}</div></div>
                  </div>
                )}
                {hasData(selectedProduct.storage) && (
                  <div className="bg-violet-50 border border-violet-200 p-6 rounded-xl flex items-center gap-5 shadow-sm">
                    <div className="bg-white p-3 rounded-full shadow-md text-violet-600"><Thermometer className="w-6 h-6" /></div>
                    <div><div className="font-bold text-violet-900 text-lg mb-1">Saklama Koşulları:</div><div className="text-violet-800 leading-relaxed">{renderSafe(selectedProduct.storage)}</div></div>
                  </div>
                )}
                {hasData(selectedProduct.price) && (
                  <div className="bg-violet-50 border border-violet-200 p-6 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4"><div className="bg-white p-3 rounded-full shadow-md text-violet-600"><Tag className="w-6 h-6" /></div><div className="font-bold text-violet-900 text-lg">Satış Fiyatı:</div></div>
                    <div className="text-2xl font-extrabold text-violet-600">{selectedProduct.price}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}