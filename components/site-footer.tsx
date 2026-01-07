import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Twitter, Facebook, Mail, Phone, MapPin, Clock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[#1E40D8] text-gray-200 py-16 border-t border-[#1a38c0]">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. SÜTUN: Marka ve Sosyal Medya */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image 
                src="/images/logo.png" 
                alt="Farma Works Logo" 
                width={60} 
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="text-2xl font-bold text-white tracking-tight"></span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-300">
              Bilimsel formüller ve doğal içeriklerle geliştirdiğimiz takviye edici gıdalarla, 
              sağlıklı yaşam yolculuğunuzda güvenilir desteğiniz.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.instagram.com/p/DP39D4cAhZ5/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#ED6E2D] text-white transition"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#ED6E2D] text-white transition"><Linkedin className="w-4 h-4" /></Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#ED6E2D] text-white transition"><Twitter className="w-4 h-4" /></Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#ED6E2D] text-white transition"><Facebook className="w-4 h-4" /></Link>
            </div>
          </div>

          {/* 2. SÜTUN: Kurumsal & Hızlı Erişim */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Kurumsal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/kurumsal/hakkimizda" className="hover:text-[#ED6E2D] transition flex items-center gap-2">› Hakkımızda</Link></li>
              <li><Link href="/kurumsal/insan-kaynaklari" className="hover:text-[#ED6E2D] transition flex items-center gap-2">› İnsan Kaynakları</Link></li>
              <li><Link href="/kurumsal/kvkk" className="hover:text-[#ED6E2D] transition flex items-center gap-2">› KVKK Aydınlatma</Link></li>
              <li className="pt-4"><Link href="/bayimiz-ol" className="text-[#ED6E2D] font-medium hover:text-white transition flex items-center gap-2">› Bayimiz Olun</Link></li>
            </ul>
          </div>

          {/* 3. SÜTUN: Ürünlerimiz */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Ürün Kategorileri</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/urunler/vitaminler" className="hover:text-[#ED6E2D] transition">Vitaminler</Link></li>
              <li><Link href="/urunler/mineraller" className="hover:text-[#ED6E2D] transition">Mineraller</Link></li>
              <li><Link href="/urunler/multivitaminler" className="hover:text-[#ED6E2D] transition">Multivitaminler</Link></li>
              <li><Link href="/urunler/probiyotikler" className="hover:text-[#ED6E2D] transition">Probiyotikler</Link></li>
              <li><Link href="/urunler/ozel-takviyeler" className="hover:text-[#ED6E2D] transition">Özel Takviyeler</Link></li>
            </ul>
          </div>

          {/* 4. SÜTUN: İletişim Bilgileri */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-white/20 pb-2 inline-block">Bize Ulaşın</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ED6E2D] mt-0.5 shrink-0" />
                <span>Nisbetiye Mahallesi, Nisbetiye Caddesi No:22 Özden İş Merkezi Kat: 3, 34520 Beşiktaş/İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#ED6E2D] shrink-0" />
                <span className="font-medium">+90 212 706 71 76</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ED6E2D] shrink-0" />
                <span>info@fw.com.tr</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#ED6E2D] shrink-0" />
                <span>Pzt - Cuma: 09:00 - 18:00</span>
              </li>
              <li className="pt-2">
                <Link href="/eczaneler" className="inline-block bg-[#ED6E2D] hover:bg-[#d55f24] text-white text-xs font-semibold px-4 py-2 rounded-full transition">
                  EN YAKIN ECZANE
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Alt Çizgi ve Telif Hakkı */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-300">
          <p>&copy; {new Date().getFullYear()} FW İlaç ve Gıda San. A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/kurumsal/kvkk" className="hover:text-white transition">Gizlilik Politikası</Link>
            <Link href="/kurumsal/kvkk" className="hover:text-white transition">Kullanım Koşulları</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}