"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Tag } from "lucide-react"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"

export function MinerallerContent({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [activeImage, setActiveImage] = useState<string>("")
  const [galleryList, setGalleryList] = useState<string[]>([])

  // Modal açıldığında çalışacak mantık
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'

      // 1. Ana Resmi Belirle
      const mainImg = selectedProduct.image?.filename || "/images/hero.png"
      setActiveImage(mainImg)

      // 2. Galeri Listesini Hazırla
      const imagesList: string[] = []
      
      // Ana resmi ekle
      if (mainImg) imagesList.push(mainImg)

      // Storyblok 'gallery' veya 'images' alanından gelenleri ekle
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

      // Tekrarlayanları temizle
      setGalleryList(Array.from(new Set(imagesList)))

    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-400">Henüz ürün bulunamadı.</h2>
          <p className="text-gray-500 mt-2">Storyblok panelinden 'Mineraller' kategorisine içerik ekleyiniz.</p>
        </div>
      </div>
    )
  }

  // --- YARDIMCI FONKSİYONLAR ---

  // Metin Dolu mu?
  const hasData = (content: any) => {
    if (!content) return false;
    if (typeof content === 'string') return content.trim().length > 0;
    if (typeof content === 'object') {
        if (content.content && Array.isArray(content.content) && content.content.length > 0) return true;
    }
    return false;
  }

  // Tablo Dolu mu?
  const hasTableData = (table: any) => {
    if (!table) return false;
    if (!table.tbody) return false;
    if (!Array.isArray(table.tbody)) return false;
    if (table.tbody.length === 0) return false;
    
    const hasRealData = table.tbody.some((row: any) => 
      row.body.some((cell: any) => cell.value && cell.value.trim() !== "")
    );

    return hasRealData;
  }
  
  // Akıllı İçerik Gösterici
  const renderSafe = (content: any) => {
    if (!content) return null;
    if (typeof content === 'string') return content;
    if (typeof content === 'object' && content.type === 'doc') {
      return renderRichText(content, richTextOptions);
    }
    return null;
  }

  // YAZI VE TABLO AYARLARI
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

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ÜST BAŞLIK */}
      <div className="bg-white py-20 text-center border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Mineral Takviyeleri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vücudunuzun ihtiyaç duyduğu temel mineralleri en saf ve etkili formüllerle 
            sunuyoruz.
          </p>
        </div>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {products.map((item) => {
            const product = item.content; 
            const imageUrl = product.image?.filename || "/images/hero.png";

            return (
              <div 
                key={item.uuid} 
                onClick={() => setSelectedProduct(product)} 
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
              >
                {/* Kart Resmi */}
                <div className="relative h-80 bg-gray-100 overflow-hidden">
                  <span className="absolute top-4 left-4 bg-white/90 text-[#00b074] text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-wide z-10">
                    {product.category || "Mineraller"}
                  </span>
                  <img 
                    src={imageUrl}
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-gray-900 font-bold text-lg mb-4 leading-snug">
                    {product.name}
                  </h3>
                  
                  {/* KISA AÇIKLAMA (Sadece doluysa) */}
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
          })}
        </div>
      </div>

      {/* POP-UP MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Kapatma Butonu */}
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"><X className="w-6 h-6" /></button>

            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">
                {selectedProduct.name}
              </h2>
              
              <div className="grid lg:grid-cols-12 gap-10">
                
                {/* SOL TARAF: RESİM VE GALERİ */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {/* Büyük Resim */}
                  <div className="bg-gray-100 rounded-2xl h-[400px] border border-gray-200 overflow-hidden relative shadow-inner flex items-center justify-center">
                    {activeImage && (
                      <img 
                        src={activeImage} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>

                  {/* GALERİ ŞERİDİ */}
                  {galleryList.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {galleryList.map((imgUrl, i) => (
                        <button 
                          key={i}
                          onClick={() => setActiveImage(imgUrl)}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition-all ${
                            activeImage === imgUrl 
                            ? "border-[#00b074] ring-2 ring-[#00b074]/20" 
                            : "border-gray-100 hover:border-gray-300"
                          }`}
                        >
                          <img 
                            src={imgUrl}
                            alt={`Galeri ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SAĞ TARAF: DETAYLAR */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Ürün Açıklaması */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-xl">Ürün Açıklaması</h3>
                    <div className="text-gray-700 text-base leading-loose prose prose-slate max-w-none">
                      {renderSafe(selectedProduct.description)}
                    </div>
                  </div>

                  {/* Özellikler (Sadece doluysa) */}
                  {hasData(selectedProduct.features) && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Özellikler:</h3>
                      <div className="text-sm text-gray-600">
                        {renderSafe(selectedProduct.features)}
                      </div>
                    </div>
                  )}

                  {/* Net Miktar (Sadece doluysa) */}
                  {hasData(selectedProduct.net_quantity) && (
                    <div className="inline-flex items-center gap-2 bg-green-50 text-[#00b074] px-5 py-2.5 rounded-lg font-bold border border-green-100 shadow-sm">
                      <Tag className="w-5 h-5" /> 
                      Net Miktar: {selectedProduct.net_quantity}
                    </div>
                  )}
                </div>
              </div>

              {/* ALT KUTULAR (Sadece Doluysa) */}
              <div className="mt-12 space-y-6">
                
                {/* İçerik ve Kullanım */}
                {(hasData(selectedProduct.ingredients) || hasData(selectedProduct.usage)) && (
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
                )}

                {/* Tablo */}
                {hasTableData(selectedProduct.active_ingredients) && (
                   <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>{selectedProduct.active_ingredients.thead.map((h:any, k:number) => <th key={k} className="px-6 py-3 font-bold text-gray-800">{h.value}</th>)}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {selectedProduct.active_ingredients.tbody.map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-gray-50">
                              {row.body.map((cell: any, j: number) => (
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
                     <div><span className="font-bold block mb-1 text-lg">Uyarılar:</span><div className="leading-relaxed opacity-90">{renderSafe(selectedProduct.warnings)}</div></div>
                  </div>
                )}

                {/* Saklama Koşulları */}
                {hasData(selectedProduct.storage) && (
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] p-6 rounded-xl flex items-center gap-5 shadow-sm">
                    <div className="bg-white p-3 rounded-full shadow-md text-blue-600"><Thermometer className="w-6 h-6" /></div>
                    <div><div className="font-bold text-blue-900 text-lg mb-1">Saklama Koşulları:</div><div className="text-blue-800 leading-relaxed">{renderSafe(selectedProduct.storage)}</div></div>
                  </div>
                )}

                {/* Fiyat Kutusu */}
                {hasData(selectedProduct.price) && (
                  <div className="bg-[#f0fdf4] border border-[#86efac] p-6 rounded-xl flex items-center justify-between shadow-sm">
                     <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-full shadow-md text-[#00b074]"><Tag className="w-6 h-6" /></div>
                        <div className="font-bold text-green-900 text-lg">Satış Fiyatı:</div>
                     </div>
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