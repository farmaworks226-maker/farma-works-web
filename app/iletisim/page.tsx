"use client"
import { useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

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
    <div className="min-h-screen bg-white">
      <div className="bg-[#00b074] py-20 text-center text-white">
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
                <div className="w-10 h-10 bg-[#e0f7ef] rounded-lg flex items-center justify-center shrink-0 text-[#00b074]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">ADRES</h4>
                  <p className="text-gray-600 text-sm">Maslak Mah. Büyükdere Cad. No:123 Sarıyer/İstanbul</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#e0f7ef] rounded-lg flex items-center justify-center shrink-0 text-[#00b074]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">TELEFON</h4>
                  <p className="text-gray-600 text-sm">+90 212 345 67 89</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#e0f7ef] rounded-lg flex items-center justify-center shrink-0 text-[#00b074]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">E-MAİL</h4>
                  <p className="text-gray-600 text-sm">info@farmaworks.com</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bize Ulaşın</h2>
              <p className="text-gray-500 mb-8 text-sm">Mesajlarınızı en kısa sürede yanıtlıyoruz.</p>

              {status === "success" ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                  <div className="text-green-600 text-4xl mb-2">✓</div>
                  <h3 className="font-bold text-green-900">Mesajınız Gönderildi!</h3>
                  <p className="text-green-700 text-sm">En kısa sürede dönüş yapacağız.</p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="mt-4 text-green-600 text-sm underline"
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
                        Adı <span className="text-red-500">*</span>
                      </label>
                      <input 
                        required 
                        name="Ad" 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b074] outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Soyad</label>
                      <input 
                        name="Soyad" 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b074] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      E-posta <span className="text-red-500">*</span>
                    </label>
                    <input 
                      required 
                      name="email" 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b074] outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Mesaj</label>
                    <textarea 
                      required 
                      name="Mesaj" 
                      rows={5} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b074] outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === "submitting"} 
                    className="w-full bg-gray-800 hover:bg-[#00b074] text-white font-bold py-4 rounded-lg transition duration-300 disabled:opacity-50"
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