import Link from "next/link"
import { Instagram, Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. SÜTUN: Marka ve Sosyal Medya */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">F</div>
              <span className="text-2xl font-bold text-white tracking-tight">Farma Works</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Bilimsel formüller ve doğal içeriklerle geliştirdiğimiz takviye edici gıdalarla, 
              sağlıklı yaşam yolculuğunuzda güvenilir desteğiniz.
            </p>
            <div className="flex gap-4">
              {/* Sosyal Medya İkonları (Linkleri sonradan eklersiniz) */}
              <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 text-white transition"><Instagram className="w-4 h-4" /></Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-700 text-white transition"><Linkedin className="w-4 h-4" /></Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-400 text-white transition"><Twitter className="w-4 h-4" /></Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-800 text-white transition"><Facebook className="w-4 h-4" /></Link>
            </div>
          </div>

          {/* 2. SÜTUN: Kurumsal & Hızlı Erişim */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-slate-700 pb-2 inline-block">Kurumsal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/kurumsal/hakkimizda" className="hover:text-blue-400 transition flex items-center gap-2">› Hakkımızda</Link></li>
              <li><Link href="/kurumsal/insan-kaynaklari" className="hover:text-blue-400 transition flex items-center gap-2">› İnsan Kaynakları</Link></li>
              <li><Link href="/kurumsal/kvkk" className="hover:text-blue-400 transition flex items-center gap-2">› KVKK Aydınlatma</Link></li>
              <li className="pt-4"><Link href="/bayimiz-ol" className="text-blue-400 font-medium hover:text-white transition flex items-center gap-2">› Bayimiz Olun</Link></li>
            </ul>
          </div>

          {/* 3. SÜTUN: Ürünlerimiz */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-slate-700 pb-2 inline-block">Ürün Kategorileri</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/urunler/vitaminler" className="hover:text-blue-400 transition">Vitaminler</Link></li>
              <li><Link href="/urunler/mineraller" className="hover:text-blue-400 transition">Mineraller</Link></li>
              <li><Link href="/urunler/multivitaminler" className="hover:text-blue-400 transition">Multivitaminler</Link></li>
              <li><Link href="/urunler/probiyotikler" className="hover:text-blue-400 transition">Probiyotikler</Link></li>
              <li><Link href="/urunler/ozel-takviyeler" className="hover:text-blue-400 transition">Özel Takviyeler</Link></li>
            </ul>
          </div>

          {/* 4. SÜTUN: İletişim Bilgileri */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-slate-700 pb-2 inline-block">Bize Ulaşın</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <span>Maslak Mah. Büyükdere Cad.<br/>No:123 Sarıyer / İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="font-medium">+90 (212) 345 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>info@farmaworks.com</span>
              </li>
              <li className="pt-2">
                <Link href="/eczaneler" className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition">
                  EN YAKIN ECZANE
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Alt Çizgi ve Telif Hakkı */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Farma Works İlaç ve Gıda San. A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-white transition">Kullanım Koşulları</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}