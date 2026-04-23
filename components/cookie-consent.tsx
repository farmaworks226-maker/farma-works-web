"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Cookie onayı var mı kontrol et
    const consentGiven = localStorage.getItem('cookie_consent')
    if (!consentGiven) {
      // 500ms gecikme ile göster (daha yumuşak)
      setTimeout(() => setIsVisible(true), 500)
    }
  }, [])

  const handleAccept = async () => {
    setIsSubmitting(true)

    try {
      // API'ye onay kaydını gönder
      const response = await fetch('/api/cookie-consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consent: true
        })
      })

      const result = await response.json()

      if (result.success) {
        // LocalStorage'a kaydet (tekrar sorulmaması için)
        localStorage.setItem('cookie_consent', 'true')
        localStorage.setItem('cookie_consent_date', new Date().toISOString())
        
        // Pop-up'ı kapat
        setIsVisible(false)
      }
    } catch (error) {
      console.error('Çerez onayı hatası:', error)
      // Hata olsa bile localStorage'a kaydet (kullanıcı deneyimi için)
      localStorage.setItem('cookie_consent', 'true')
      setIsVisible(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] animate-in fade-in duration-300" />

      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-[#1E40D8]/10 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* İkon ve Başlık */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#ED6E2D] to-[#d45a1e] rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1E40D8] mb-2">
                  Çerez Kullanımı
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. 
                  Detaylı bilgi için{" "}
                  <Link 
                    href="/cerez-aydinlatma" 
                    target="_blank"
                    className="text-[#1E40D8] hover:text-[#ED6E2D] font-semibold underline"
                  >
                    Çerezlere İlişkin Aydınlatma Metni
                  </Link>
                  &apos;ni okuyabilirsiniz.
                </p>
              </div>
            </div>

            {/* Onay Checkbox */}
            <div className="bg-[#F3EBE2] rounded-lg p-4 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex items-center justify-center mt-0.5">
                  <div className="w-5 h-5 rounded bg-[#1E40D8] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-gray-800 leading-relaxed flex-1">
                  <Link 
                    href="/cerez-aydinlatma" 
                    target="_blank"
                    className="text-[#1E40D8] hover:text-[#ED6E2D] font-semibold underline"
                  >
                    Çerezlere İlişkin Aydınlatma Metni
                  </Link>
                  &apos;ni okudum, anladım.
                </span>
              </label>
            </div>

            {/* Buton */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleAccept}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-[#ED6E2D] hover:bg-[#d45a1e] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Kaydediliyor...' : 'Tamam'}
              </button>
            </div>

            {/* Alt Bilgi */}
            <p className="text-xs text-gray-500 mt-4 text-center sm:text-right">
              Bu bildirimi kabul etmeden siteyi kullanmaya devam edemezsiniz.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}