"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Check, AlertCircle, Info, Thermometer, Tag, Sun, Zap, ShieldCheck, Heart } from "lucide-react"
// Storyblok yazı çeviricisi
import { render as renderRichText } from "storyblok-rich-text-react-renderer"

export function VitaminlerContent({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

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
          <p className="text-gray-500 mt-2">Storyblok panelinden 'Vitaminler' kategorisine içerik ekleyiniz.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ÜST BAŞLIK */}
      <div className="bg-white py-20 text-center border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Vitamin Takviyeleri</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Günlük ihtiyaçlarınız için zengin vitamin kompleksleri. C, D, B12 ve daha fazlası ile 
            sağlığınızı destekleyin.
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
                <div className="relative h-80 bg-gray-100 overflow-hidden">
                  <span className="absolute top-4 left-4 bg-white/90 text-[#00b074] text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-wide z-10">
                    {product.category || "Vitaminler"}
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
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                    {product.short_desc}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <span className="text-[#00b074] text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                      Detayları Gör <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* --- VİTAMİNLERİN ÖNEMİ BÖLÜMÜ --- */}
        <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-lg border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Sol: Başlık ve Açıklama */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vitaminler Neden Önemlidir?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Vitaminler, vücudumuzun büyümesi, gelişmesi ve normal fonksiyonlarını sürdürebilmesi için 
                gerekli olan organik bileşiklerdir. Eksikliklerinde çeşitli sağlık sorunları ortaya çıkabilir.
              </p>
            </div>

            {/* Sağ: Özellik Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">D Vitamini</h4>
                  <p className="text-sm text-gray-500">Kemik sağlığı ve bağışıklık sistemi için güneşin gücünü yanınızda taşıyın.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">B Vitaminleri</h4>
                  <p className="text-sm text-gray-500">Enerji metabolizmasını destekler, yorgunluk ve bitkinliği azaltır.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#00b074] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">C Vitamini</h4>
                  <p className="text-sm text-gray-500">Güçlü bir antioksidandır ve bağışıklık sisteminin normal fonksiyonuna katkıda bulunur.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">E Vitamini</h4>
                  <p className="text-sm text-gray-500">Hücreleri oksidatif strese karşı korumaya yardımcı olan önemli bir vitamindir.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* --- POP-UP MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"><X className="w-6 h-6" /></button>

            <div className="p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">{selectedProduct.name}</h2>
              
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <div className="bg-gray-100 rounded-2xl h-[500px] border border-gray-200 overflow-hidden relative shadow-inner">
                    <img 
                      src={selectedProduct.image?.filename || "/images/hero.png"} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Ürün Açıklaması</h3>
                    <div className="text-gray-600 leading-relaxed text-sm prose prose-sm max-w-none">
                      {renderRichText(selectedProduct.description, {
                        nodeResolvers: {
                          'table': (children) => (
                            <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg">
                              <table className="w-full text-sm text-left"><tbody className="divide-y divide-gray-100">{children}</tbody></table>
                            </div>
                          ),
                          'tr': (children) => <tr className="hover:bg-gray-50">{children}</tr>,
                          'td': (children) => <td className="px-4 py-2 border-r border-gray-100 last:border-0">{children}</td>,
                          'th': (children) => <th className="px-4 py-2 font-bold bg-gray-50 border-r border-gray-200 last:border-0">{children}</th>
                        }
                      })}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-green-50 text-[#00b074] px-4 py-2 rounded-lg font-semibold border border-green-100">
                    <Tag className="w-4 h-4" /> 
                    Net Miktar: {selectedProduct.net_quantity}
                  </div>
                </div>
              </div>

              {/* Alt Bilgiler */}
              <div className="mt-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3"><Info className="w-5 h-5 text-[#00b074]" /> İçerik</div>
                      <p className="text-sm text-gray-700">Ürün içeriği bilgisi Storyblok'tan eklenebilir.</p>
                   </div>
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3"><AlertCircle className="w-5 h-5 text-[#00b074]" /> Kullanım Şekli</div>
                      <p className="text-sm text-gray-700">Kullanım talimatı Storyblok'tan eklenebilir.</p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}