"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Tag, Sun, Zap, ShieldCheck, Activity, Heart, Brain } from "lucide-react"
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
    'td': (children: React.ReactNode) => <td className="px-6 py-3 border-r border-gray-100 last:border-0 text-gray-600">{children}</td>,
    'th': (children: React.ReactNode) => <th className="px-6 py-3 font-bold bg-gray-50 border-r border-gray-200 last:border-0 text-gray-800 uppercase text-xs tracking-wider">{children}</th>,
    'bullet_list': (children: React.ReactNode) => <div className="space-y-3 my-4">{children}</div>,
    'list_item': (children: React.ReactNode) => (
      <div className="flex items-start gap-3">
        <div className="mt-1 bg-green-100 p-0.5 rounded-full shrink-0">
          <Check className="w-3.5 h-3.5 text-[#00b074]" />
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
export function VitaminlerContent({ products }: { products: StoryblokStory<Product>[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [manualActiveImage, setManualActiveImage] = useState<string | null>(null)

  // ✅ Modal kapatma fonksiyonu
  const handleCloseModal = () => {
    setManualActiveImage(null)
    setSelectedProduct(null)
  }

  // ✅ useMemo ile activeImage
  const activeImage = useMemo(() => {
    if (!selectedProduct) return ""
    if (manualActiveImage !== null) return manualActiveImage
    return selectedProduct.image?.filename || "/images/hero.png"
  }, [selectedProduct, manualActiveImage])

  // ✅ useMemo ile galleryList
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

  // ✅ useEffect sadece scroll - HİÇBİR setState YOK
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
      <div className="bg-orange-50 py-20 text-center border-b border-orange-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">Vitaminler</h1>
          <p className="text-lg text-orange-800/80 max-w-3xl mx-auto">Bağışıklığınızı ve enerjinizi destekleyen C, D, B12 ve diğer temel vitamin takviyeleri.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {(!products || products.length === 0) ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">Henüz ürün bulunamadı.</h2>
            <p className="text-gray-500 mt-2">Storyblok panelinden &apos;Vitaminler&apos; kategorisine içerik ekleyiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {products.map((item) => {
              const product = item.content
              const imageUrl = product.image?.filename || "/images/hero.png"
              return (
                <div key={item.uuid} onClick={() => setSelectedProduct(product)} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full">
                  <div className="relative h-80 bg-gray-100 overflow-hidden">
                    <span className="absolute top-4 left-4 bg-white/90 text-[#00b074] text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-wide z-10">{product.category || "Vitaminler"}</span>
                    <Image src={imageUrl} alt={product.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-gray-900 font-bold text-lg mb-4 leading-snug">{product.name}</h3>
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <span className="text-[#00b074] text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">İncele <ArrowRight className="w-4 h-4 ml-1" /></span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* VİTAMİN FAYDALARI */}
      <div className="bg-orange-50 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-4">Vitaminler Neden Önemlidir?</h2>
            <p className="text-lg text-orange-800/70 max-w-2xl mx-auto">Vücudumuzun sağlıklı işleyişi için elzem olan vitaminler, bağışıklık sisteminden enerji üretimine kadar birçok fonksiyonda anahtar rol oynar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600"><ShieldCheck className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bağışıklık Sistemi</h3>
              <p className="text-gray-600 leading-relaxed">C vitamini ve D vitamini gibi antioksidanlar, bağışıklık sistemini güçlendirerek hastalıklara karşı koruma sağlar.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-600"><Zap className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enerji Üretimi</h3>
              <p className="text-gray-600 leading-relaxed">B grubu vitaminleri, yediğimiz besinlerin enerjiye dönüşmesinde hayati rol oynar.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600"><Activity className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hücre Yenilenmesi</h3>
              <p className="text-gray-600 leading-relaxed">E vitamini ve A vitamini, hücrelerin yenilenmesine ve cildin sağlıklı kalmasına yardımcı olur.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600"><Heart className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kalp ve Göz Sağlığı</h3>
              <p className="text-gray-600 leading-relaxed">Belli başlı vitaminler kalp damar sağlığını korurken, A vitamini görme yetisinin korunmasına katkıda bulunur.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600"><Brain className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Beyin Fonksiyonları</h3>
              <p className="text-gray-600 leading-relaxed">B12 vitamini ve folik asit, beyin fonksiyonlarının korunması için kritik öneme sahiptir.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600"><Sun className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kemik Gelişimi</h3>
              <p className="text-gray-600 leading-relaxed">D vitamini, kalsiyum emilimini artırarak kemiklerin ve dişlerin güçlü kalmasını sağlar.</p>
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
                  <div className="bg-gray-100 rounded-2xl h-[400px] border border-gray-200 overflow-hidden relative shadow-inner flex items-center justify-center">
                    {activeImage && <Image src={activeImage} alt={selectedProduct.name} fill className="object-cover" />}
                  </div>
                  {galleryList.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {galleryList.map((imgUrl, i) => (
                        <button key={i} onClick={() => setManualActiveImage(imgUrl)} className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition-all ${activeImage === imgUrl ? "border-[#00b074] ring-2 ring-[#00b074]/20" : "border-gray-100 hover:border-gray-300"}`}>
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
                    <div className="inline-flex items-center gap-2 bg-green-50 text-[#00b074] px-5 py-2.5 rounded-lg font-bold border border-green-100 shadow-sm"><Tag className="w-5 h-5" /> Net Miktar: {selectedProduct.net_quantity}</div>
                  )}
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {hasData(selectedProduct.ingredients) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><Info className="w-6 h-6 text-[#00b074]" /> İçerik</div>
                      <div className="text-gray-700 leading-relaxed text-sm">{renderSafe(selectedProduct.ingredients)}</div>
                    </div>
                  )}
                  {hasData(selectedProduct.usage) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><AlertCircle className="w-6 h-6 text-[#00b074]" /> Kullanım Şekli</div>
                      <div className="text-gray-700 leading-relaxed text-sm">{renderSafe(selectedProduct.usage)}</div>
                    </div>
                  )}
                </div>
                {hasTableData(selectedProduct.active_ingredients as TableData) && selectedProduct.active_ingredients && (
                  <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>{(selectedProduct.active_ingredients as TableData).thead?.map((h, k) => <th key={k} className="px-6 py-3 font-bold text-gray-800">{h.value}</th>)}</tr>
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
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] p-6 rounded-xl flex items-center gap-5 shadow-sm">
                    <div className="bg-white p-3 rounded-full shadow-md text-blue-600"><Thermometer className="w-6 h-6" /></div>
                    <div><div className="font-bold text-blue-900 text-lg mb-1">Saklama Koşulları:</div><div className="text-blue-800 leading-relaxed">{renderSafe(selectedProduct.storage)}</div></div>
                  </div>
                )}
                {hasData(selectedProduct.price) && (
                  <div className="bg-[#f0fdf4] border border-[#86efac] p-6 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4"><div className="bg-white p-3 rounded-full shadow-md text-[#00b074]"><Tag className="w-6 h-6" /></div><div className="font-bold text-green-900 text-lg">Satış Fiyatı:</div></div>
                    <div className="text-2xl font-extrabold text-[#00b074]">{selectedProduct.price}</div>
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