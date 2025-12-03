"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Tag, Target, Sparkles, Leaf, Shield, Zap, Heart } from "lucide-react"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"
import { Product, StoryblokStory } from "@/types/storyblok"

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
  
  const hasRealData = table.tbody.some((row: TableRow) => 
    row.body.some((cell) => cell.value && cell.value.trim() !== "")
  )
  return hasRealData
}

// --- ANA BİLEŞEN ---
export function OzelTakviyeContent({ products }: { products: StoryblokStory<Product>[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [manualActiveImage, setManualActiveImage] = useState<string | null>(null)

  // ✅ DÜZELTME: activeImage artık useMemo ile hesaplanıyor
  const activeImage = useMemo(() => {
    if (!selectedProduct) return ""
    if (manualActiveImage !== null) return manualActiveImage
    return selectedProduct.image?.filename || "/images/hero.png"
  }, [selectedProduct, manualActiveImage])

  // Galeri listesini useMemo ile hesapla
  const galleryList = useMemo(() => {
    if (!selectedProduct) return []

    const imagesList: string[] = []
    const mainImg = selectedProduct.image?.filename || "/images/hero.png"
    
    if (mainImg) imagesList.push(mainImg)

    const multiImages = selectedProduct.gallery || selectedProduct.images || []
    
    if (Array.isArray(multiImages)) {
      multiImages.forEach((img: string | GalleryImage) => {
        if (typeof img === 'string') {
          imagesList.push(img)
        } else if (img?.filename) {
          imagesList.push(img.filename)
        }
      })
    }

    return Array.from(new Set(imagesList))
  }, [selectedProduct])

  // ✅ DÜZELTME: useEffect artık sadece scroll kontrolü yapıyor
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setManualActiveImage(null)
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ÜST BAŞLIK */}
      <div className="bg-purple-50 py-20 text-center border-b border-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Özel Takviyeler</h1>
          <p className="text-lg text-purple-800/80 max-w-3xl mx-auto">
            Sporcular, hamileler ve özel ihtiyaçlar için formüle edilmiş takviye ürünleri.
          </p>
        </div>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        {(!products || products.length === 0) ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">Henüz ürün bulunamadı.</h2>
            <p className="text-gray-500 mt-2">
              Storyblok panelinden &apos;Özel Takviyeler&apos; kategorisine içerik ekleyiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {products.map((item) => {
              const product = item.content
              const imageUrl = product.image?.filename || "/images/hero.png"

              return (
                <div 
                  key={item.uuid} 
                  onClick={() => setSelectedProduct(product)} 
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
                >
                  <div className="relative h-80 bg-gray-100 overflow-hidden">
                    <span className="absolute top-4 left-4 bg-white/90 text-purple-600 text-[10px] font-bold px-2 py-1 rounded border border-purple-100 uppercase tracking-wide z-10">
                      {product.category || "Özel Takviye"}
                    </span>
                    <Image 
                      src={imageUrl}
                      alt={product.name || "Ürün görseli"} 
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-gray-900 font-bold text-lg mb-4 leading-snug">
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <span className="text-purple-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                        İncele <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* --- ÖZEL TAKVİYELERİN FAYDALARI BÖLÜMÜ --- */}
      <div className="bg-purple-50 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Özel Takviyeler Kimlere Uygundur?</h2>
            <p className="text-lg text-purple-800/70 max-w-2xl mx-auto">
              Farklı yaşam dönemleri ve ihtiyaçlar için özel olarak formüle edilmiş takviyeler.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sporcular</h3>
              <p className="text-gray-600 leading-relaxed">
                Performans artırıcı ve kas gelişimini destekleyen özel formüller.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6 text-pink-600">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hamileler</h3>
              <p className="text-gray-600 leading-relaxed">
                Anne ve bebek sağlığı için folik asit ve demir içeren takviyeler.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Yaşlılar</h3>
              <p className="text-gray-600 leading-relaxed">
                Kemik ve eklem sağlığını destekleyen özel formülasyonlar.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Veganlar</h3>
              <p className="text-gray-600 leading-relaxed">
                Bitkisel kaynaklı B12, demir ve omega-3 takviyeleri.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bağışıklık Desteği</h3>
              <p className="text-gray-600 leading-relaxed">
                Mevsim geçişlerinde bağışıklık sistemini güçlendiren formüller.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enerji İhtiyacı</h3>
              <p className="text-gray-600 leading-relaxed">
                Yoğun tempoda çalışanlar için enerji ve konsantrasyon desteği.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* POP-UP MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10">
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">
                {selectedProduct.name}
              </h2>
              
              <div className="grid lg:grid-cols-12 gap-10">
                
                {/* SOL TARAF: RESİM VE GALERİ */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-gray-100 rounded-2xl h-[400px] border border-gray-200 overflow-hidden relative shadow-inner flex items-center justify-center">
                    {activeImage && (
                      <Image 
                        src={activeImage} 
                        alt={selectedProduct.name || "Ürün Detay"} 
                        fill
                        className="object-cover" 
                      />
                    )}
                  </div>

                  {galleryList.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {galleryList.map((imgUrl, i) => (
                        <button 
                          key={i}
                          onClick={() => setManualActiveImage(imgUrl)}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition-all ${
                            activeImage === imgUrl 
                              ? "border-purple-500 ring-2 ring-purple-500/20" 
                              : "border-gray-100 hover:border-gray-300"
                          }`}
                        >
                          <Image 
                            src={imgUrl}
                            alt={`Galeri ${i}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SAĞ TARAF: DETAYLAR */}
                <div className="lg:col-span-7 space-y-8">
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-xl">Ürün Açıklaması</h3>
                    <div className="text-gray-700 text-base leading-loose prose prose-slate max-w-none">
                      {renderSafe(selectedProduct.description)}
                    </div>
                  </div>

                  {hasData(selectedProduct.features) && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Özellikler:</h3>
                      <div className="text-sm text-gray-600">
                        {renderSafe(selectedProduct.features)}
                      </div>
                    </div>
                  )}

                  {hasData(selectedProduct.net_quantity) && (
                    <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-5 py-2.5 rounded-lg font-bold border border-purple-100 shadow-sm">
                      <Tag className="w-5 h-5" /> 
                      Net Miktar: {selectedProduct.net_quantity}
                    </div>
                  )}
                </div>
              </div>

              {/* ALT KUTULAR */}
              <div className="mt-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {hasData(selectedProduct.ingredients) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg">
                        <Info className="w-6 h-6 text-purple-500" /> İçerik
                      </div>
                      <div className="text-gray-700 leading-relaxed text-sm">
                        {renderSafe(selectedProduct.ingredients)}
                      </div>
                    </div>
                  )}

                  {hasData(selectedProduct.usage) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg">
                        <AlertCircle className="w-6 h-6 text-purple-500" /> Kullanım Şekli
                      </div>
                      <div className="text-gray-700 leading-relaxed text-sm">
                        {renderSafe(selectedProduct.usage)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tablo */}
                {hasTableData(selectedProduct.active_ingredients as TableData) && selectedProduct.active_ingredients && (
                  <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          {(selectedProduct.active_ingredients as TableData).thead?.map((h, k) => 
                            <th key={k} className="px-6 py-3 font-bold text-gray-800">{h.value}</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(selectedProduct.active_ingredients as TableData).tbody?.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            {row.body.map((cell, j) => (
                              <td key={j} className={`px-6 py-4 ${j === 1 ? 'font-bold text-right' : ''}`}>{cell.value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Uyarılar */}
                {hasData(selectedProduct.warnings) && (
                  <div className="bg-[#fffbeb] border border-[#fcd34d] p-6 rounded-xl text-[#92400e] flex gap-4 shadow-sm">
                    <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-1 text-lg">Uyarılar:</span>
                      <div className="leading-relaxed opacity-90">
                        {renderSafe(selectedProduct.warnings)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Saklama Koşulları */}
                {hasData(selectedProduct.storage) && (
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] p-6 rounded-xl flex items-center gap-5 shadow-sm">
                    <div className="bg-white p-3 rounded-full shadow-md text-blue-600">
                      <Thermometer className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-blue-900 text-lg mb-1">Saklama Koşulları:</div>
                      <div className="text-blue-800 leading-relaxed">
                        {renderSafe(selectedProduct.storage)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Fiyat Kutusu */}
                {hasData(selectedProduct.price) && (
                  <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-full shadow-md text-purple-500">
                        <Tag className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-purple-900 text-lg">Satış Fiyatı:</div>
                    </div>
                    <div className="text-2xl font-extrabold text-purple-600">{selectedProduct.price}</div>
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