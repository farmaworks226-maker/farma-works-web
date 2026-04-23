"use client"

import { useState } from "react"
import Link from "next/link"
import { Send, Check, ExternalLink } from "lucide-react"

export function BayiOlForm() {
  const [formData, setFormData] = useState({
    firmaAdi: "",
    yetkiliAdiSoyadi: "",
    telefon: "",
    email: "",
    adres: "",
    vergiDairesi: "",
    vergiNo: "",
    mesaj: ""
  })

  const [consents, setConsents] = useState({
    aydinlatmaMetni: false,
    ticariSMS: false,
    sosyalMedya: false,
    email: false,
    telefon: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleConsentChange = (key: keyof typeof consents) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!consents.aydinlatmaMetni) {
      alert("Lütfen aydınlatma metnini onaylayın.")
      return
    }

    // Form gönderme işlemi
    console.log("Form Data:", formData)
    console.log("Consents:", consents)
    
    // API çağrısı burada yapılacak
    alert("Başvurunuz alındı! En kısa sürede size dönüş yapacağız.")
  }

  // Gönder butonu sadece aydınlatma metni onaylandığında aktif
  const isSubmitDisabled = !consents.aydinlatmaMetni

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
        <h2 className="text-3xl font-bold text-[#1E40D8] mb-6">Bayi Başvuru Formu</h2>
        
        {/* Firma Bilgileri */}
        <div className="space-y-6 mb-8">
          <div>
            <label htmlFor="firmaAdi" className="block text-sm font-semibold text-gray-700 mb-2">
              Firma Adı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firmaAdi"
              name="firmaAdi"
              required
              value={formData.firmaAdi}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition"
              placeholder="Firma adınızı girin"
            />
          </div>

          <div>
            <label htmlFor="yetkiliAdiSoyadi" className="block text-sm font-semibold text-gray-700 mb-2">
              Yetkili Adı Soyadı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="yetkiliAdiSoyadi"
              name="yetkiliAdiSoyadi"
              required
              value={formData.yetkiliAdiSoyadi}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition"
              placeholder="Ad ve soyadınızı girin"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="telefon" className="block text-sm font-semibold text-gray-700 mb-2">
                Telefon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                required
                value={formData.telefon}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition"
                placeholder="5xx xxx xx xx"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                E-posta <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="adres" className="block text-sm font-semibold text-gray-700 mb-2">
              Adres <span className="text-red-500">*</span>
            </label>
            <textarea
              id="adres"
              name="adres"
              required
              value={formData.adres}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition resize-none"
              placeholder="Firma adresinizi girin"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vergiDairesi" className="block text-sm font-semibold text-gray-700 mb-2">
                Vergi Dairesi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vergiDairesi"
                name="vergiDairesi"
                required
                value={formData.vergiDairesi}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition"
                placeholder="Vergi dairesi"
              />
            </div>

            <div>
              <label htmlFor="vergiNo" className="block text-sm font-semibold text-gray-700 mb-2">
                Vergi No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vergiNo"
                name="vergiNo"
                required
                value={formData.vergiNo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition"
                placeholder="Vergi numarası"
              />
            </div>
          </div>

          <div>
            <label htmlFor="mesaj" className="block text-sm font-semibold text-gray-700 mb-2">
              Mesajınız (Opsiyonel)
            </label>
            <textarea
              id="mesaj"
              name="mesaj"
              value={formData.mesaj}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E40D8] focus:border-transparent outline-none transition resize-none"
              placeholder="Eklemek istediğiniz notlar..."
            />
          </div>
        </div>

        {/* Zorunlu Onay - Aydınlatma Metni */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="bg-[#F3EBE2] rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-[#1E40D8] mb-3 flex items-center gap-2">
              <span className="text-red-500">*</span>
              Zorunlu Onay
            </h3>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={consents.aydinlatmaMetni}
                  onChange={() => handleConsentChange('aydinlatmaMetni')}
                  className="w-5 h-5 border-2 border-gray-400 rounded cursor-pointer appearance-none checked:bg-[#1E40D8] checked:border-[#1E40D8] transition"
                  required
                />
                {consents.aydinlatmaMetni && (
                  <Check className="w-3 h-3 text-white absolute pointer-events-none" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-gray-800 text-sm leading-relaxed">
                  <Link 
                    href="/kisisel-verileriniz" 
                    target="_blank"
                    className="text-[#1E40D8] hover:text-[#ED6E2D] font-semibold underline inline-flex items-center gap-1"
                  >
                    Kişisel Verilerin Korunması Aydınlatma Metni
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  {" "}ni okudum, anladım ve kabul ediyorum.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* İsteğe Bağlı Onaylar */}
        <div className="border-t border-gray-200 pt-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">İletişim Tercihleri (İsteğe Bağlı)</h3>
          <div className="space-y-4">
            
            {/* Ticari SMS */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={consents.ticariSMS}
                  onChange={() => handleConsentChange('ticariSMS')}
                  className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer appearance-none checked:bg-[#ED6E2D] checked:border-[#ED6E2D] transition"
                />
                {consents.ticariSMS && (
                  <Check className="w-3 h-3 text-white absolute pointer-events-none" />
                )}
              </div>
              <span className="text-gray-700 text-sm">
                Ticari SMS almak istiyorum.{" "}
                <Link 
                  href="/ticari-sms-onay" 
                  target="_blank"
                  className="text-[#1E40D8] hover:text-[#ED6E2D] underline inline-flex items-center gap-1"
                >
                  Detaylı bilgi
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </span>
            </label>

            {/* Sosyal Medya */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={consents.sosyalMedya}
                  onChange={() => handleConsentChange('sosyalMedya')}
                  className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer appearance-none checked:bg-[#ED6E2D] checked:border-[#ED6E2D] transition"
                />
                {consents.sosyalMedya && (
                  <Check className="w-3 h-3 text-white absolute pointer-events-none" />
                )}
              </div>
              <span className="text-gray-700 text-sm">
                Sosyal medya üzerinden ileti gönderilmesini kabul ediyorum.{" "}
                <Link 
                  href="/sosyal-medya-aydinlatma" 
                  target="_blank"
                  className="text-[#1E40D8] hover:text-[#ED6E2D] underline inline-flex items-center gap-1"
                >
                  Detaylı bilgi
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </span>
            </label>

            {/* E-posta */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={consents.email}
                  onChange={() => handleConsentChange('email')}
                  className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer appearance-none checked:bg-[#ED6E2D] checked:border-[#ED6E2D] transition"
                />
                {consents.email && (
                  <Check className="w-3 h-3 text-white absolute pointer-events-none" />
                )}
              </div>
              <span className="text-gray-700 text-sm">
                E-posta üzerinden ileti gönderilmesini kabul ediyorum.{" "}
                <Link 
                  href="/ticari-elektronik-aydinlatma" 
                  target="_blank"
                  className="text-[#1E40D8] hover:text-[#ED6E2D] underline inline-flex items-center gap-1"
                >
                  Detaylı bilgi
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </span>
            </label>

            {/* Telefon */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={consents.telefon}
                  onChange={() => handleConsentChange('telefon')}
                  className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer appearance-none checked:bg-[#ED6E2D] checked:border-[#ED6E2D] transition"
                />
                {consents.telefon && (
                  <Check className="w-3 h-3 text-white absolute pointer-events-none" />
                )}
              </div>
              <span className="text-gray-700 text-sm">
                Telefon ile aranarak bilgilendirilmek istiyorum.{" "}
                <Link 
                  href="/telefon-aydinlatma" 
                  target="_blank"
                  className="text-[#1E40D8] hover:text-[#ED6E2D] underline inline-flex items-center gap-1"
                >
                  Detaylı bilgi
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </span>
            </label>

          </div>
        </div>

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            isSubmitDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#ED6E2D] hover:bg-[#d45a1e] shadow-lg hover:shadow-xl'
          }`}
        >
          <Send className="w-5 h-5" />
          Başvuruyu Gönder
        </button>

        {isSubmitDisabled && (
          <p className="text-center text-sm text-red-500 mt-3">
            Formu göndermek için aydınlatma metnini onaylamanız gerekmektedir.
          </p>
        )}
      </form>
    </div>
  )
}