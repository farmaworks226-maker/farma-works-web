"use client"

import { useState } from "react"
import Image from "next/image"

// KENDİ FORMSPREE KODUNUZU BURAYA YAZIN
const FORM_ID = "mjkzjlwo";

export function BayiForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#F3EBE2]">
      {/* Hero Section */}
      <div className="bg-[#1E40D8] py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Bayimiz Olun</h1>
        <p className="text-lg opacity-90 mt-2">Farma Works ailesine katılın</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-12 gap-12 mb-16 items-start">

          {/* Sol Taraf: Görsel Galeri */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400" 
                alt="Eczane Rafı" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400" 
                alt="İlaç Kutuları" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400" 
                alt="Eczane İçi" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400" 
                alt="Eczacı" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>

          {/* Sağ Taraf: Başlık ve Açıklama */}
          <div className="md:col-span-7">
            <h2 className="text-2xl font-bold text-[#1E40D8] mb-4">Eczane Bayi Başvuru Formu</h2>
            <p className="text-gray-600 leading-relaxed">
              Avantajlı alım koşulları ve özel fiyatlarla ürünlere kolay erişim sağlamak için formu doldurarak başvurunuzu iletebilirsiniz.
            </p>
          </div>
        </div>

        {/* Form Alanı */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-[#1E40D8] mb-6">Başvuru Formu</h2>

          {status === "success" ? (
            <div className="text-center py-10">
              <div className="text-[#ED6E2D] text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-[#1E40D8]">Başvurunuz Alındı!</h3>
              <p className="text-gray-600 mt-2">En kısa sürede sizinle iletişime geçeceğiz.</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-[#ED6E2D] font-bold underline hover:text-[#d55f24]">
                Yeni Form Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="Yeni Bayilik Başvurusu!" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Adı <span className="text-[#ED6E2D]">*</span></label>
                  <input required name="Ad" type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Soyad <span className="text-[#ED6E2D]">*</span></label>
                  <input required name="Soyad" type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"/>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Eczane Adı <span className="text-[#ED6E2D]">*</span></label>
                <input required name="Eczane_Adi" type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"/>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">E-Posta <span className="text-[#ED6E2D]">*</span></label>
                <input required name="email" type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"/>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Telefon <span className="text-[#ED6E2D]">*</span></label>
                <input required name="Telefon" type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"/>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mesajınız</label>
                <textarea name="Mesaj" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none resize-none transition"></textarea>
              </div>

              {status === "error" && (
                <div className="text-[#ED6E2D] text-sm">
                  Bir hata oluştu. Lütfen tekrar deneyin.
                </div>
              )}

              <button disabled={status === "submitting"} className="w-full bg-[#ED6E2D] hover:bg-[#d55f24] text-white font-bold py-4 rounded-lg transition duration-300 disabled:opacity-50">
                {status === "submitting" ? "Gönderiliyor..." : "Gönder"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}