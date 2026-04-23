"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, FileText, Lock, FileCheck } from "lucide-react"

export default function KVKKPage() {
  const router = useRouter()

  // 3 saniye sonra otomatik yönlendir
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/kisisel-verileriniz#aydinlatma')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 text-center">
          {/* İkon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1E40D8] to-[#2a6ba0] rounded-full mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>

          {/* Başlık */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E40D8] mb-4">
            Sayfa Taşındı
          </h1>

          {/* Açıklama */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            KVKK ile ilgili tüm bilgilendirmelerimiz artık{" "}
            <span className="font-semibold text-[#1E40D8]">
              &quot;Kişisel Verileriniz Hakkında&quot;
            </span>{" "}
            sayfasında yer almaktadır.
          </p>

          {/* Butonlar */}
          <div className="space-y-4">
            <Link
              href="/kisisel-verileriniz#aydinlatma"
              className="inline-flex items-center gap-3 bg-[#ED6E2D] hover:bg-[#d45a1e] text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl group"
            >
              Yeni Sayfaya Git
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-sm text-gray-500">
              3 saniye içinde otomatik olarak yönlendirileceksiniz...
            </p>
          </div>

          {/* Hızlı Erişim Linkleri */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Hızlı Erişim:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link
                href="/kisisel-verileriniz#aydinlatma"
                className="flex items-center gap-2 p-3 text-sm text-gray-700 hover:text-[#1E40D8] hover:bg-[#F3EBE2] rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                Aydınlatma Metni
              </Link>
              <Link
                href="/kisisel-verileriniz#saklama"
                className="flex items-center gap-2 p-3 text-sm text-gray-700 hover:text-[#1E40D8] hover:bg-[#F3EBE2] rounded-lg transition-colors"
              >
                <Lock className="w-4 h-4" />
                Saklama Politikası
              </Link>
              <Link
                href="/kisisel-verileriniz#basvuru"
                className="flex items-center gap-2 p-3 text-sm text-gray-700 hover:text-[#1E40D8] hover:bg-[#F3EBE2] rounded-lg transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                Başvuru Formu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}