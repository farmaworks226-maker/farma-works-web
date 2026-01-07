"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Check, AlertCircle, Info, Thermometer, Tag, ShieldCheck, Zap, Brain, Heart, Activity, Sun, X } from "lucide-react"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"

interface StoryblokImage {
  filename: string;
  alt?: string;
}

interface ProductContent {
  name: string;
  category?: string;
  image?: StoryblokImage;
  gallery?: StoryblokImage[];
  images?: StoryblokImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  short_desc?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features?: any;
  net_quantity?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ingredients?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usage?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warnings?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage?: any;
  price?: string;
  active_ingredients?: {
    thead: { value: string }[];
    tbody: { body: { value: string }[] }[];
  };
}

interface ProductStory {
  uuid: string;
  content: ProductContent;
}

const richTextOptions = {
  nodeResolvers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'table': (children: any) => (
      <div className="overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left border-collapse"><tbody className="divide-y divide-gray-100">{children}</tbody></table>
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'tr': (children: any) => <tr className="hover:bg-gray-50 transition-colors">{children}</tr>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'td': (children: any) => <td className="px-6 py-3 border-r border-gray-100 last:border-0 text-gray-600">{children}</td>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'th': (children: any) => <th className="px-6 py-3 font-bold bg-gray-50 border-r border-gray-200 last:border-0 text-gray-800 uppercase text-xs tracking-wider">{children}</th>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'bullet_list': (children: any) => <div className="space-y-3 my-4">{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'list_item': (children: any) => (
      <div className="flex items-start gap-3">
        <div className="mt-1 bg-[#F3EBE2] p-0.5 rounded-full shrink-0">
          <Check className="w-3.5 h-3.5 text-[#ED6E2D]" />
        </div>
        <span className="leading-relaxed text-gray-700">{children}</span>
      </div>
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderSafe = (content: any) => {
  if (!content) return null;
  if (typeof content === 'string') return content;
  if (typeof content === 'object' && content.type === 'doc') {
    return renderRichText(content, richTextOptions);
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasData = (content: any) => {
  if (!content) return false;
  if (typeof content === 'string') return content.trim().length > 0;
  if (typeof content === 'object') {
    if (content.content && Array.isArray(content.content) && content.content.length > 0) return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasTableData = (table: any) => {
  if (!table) return false;
  if (!table.tbody) return false;
  if (!Array.isArray(table.tbody)) return false;
  if (table.tbody.length === 0) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return table.tbody.some((row: any) => row.body.some((cell: any) => cell.value && cell.value.trim() !== ""));
}

export function MultivitaminContent({ products }: { products: ProductStory[] }) {
  const [selectedProduct, setSelectedProduct] = useState<ProductContent | null>(null)
  const [activeImage, setActiveImage] = useState<string>("")
  const [galleryList, setGalleryList] = useState<string[]>([])

  const handleProductClick = (product: ProductContent) => {
    setSelectedProduct(product)
    const mainImg = product.image?.filename || "/images/hero.png"
    setActiveImage(mainImg)
    const imagesList: string[] = []
    if (mainImg) imagesList.push(mainImg)
    const multiImages = product.gallery || product.images || []
    if (Array.isArray(multiImages)) {
      multiImages.forEach((img) => {
        if (typeof img === 'string') imagesList.push(img)
        else if (img?.filename) imagesList.push(img.filename)
      })
    }
    setGalleryList(Array.from(new Set(imagesList)))
  }

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
      
      {/* HERO - BEJ TEMA */}
      <div className="bg-[#F3EBE2] py-20 text-center border-b border-[#e5d9ca]">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white text-[#ED6E2D] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            Tam Koruma
          </div>
          <h1 className="text-4xl font-bold text-[#1E40D8] mb-4">Multivitaminler</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">Günlük beslenmenizi destekleyen, enerji ve bağışıklık sisteminizi güçlendiren kapsamlı formüller.</p>
        </div>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {(!products || products.length === 0) ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">Henüz ürün bulunamadı.</h2>
            <p className="text-gray-500 mt-2">Storyblok panelinden &apos;Multivitaminler&apos; kategorisine içerik ekleyiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {products.map((item) => {
              const product = item.content;
              const imageUrl = product.image?.filename || "/images/hero.png";
              return (
                <div key={item.uuid} onClick={() => handleProductClick(product)} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer h-full">
                  <div className="relative h-80 bg-gray-100 overflow-hidden">
                    <span className="absolute top-4 left-4 bg-white/90 text-[#ED6E2D] text-[10px] font-bold px-2 py-1 rounded border border-orange-100 uppercase tracking-wide z-10">{product.category || "Multivitamin"}</span>
                    <Image src={imageUrl} alt={product.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-gray-900 font-bold text-lg mb-4 leading-snug">{product.name}</h3>
                    {hasData(product.short_desc) && (
                      <div className="text-xs text-gray-500 line-clamp-2 mb-4">{renderSafe(product.short_desc)}</div>
                    )}
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <span className="text-[#ED6E2D] text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">İncele <ArrowRight className="w-4 h-4 ml-1" /></span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* FAYDALAR - BEJ TEMA */}
      <div className="bg-[#F3EBE2] py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1E40D8] mb-4">Multivitaminler Neden Önemlidir?</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">Tek bir tabletle vücudunuzun ihtiyaç duyduğu temel vitamin ve mineralleri karşılayarak genel sağlığınızı destekler.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e5d9ca] hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-[#F3EBE2] rounded-full flex items-center justify-center mb-6 text-[#ED6E2D]"><ShieldCheck className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tam Koruma</h3>
              <p className="text-gray-600 leading-relaxed">Bağışıklık sistemini güçlendiren A, C, D ve E vitaminleri ile çinko gibi mineralleri bir arada sunar.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e5d9ca] hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-[#1E40D8]/10 rounded-full flex items-center justify-center mb-6 text-[#1E40D8]"><Zap className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Maksimum Enerji</h3>
              <p className="text-gray-600 leading-relaxed">B kompleksi vitaminleri, yorgunluk ve bitkinliği azaltarak günlük enerji seviyenizi optimize eder.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e5d9ca] hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-[#F3EBE2] rounded-full flex items-center justify-center mb-6 text-[#ED6E2D]"><Brain className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zihinsel Performans</h3>
              <p className="text-gray-600 leading-relaxed">Odaklanma, hafıza ve bilişsel fonksiyonları destekleyen özel mikro besinler içerir.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e5d9ca] hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-[#1E40D8]/10 rounded-full flex items-center justify-center mb-6 text-[#1E40D8]"><Heart className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kalp Sağlığı</h3>
              <p className="text-gray-600 leading-relaxed">Kalp fonksiyonlarını destekleyen folik asit, B6 ve B12 vitaminleri ile kalp sağlığınıza katkıda bulunur.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e5d9ca] hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-[#F3EBE2] rounded-full flex items-center justify-center mb-6 text-[#ED6E2D]"><Activity className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Metabolizma Desteği</h3>
              <p className="text-gray-600 leading-relaxed">Besinlerin verimli bir şekilde enerjiye dönüştürülmesi için gerekli olan metabolik süreçleri düzenler.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e5d9ca] hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-[#1E40D8]/10 rounded-full flex items-center justify-center mb-6 text-[#1E40D8]"><Sun className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kemik Gücü</h3>
              <p className="text-gray-600 leading-relaxed">Kalsiyum, magnezyum ve D vitamini kombinasyonu ile kemik yoğunluğunu ve sağlığını korur.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"><X className="w-6 h-6" /></button>
            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4 pr-10">{selectedProduct.name}</h2>
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-gray-100 rounded-2xl h-[400px] border border-gray-200 overflow-hidden relative shadow-inner flex items-center justify-center">
                    {activeImage && <Image src={activeImage} alt={selectedProduct.name} fill className="object-cover" />}
                  </div>
                  {galleryList.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {galleryList.map((imgUrl, i) => (
                        <button key={i} onClick={() => setActiveImage(imgUrl)} className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition-all ${activeImage === imgUrl ? "border-[#ED6E2D] ring-2 ring-[#ED6E2D]/20" : "border-gray-100 hover:border-gray-300"}`}>
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
                    <div className="inline-flex items-center gap-2 bg-[#F3EBE2] text-[#ED6E2D] px-5 py-2.5 rounded-lg font-bold border border-[#e5d9ca] shadow-sm"><Tag className="w-5 h-5" /> Net Miktar: {selectedProduct.net_quantity}</div>
                  )}
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {hasData(selectedProduct.ingredients) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><Info className="w-6 h-6 text-[#1E40D8]" /> İçerik</div>
                      <div className="text-gray-700 leading-relaxed text-sm">{renderSafe(selectedProduct.ingredients)}</div>
                    </div>
                  )}
                  {hasData(selectedProduct.usage) && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg"><AlertCircle className="w-6 h-6 text-[#1E40D8]" /> Kullanım Şekli</div>
                      <div className="text-gray-700 leading-relaxed text-sm">{renderSafe(selectedProduct.usage)}</div>
                    </div>
                  )}
                </div>
                {hasTableData(selectedProduct.active_ingredients) && selectedProduct.active_ingredients && (
                  <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#F3EBE2] border-b border-[#e5d9ca]">
                        <tr>{selectedProduct.active_ingredients.thead.map((h: { value: string }, k: number) => <th key={k} className="px-6 py-3 font-bold text-[#1E40D8]">{h.value}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedProduct.active_ingredients.tbody.map((row: { body: { value: string }[] }, i: number) => (
                          <tr key={i} className="hover:bg-gray-50">{row.body.map((cell: { value: string }, j: number) => <td key={j} className={`px-6 py-4 ${j === 1 ? 'font-bold text-right' : ''}`}>{cell.value}</td>)}</tr>
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
                  <div className="bg-[#F3EBE2] border border-[#e5d9ca] p-6 rounded-xl flex items-center gap-5 shadow-sm">
                    <div className="bg-white p-3 rounded-full shadow-md text-[#1E40D8]"><Thermometer className="w-6 h-6" /></div>
                    <div><div className="font-bold text-[#1E40D8] text-lg mb-1">Saklama Koşulları:</div><div className="text-gray-700 leading-relaxed">{renderSafe(selectedProduct.storage)}</div></div>
                  </div>
                )}
                {hasData(selectedProduct.price) && (
                  <div className="bg-[#F3EBE2] border border-[#e5d9ca] p-6 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4"><div className="bg-white p-3 rounded-full shadow-md text-[#ED6E2D]"><Tag className="w-6 h-6" /></div><div className="font-bold text-[#1E40D8] text-lg">Satış Fiyatı:</div></div>
                    <div className="text-2xl font-extrabold text-[#ED6E2D]">{selectedProduct.price}</div>
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