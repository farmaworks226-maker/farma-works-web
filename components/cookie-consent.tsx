"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Sadece tarayıcıda çalıştır
    if (typeof window === 'undefined') return
    
    // Onay var mı kontrol et
    const consent = window.localStorage.getItem('cookie_consent')
    if (!consent) {
      setTimeout(() => setShow(true), 500)
    }
  }, [])

  const handleAccept = () => {
    setLoading(true)
    
    try {
      // 1. LocalStorage'a HEMEN kaydet
      window.localStorage.setItem('cookie_consent', 'true')
      window.localStorage.setItem('cookie_consent_date', new Date().toISOString())
      
      // 2. Banner'ı HEMEN gizle
      setShow(false)
      
      // 3. API'ye arka planda gönder (başarısız olsa da önemli değil)
      setTimeout(() => {
        fetch('/api/cookie-consent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ consent: true })
        }).catch(() => {
          // Sessizce başarısız ol, kullanıcıyı etkileme
        })
      }, 100)
      
    } catch {
      // Hata olsa bile banner'ı kapat
      setShow(false)
    }
  }

  // Show false ise hiçbir şey render etme
  if (!show) return null

  return (
    <>
      {/* Overlay - tıklanamaz */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99998]"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[99999] p-4 sm:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-[#1E40D8]/10 p-6 sm:p-8">
          
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

          <div className="bg-[#F3EBE2] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded bg-[#1E40D8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-800 leading-relaxed">
                <Link 
                  href="/cerez-aydinlatma" 
                  target="_blank"
                  className="text-[#1E40D8] hover:text-[#ED6E2D] font-semibold underline"
                >
                  Çerezlere İlişkin Aydınlatma Metni
                </Link>
                &apos;ni okudum, anladım.
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="px-8 py-3 bg-[#ED6E2D] hover:bg-[#d45a1e] disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              {loading ? 'Kaydediliyor...' : 'Tamam'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}