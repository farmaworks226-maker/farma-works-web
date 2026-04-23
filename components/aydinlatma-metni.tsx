"use client"

import { FileText, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AydinlatmaMetniProps {
  title: string
  content: string[]
  backLink?: string
}

export function AydinlatmaMetni({ title, content, backLink = "/" }: AydinlatmaMetniProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E40D8] to-[#2a6ba0] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Geri Dön Butonu */}
            <Link 
              href={backLink}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Geri Dön</span>
            </Link>

            {/* Rozet */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">KVKK Uyumlu</span>
            </div>

            {/* Başlık */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-lg text-white/90">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni
            </p>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {content.map((paragraph, index) => {
                // Başlık tespiti - büyük harfle yazılmış ve kısa ise başlık
                const isTitle = paragraph === paragraph.toUpperCase() && paragraph.length < 150 && paragraph.length > 5
                
                // Kalın yazı tespiti - : ile biten kısa metinler
                const isBold = paragraph.includes(':') && paragraph.split(':')[0].length < 100 && !paragraph.includes('http')

                if (isTitle) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4 first:mt-0">
                      {paragraph}
                    </h2>
                  )
                } else if (isBold && paragraph.includes(':')) {
                  const [bold, rest] = paragraph.split(':', 2)
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      <span className="font-semibold text-[#1E40D8]">{bold}:</span>
                      {rest && ` ${rest}`}
                    </p>
                  )
                } else if (paragraph.trim() === '') {
                  return null
                } else if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                  return (
                    <li key={index} className="text-gray-700 leading-relaxed ml-6">
                      {paragraph.replace(/^[•-]\s*/, '')}
                    </li>
                  )
                } else {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  )
                }
              })}
            </div>

            {/* Alt Bilgi Kutusu */}
            <div className="mt-12 bg-[#F3EBE2] border-l-4 border-[#ED6E2D] p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-[#ED6E2D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#1E40D8] mb-2">Sorularınız mı var?</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Kişisel verilerinizle ilgili daha fazla bilgi almak veya haklarınızı kullanmak için 
                    bizimle iletişime geçebilirsiniz.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/kisisel-verileriniz"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E40D8] hover:text-[#ED6E2D] transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Kişisel Verileriniz Hakkında
                    </Link>
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E40D8] hover:text-[#ED6E2D] transition-colors"
                    >
                      İletişim
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-gray-200 bg-gray-50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} FW İlaç A.Ş. | Son Güncellenme: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>
      </div>
    </div>
  )
}