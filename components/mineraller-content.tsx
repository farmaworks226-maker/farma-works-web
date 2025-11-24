"use client"

import { useState, useEffect } from "react"
import { X, Check, AlertCircle, Info, Thermometer, Tag, ArrowRight } from "lucide-react"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"

export function MinerallerContent({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [activeImage, setActiveImage] = useState<string>("")

  // Scroll kilitleme (Modal açılınca arka plan kaymasın)
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-400">Henüz ürün bulunamadı.</h2>
          <p className="text-gray-500 mt-2">Storyblok panelinden içeriklerinizi kontrol ediniz.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white py-20 text-center border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Mineral Takviyeleri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vücudunuzun ihtiyaç duyduğu temel mineralleri en saf ve etkili formüllerle sunuyoruz.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {products.map((item) => {
            const product = item.content; 
            const imageUrl = product.image?.filename || "/images/hero.png";

            return (
              <div 
                key={item.uuid} 
                // DÜZELTME BURADA: Tıklandığı an hem ürünü hem de ana resmi seçiyoruz.
                onClick={() => {
                  setSelectedProduct(product);
                  setActiveImage(product.image?.filename || "/images/hero.png");
                }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
              >
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
                  <h3 className="text-gray-900 font-bold text-lg mb-2 leading-snug min-h-[3rem]">
                    {product.name}
                  </h3>
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

      {/* --- POP-UP MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"><X className="w-6 h-6" /></button>

            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">
                {selectedProduct.name}
              </h2>
              
              <div className="grid lg:grid-cols-12 gap-10">
                {/* SOL: Büyük Resim */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-gray-100 rounded-2xl h-[400px] border border-gray-200 overflow-hidden relative shadow-inner group">
                    {/* DÜZELTME: Eğer activeImage boşsa yedek resim göster */}
                    <img 
                      src={activeImage || "/images/hero.png"} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover transition-all duration-300" 
                    />
                  </div>

                  {/* Küçük Resimler (Galeri) */}
                  {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {/* Ana resim butonu */}
                      <button 
                        onClick={() => setActiveImage(selectedProduct.image?.filename)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${activeImage === selectedProduct.image?.filename ? 'border-[#00b074]' : 'border-transparent'}`}
                      >
                        <img src={selectedProduct.image?.filename} className="w-full h-full object-cover" />
                      </button>

                      {/* Galeri resimleri */}
                      {selectedProduct.gallery.map((img: any) => (
                        <button 
                          key={img.id}
                          onClick={() => setActiveImage(img.filename)}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${activeImage === img.filename ? 'border-[#00b074]' : 'border-transparent'}`}
                        >
                          <img src={img.filename} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SAĞ: Detaylar */}
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Ürün Açıklaması</h3>
                    <div className="text-gray-700 text-base leading-loose prose prose-slate max-w-none prose-headings:text-[#0f172a] prose-a:text-[#00b074] prose-strong:font-bold prose-strong:text-gray-900">
                      {renderRichText(selectedProduct.description, {
                        nodeResolvers: {
                          'table': (children) => (
                            <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
                              <table className="w-full text-sm text-left border-collapse">
                                <tbody className="divide-y divide-gray-100">{children}</tbody>
                              </table>
                            </div>
                          ),
                          'tr': (children) => <tr className="hover:bg-gray-50 transition-colors">{children}</tr>,
                          'td': (children) => <td className="px-6 py-3 border-r border-gray-100 last:border-0 text-gray-600">{children}</td>,
                          'th': (children) => <th className="px-6 py-3 font-bold bg-gray-50 border-r border-gray-200 last:border-0 text-gray-800 uppercase text-xs tracking-wider">{children}</th>
                        }
                      })}
                    </div>
                  </div>

                  {selectedProduct.features && (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Özellikler:</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        {renderRichText(selectedProduct.features, {
                          nodeResolvers: {
                            'list_item': (children) => (
                              <div className="flex items-start gap-3 mb-2">
                                <div className="mt-1 bg-green-100 p-0.5 rounded-full"><Check className="w-3 h-3 text-[#00b074]" /></div>
                                <span className="leading-relaxed">{children}</span>
                              </div>
                            ),
                            'bullet_list': (children) => <div>{children}</div>
                          }
                        })}
                      </div>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-2 bg-green-50 text-[#00b074] px-5 py-2.5 rounded-lg font-bold border border-green-100 shadow-sm">
                    <Tag className="w-5 h-5" /> Net Miktar: {selectedProduct.net_quantity}
                  </div>
                </div>
              </div>

              {/* Alt Kutular */}
              <div className="mt-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><Info className="w-6 h-6 text-[#00b074]" /> İçerik</div>
                      <p className="text-gray-700 leading-relaxed">{selectedProduct.ingredients}</p>
                   </div>
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><AlertCircle className="w-6 h-6 text-[#00b074]" /> Kullanım Şekli</div>
                      <p className="text-gray-700 leading-relaxed">{selectedProduct.usage}</p>
                   </div>
                </div>

                {/* Aktif Bileşenler Tablosu */}
                {selectedProduct.active_ingredients && selectedProduct.active_ingredients.tbody && (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-100 px-6 py-3 font-bold text-gray-800 text-sm border-b border-gray-200 flex justify-between">
                      <span>Etken Madde</span>
                      <span>Miktar</span>
                    </div>
                    <div className="bg-white">
                      <table className="w-full text-sm text-left">
                        <tbody className="divide-y divide-gray-100">
                          {selectedProduct.active_ingredients.tbody.map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-gray-50">
                              {row.body.map((cell: any, j: number) => (
                                <td key={j} className={`px-6 py-4 ${j === 1 ? 'font-bold text-right' : ''}`}>
                                  {cell.value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Uyarılar */}
                {selectedProduct.warnings && (
                  <div className="bg-[#fffbeb] border border-[#fcd34d] p-6 rounded-xl text-[#92400e] flex gap-4 shadow-sm">
                     <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                     <div>
                        <span className="font-bold block mb-1 text-lg">Uyarılar:</span>
                        <p className="leading-relaxed opacity-90">{selectedProduct.warnings}</p>
                     </div>
                  </div>
                )}

                {/* Saklama */}
                {selectedProduct.storage && (
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] p-6 rounded-xl flex items-center gap-5 shadow-sm">
                    <div className="bg-white p-3 rounded-full shadow-md text-blue-600">
                      <Thermometer className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-blue-900 text-lg mb-1">Saklama Koşulları:</div>
                      <div className="text-blue-800 leading-relaxed">{selectedProduct.storage}</div>
                    </div>
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