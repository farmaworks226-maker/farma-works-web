"use client"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const FORM_ID = "mjkzjlwo"

export default function IletisimPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      
      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-[#F3EBE2]">
      {/* Hero Section */}
      <div className="bg-[#1E40D8] py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">İletişim</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto px-4">
          Sorularınız, önerileriniz ve işbirliği fırsatları için bizimle iletişime geçin.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* SOL: BİLGİLER */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1E40D8]/10 rounded-lg flex items-center justify-center shrink-0 text-[#1E40D8]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E40D8]">ADRES</h4>
                  <p className="text-gray-600 text-sm">Nisbetiye Mahallesi, Nisbetiye Caddesi No:22 Özden İş Merkezi Kat: 3, 34520 Beşiktaş/İstanbul</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1E40D8]/10 rounded-lg flex items-center justify-center shrink-0 text-[#1E40D8]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E40D8]">TELEFON NUMARASI</h4>
                  <p className="text-gray-600 text-sm">+90 212 706 71 76</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1E40D8]/10 rounded-lg flex items-center justify-center shrink-0 text-[#1E40D8]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E40D8]">EMAIL</h4>
                  <p className="text-gray-600 text-sm">info@fw.com.tr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1E40D8]/10 rounded-lg flex items-center justify-center shrink-0 text-[#1E40D8]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E40D8]">ÇALIŞMA SAATLERİ</h4>
                  <p className="text-gray-600 text-sm">Pazartesi – Cuma: 09:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.267952027498!2d29.016345376568526!3d41.06338897134171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab669106c0001%3A0x628f681268507783!2sNisbetiye%2C%20Nisbetiye%20Cd%20No%3A22%2C%2034340%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* SAĞ: FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
              <h2 className="text-2xl font-bold text-[#1E40D8] mb-2">Bize Ulaşın</h2>
              <p className="text-gray-500 mb-8 text-sm">Mesajlarınızı en kısa sürede yanıtlıyoruz.</p>

              {status === "success" ? (
                <div className="bg-[#1E40D8]/5 border border-[#1E40D8]/20 p-6 rounded-xl text-center">
                  <div className="text-[#ED6E2D] text-4xl mb-2">✓</div>
                  <h3 className="font-bold text-[#1E40D8]">Mesajınız Gönderildi!</h3>
                  <p className="text-[#1E40D8]/70 text-sm">En kısa sürede dönüş yapacağız.</p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="mt-4 text-[#ED6E2D] text-sm underline hover:text-[#d55f24]"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="_subject" value="Yeni İletişim Mesajı" />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Adı <span className="text-[#ED6E2D]">*</span>
                      </label>
                      <input 
                        required 
                        name="Ad" 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Soyad</label>
                      <input 
                        name="Soyad" 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      E-posta <span className="text-[#ED6E2D]">*</span>
                    </label>
                    <input 
                      required 
                      name="email" 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Mesaj</label>
                    <textarea 
                      required 
                      name="Mesaj" 
                      rows={5} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED6E2D] focus:border-[#ED6E2D] outline-none resize-none transition"
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === "submitting"} 
                    className="w-full bg-[#ED6E2D] hover:bg-[#d55f24] text-white font-bold py-4 rounded-lg transition duration-300 disabled:opacity-50"
                  >
                    {status === "submitting" ? "Gönderiliyor..." : "Gönder"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}