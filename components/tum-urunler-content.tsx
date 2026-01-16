"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Tag } from "lucide-react"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"

// KATEGORİ LİSTESİ (Filtreleme için) - YENİ KATEGORİLER EKLENDİ
const CATEGORIES = [
  "Tümü", 
  "Vitaminler", 
  "Mineraller", 
  "Multivitaminler", 
  "Probiyotikler", 
  "Balık Yağları", 
  "Bitkisel Ekstreler", 
  "Özel Takviyeler", 
  "Kişisel Bakım",
  "Diğer"
]

// --- TİP TANIMLAMALARI ---
/* eslint-disable @typescript-eslint/no-explicit-any */
type ProductContent = {
  category?: string;
  image?: { filename?: string };
  name?: string;
  short_desc?: any;
  description?: any;
  features?: any;
  net_quantity?: string;
  ingredients?: any;
  usage?: any;
  active_ingredients?: {
    thead?: { value: string }[];
    tbody?: { body: { value: string }[] }[];
  };
  warnings?: any;
  storage?: any;
  price?: string;
  gallery?: (string | { filename: string })[];
  images?: (string | { filename: string })[];
};

type ProductItem = {
  uuid: string;
  content: ProductContent;
};

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
        <div className="mt-1 bg-green-100 p-0.5 rounded-full shrink-0">
          <Check className="w-3.5 h-3.5 text-[#00b074]" />
        </div>
        <span className="leading-relaxed text-gray-700">{children}</span>
      </div>
    )
  }
}

const renderSafe = (content: any) => {
  if (!content) return null;
  if (typeof content === 'string') return content;
  if (typeof content === 'object' && content.type === 'doc') {
    return renderRichText(content, richTextOptions);
  }
  return null;
}

const hasData = (content: any) => {
  if (!content) return false;
  if (typeof content === 'string') return content.trim().length > 0;
  if (typeof content === 'object') {
    if (content.content && Array.isArray(content.content) && content.content.length > 0) return true;
  }
  return false;
}

const hasTableData = (table: any) => {
  if (!table) return false;
  if (!table.tbody) return false;
  if (!Array.isArray(table.tbody)) return false;
  if (table.tbody.length === 0) return false;
  return table.tbody.some((row: any) => row.body.some((cell: any) => cell.value && cell.value.trim() !== ""));
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Mineraller": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Vitaminler": return "bg-orange-100 text-orange-700 border-orange-200";
    case "Multivitaminler": return "bg-lime-100 text-lime-700 border-lime-200";
    case "Probiyotikler": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Özel Takviyeler": return "bg-purple-100 text-purple-700 border-purple-200";
    case "Kişisel Bakım": return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "Balık Yağları": return "bg-cyan-100 text-cyan-700 border-cyan-200";
    case "Bitkisel Ekstreler": return "bg-green-100 text-green-700 border-green-200";
    case "Diğer": return "bg-violet-100 text-violet-700 border-violet-200";
    default: return "bg-green-100 text-green-700 border-green-200";
  }
}

// --- ANA BİLEŞEN ---
export function TumUrunlerContent({ products }: { products: ProductItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedProduct, setSelectedProduct] = useState<ProductContent | null>(null)
  const [manualActiveImage, setManualActiveImage] = useState<string | null>(null)

  // ✅ Modal kapatma fonksiyonu - setState burada yapılıyor
  const handleCloseModal = () => {
    setManualActiveImage(null)
    setSelectedProduct(null)
  }

  // Kategoriye göre filtreleme
  const filteredProducts = selectedCategory === "Tümü"
    ? products
    : products.filter(item => {
        const productCategory = item.content.category || "";
        return productCategory.toLowerCase() === selectedCategory.toLowerCase();
      })

  // ✅ galleryList artık useMemo ile hesaplanıyor
  const galleryList = useMemo(() => {
    if (!selectedProduct) return []

    const imagesList: string[] = []
    const mainImg = selectedProduct.image?.filename || "/images/hero.png"
    
    if (mainImg) imagesList.push(mainImg)

    const multiImages = selectedProduct.gallery || selectedProduct.images || []
    
    if (Array.isArray(multiImages)) {
      multiImages.forEach((img: any) => {
        if (typeof img === 'string') {
          imagesList.push(img)
        } else if (img?.filename) {
          imagesList.push(img.filename)
        }
      })
    }

    return Array.from(new Set(imagesList))
  }, [selectedProduct])

  // ✅ activeImage artık useMemo ile hesaplanıyor
  const activeImage = useMemo(() => {
    if (!selectedProduct) return ""
    if (manualActiveImage !== null) return manualActiveImage
    return selectedProduct.image?.filename || "/images/hero.png"
  }, [selectedProduct, manualActiveImage])

  // ✅ useEffect sadece scroll kontrolü - HİÇBİR setState YOK
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- BAŞLIK VE FİLTRELER --- */}
      <div className="bg-white py-16 text-center border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Tüm Ürünlerimiz</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Sağlığınız için özenle geliştirdiğimiz tüm ürün çeşitlerini buradan inceleyebilir, kategorilere göre filtreleyebilirsiniz.
          </p>

          {/* Kategori Butonları */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#00b074] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- ÜRÜN LİSTESİ --- */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => {
              const product = item.content;
              const imageUrl = product.image?.filename || "/images/hero.png";
              const category = product.category || "Ürün";
              const categoryColors = getCategoryColor(category);

              return (
                <div 
                  key={item.uuid} 
                  onClick={() => setSelectedProduct(product)} 
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
                >
                  <div className="relative h-80 bg-gray-100 overflow-hidden">
                    {/* Kategori Etiketi (Renkli) */}
                    <span className={`absolute top-4 left-4 text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wide z-10 ${categoryColors}`}>
                      {category}
                    </span>
                    <Image 
                      src={imageUrl}
                      alt={product.name || "Ürün"} 
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-gray-900 font-bold text-lg mb-2 leading-snug min-h-[3rem]">
                      {product.name}
                    </h3>
                    
                    {/* Kısa açıklama (Varsa) */}
                    {hasData(product.short_desc) && (
                      <div className="text-xs text-gray-500 line-clamp-2 mb-4">
                        {renderSafe(product.short_desc)}
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <span className="text-[#00b074] text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                        İncele <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">Bu kategoride henüz ürün bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      {/* POP-UP MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* ✅ Kapatma butonu - handleCloseModal kullanıyor */}
            <button onClick={handleCloseModal} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10">
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">
                {selectedProduct.name}
              </h2>
              
              <div className="grid lg:grid-cols-12 gap-10">
                
                {/* SOL: RESİM */}
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
                              ? "border-[#00b074] ring-2 ring-[#00b074]/20" 
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

                {/* SAĞ: DETAYLAR */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Ürün Açıklaması</h3>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {renderSafe(selectedProduct.description)}
                    </div>
                  </div>

                  {hasData(selectedProduct.features) && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Özellikler:</h3>
                      <div className="text-sm text-gray-600">
                        {renderSafe(selectedProduct.features)}
                      </div>
                    </div>
                  )}

                  {hasData(selectedProduct.net_quantity) && (
                    <div className="inline-flex items-center gap-2 bg-green-50 text-[#00b074] px-4 py-2 rounded-lg font-semibold border border-green-100 text-sm">
                      <Tag className="w-4 h-4" /> Net Miktar: {selectedProduct.net_quantity}
                    </div>
                  )}
                </div>
              </div>

              {/* ALT KUTULAR */}
              <div className="mt-8 grid md:grid-cols-2 gap-4 text-sm">
                {hasData(selectedProduct.ingredients) && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                      <Info className="w-4 h-4 text-[#00b074]" /> İçerik
                    </div>
                    <div className="text-gray-600">
                      {renderSafe(selectedProduct.ingredients)}
                    </div>
                  </div>
                )}

                {hasData(selectedProduct.usage) && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                      <AlertCircle className="w-4 h-4 text-[#00b074]" /> Kullanım Şekli
                    </div>
                    <div className="text-gray-600">
                      {renderSafe(selectedProduct.usage)}
                    </div>
                  </div>
                )}
              </div>

              {/* Tablo */}
              {hasTableData(selectedProduct.active_ingredients) && selectedProduct.active_ingredients && (
                <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {selectedProduct.active_ingredients.thead?.map((h, k) => 
                          <th key={k} className="px-6 py-3 font-bold text-gray-800">{h.value}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedProduct.active_ingredients.tbody?.map((row, i) => (
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

              {/* Alt Bilgiler */}
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                {hasData(selectedProduct.warnings) && (
                  <div className="bg-[#fffbeb] border border-[#fcd34d] p-4 rounded-xl text-[#92400e]">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <AlertCircle className="w-4 h-4" /> Uyarılar:
                    </div>
                    <div>{renderSafe(selectedProduct.warnings)}</div>
                  </div>
                )}

                {hasData(selectedProduct.storage) && (
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] p-4 rounded-xl text-blue-900">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <Thermometer className="w-4 h-4" /> Saklama Koşulları:
                    </div>
                    <div>{renderSafe(selectedProduct.storage)}</div>
                  </div>
                )}

                {hasData(selectedProduct.price) && (
                  <div className="bg-[#f0fdf4] border border-[#86efac] p-4 rounded-xl flex items-center justify-between col-span-full md:col-span-1">
                    <div className="flex items-center gap-2 font-bold text-green-900">
                      <Tag className="w-4 h-4" /> Satış Fiyatı:
                    </div>
                    <div className="text-xl font-extrabold text-[#00b074]">{selectedProduct.price}</div>
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