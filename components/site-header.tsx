"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  variant?: "transparent" | "solid"
}

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Scroll durumunu takip et
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (menu: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpenDropdown(menu)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // --- RENK PALETİ ---
  // Turuncu: #ED6E2D (Pumpkin Orange)
  // Mavi: #1E40D8 (Ultramarine Blue)
  // Bej: #F3EBE2 (Summer Sand)

  const isTransparent = variant === "transparent"

  // Header stilleri - scroll durumuna göre değişir
  const headerClass = isTransparent
    ? `fixed top-0 left-0 right-0 z-50 w-full h-24 flex items-center transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`
    : "sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm h-24 flex items-center"

  // Menü yazı rengi - scroll durumuna göre değişir
  const textColorClass = isTransparent
    ? isScrolled 
      ? "text-[#1E40D8]" 
      : "text-white"
    : "text-[#1E40D8]"

  // Hover efekti
  const hoverBgClass = isTransparent
    ? isScrolled
      ? "hover:bg-[#F3EBE2] focus:bg-[#F3EBE2]"
      : "hover:bg-white/20 focus:bg-white/20"
    : "hover:bg-[#F3EBE2] focus:bg-[#F3EBE2]"

  const menuLinkStyle = `group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold transition-colors ${hoverBgClass} focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${textColorClass}`
  
  const triggerStyle = `group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold transition-colors ${hoverBgClass} focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${textColorClass}`

  // İletişim butonu
  const contactButtonClass = isTransparent
    ? isScrolled
      ? `${menuLinkStyle} border border-[#1E40D8] hover:bg-[#1E40D8] hover:text-white`
      : `${menuLinkStyle} border border-white hover:bg-white hover:text-[#1E40D8]`
    : `${menuLinkStyle} border border-[#1E40D8] hover:bg-[#1E40D8] hover:text-white`

  // Mobil menü ikonu rengi
  const mobileIconColor = isTransparent
    ? isScrolled
      ? "text-[#1E40D8]"
      : "text-white"
    : "text-[#1E40D8]"

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto flex items-center justify-between px-4 h-full">
          
          {/* LOGO - Her zaman orijinal renk */}
          <Link href="/" className="flex items-center gap-3 min-w-fit group">
            <Image 
              src="/images/logo.png" 
              alt="Farma Works Logo" 
              width={220} 
              height={88}
              className="h-[85px] w-auto"
              priority
            />
          </Link>

          {/* MENÜ (Masaüstü) */}
          <nav className="hidden lg:flex justify-center w-full">
            <ul className="flex items-center gap-1">
              
              {/* ANASAYFA */}
              <li>
                <Link href="/" className={menuLinkStyle}>
                  Anasayfa
                </Link>
              </li>

              {/* KURUMSAL */}
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('kurumsal')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={triggerStyle}>
                  Kurumsal
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform" style={{ transform: openDropdown === 'kurumsal' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                
                {openDropdown === 'kurumsal' && (
                  <div 
                    className="absolute left-0 top-full mt-2 bg-white border border-gray-100 shadow-xl rounded-md z-50" 
                    style={{ minWidth: '500px', width: 'max-content' }}
                    onMouseEnter={() => handleMouseEnter('kurumsal')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4 grid grid-cols-2 gap-6">
                      {/* SOL SÜTUN: Genel */}
                      <div style={{ minWidth: '220px' }}>
                        <ul className="space-y-1">
                          <ListItem href="/kurumsal/hakkimizda" title="Hakkımızda">Hikayemiz</ListItem>
                          <ListItem href="/kurumsal/insan-kaynaklari" title="İnsan Kaynakları">Kariyer</ListItem>
                        </ul>
                      </div>
                      {/* SAĞ SÜTUN: KVKK */}
                      <div className="border-l border-gray-200 pl-6" style={{ minWidth: '220px' }}>
                        <p className="text-xs font-bold text-[#ED6E2D] uppercase tracking-wider mb-3 px-2">KVKK</p>
                        <ul className="space-y-1">
                          <ListItem href="/kurumsal/kvkk/aydinlatma-metni" title="Aydınlatma Metni">Bilgilendirme</ListItem>
                          <ListItem href="/kurumsal/kvkk/imha-ve-saklama-politikasi" title="İmha Politikası">Veri saklama</ListItem>
                          <ListItem href="/kurumsal/kvkk/basvuru-formu" title="Başvuru Formu">Talep formu</ListItem>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* ÜRÜNLERİMİZ */}
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('urunler')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={triggerStyle}>
                  Ürünlerimiz
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform" style={{ transform: openDropdown === 'urunler' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                
                {openDropdown === 'urunler' && (
                  <div 
                    className="absolute left-0 top-full mt-2 bg-white border border-gray-100 shadow-xl rounded-md z-50" 
                    style={{ minWidth: '550px', width: 'max-content' }}
                    onMouseEnter={() => handleMouseEnter('urunler')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-6 grid grid-cols-3 gap-8">
                      {/* SOL SÜTUN: Gıda Takviyesi */}
                      <div>
                        <p className="text-sm font-bold text-[#1E40D8] mb-4">Gıda Takviyesi</p>
                        <ul className="space-y-1">
                          <ListItemSimple href="/urunler/vitaminler">Vitaminler</ListItemSimple>
                          <ListItemSimple href="/urunler/mineraller">Mineraller</ListItemSimple>
                          <ListItemSimple href="/urunler/multivitaminler">Multivitaminler</ListItemSimple>
                          <ListItemSimple href="/urunler/probiyotikler">Probiyotikler</ListItemSimple>
                          <ListItemSimple href="/urunler/balik-yaglari">Balık Yağları</ListItemSimple>
                          <ListItemSimple href="/urunler/bitkisel-ekstreler">Bitkisel Ekstreler</ListItemSimple>
                          <ListItemSimple href="/urunler/ozel-takviyeler">Özel Takviyeler</ListItemSimple>
                          <ListItemSimple href="/urunler/kisisel-bakim">Kişisel Bakım</ListItemSimple>
                        </ul>
                      </div>
                      {/* ORTA SÜTUN: Markalar */}
                      <div className="border-l border-gray-200 pl-8">
                        <p className="text-sm font-bold text-[#1E40D8] mb-4">Markalar</p>
                        <ul className="space-y-1">
                          <ListItemSimple href="/markalar/more-than">More Than</ListItemSimple>
                          <ListItemSimple href="/markalar/smart-caps">Smart Caps</ListItemSimple>
                          <ListItemSimple href="/markalar/raw-material">Raw Material</ListItemSimple>
                        </ul>
                      </div>
                      {/* SAĞ SÜTUN: Hızlı Erişim */}
                      <div className="border-l border-gray-200 pl-8">
                        <p className="text-sm font-bold text-[#1E40D8] mb-4">Hızlı Erişim</p>
                        <ul className="space-y-1">
                          <li className="list-none">
                            <Link
                              href="/urunler"
                              className="block py-2 px-3 text-sm font-semibold text-white bg-[#ED6E2D] hover:bg-[#d4612a] rounded-md transition-colors"
                            >
                              Tüm Ürünleri Gör
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* DİĞER LİNKLER */}
              <li>
                <Link href="/eczaneler" className={menuLinkStyle}>
                  Eczaneler
                </Link>
              </li>
              
              <li>
                <Link href="/saglik-onerileri" className={menuLinkStyle}>
                  Sağlık Önerileri
                </Link>
              </li>
              
              <li>
                <Link href="/bayimiz-ol" className={menuLinkStyle}>
                  Bayimiz Ol
                </Link>
              </li>
              
              <li>
                <Link href="https://bayi.fw.com.tr" target="_blank" rel="noopener noreferrer" className={menuLinkStyle}>
                  Bayi Girişi
                </Link>
              </li>
              
              <li>
                <Link href="/iletisim" className={contactButtonClass}>
                  İletişim
                </Link>
              </li>

            </ul>
          </nav>
          
          {/* MOBİL MENÜ BUTONU */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${mobileIconColor}`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* MOBİL MENÜ (Açılır Panel) */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-24 left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40">
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md">
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <details className="group">
                    <summary className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md cursor-pointer list-none">
                      Kurumsal
                    </summary>
                    <ul className="ml-4 mt-2 space-y-2">
                      <li><Link href="/kurumsal/hakkimizda" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Hakkımızda</Link></li>
                      <li><Link href="/kurumsal/insan-kaynaklari" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">İnsan Kaynakları</Link></li>
                      <li><Link href="/kurumsal/kvkk/aydinlatma-metni" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Aydınlatma Metni</Link></li>
                      <li><Link href="/kurumsal/kvkk/imha-ve-saklama-politikasi" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">İmha Politikası</Link></li>
                      <li><Link href="/kurumsal/kvkk/basvuru-formu" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Başvuru Formu</Link></li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details className="group">
                    <summary className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md cursor-pointer list-none">
                      Ürünlerimiz
                    </summary>
                    <ul className="ml-4 mt-2 space-y-2">
                      {/* Tüm Ürünler - Öne Çıkan */}
                      <li>
                        <Link href="/urunler" className="block py-2 px-4 text-sm font-semibold text-white bg-[#ED6E2D] hover:bg-[#d4612a] rounded-md">
                          Tüm Ürünleri Gör
                        </Link>
                      </li>
                      <li className="text-xs font-bold text-[#ED6E2D] uppercase px-4 pt-2">Gıda Takviyesi</li>
                      <li><Link href="/urunler/vitaminler" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Vitaminler</Link></li>
                      <li><Link href="/urunler/mineraller" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Mineraller</Link></li>
                      <li><Link href="/urunler/multivitaminler" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Multivitaminler</Link></li>
                      <li><Link href="/urunler/probiyotikler" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Probiyotikler</Link></li>
                      <li><Link href="/urunler/balik-yaglari" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Balık Yağları</Link></li>
                      <li><Link href="/urunler/bitkisel-ekstreler" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Bitkisel Ekstreler</Link></li>
                      <li><Link href="/urunler/ozel-takviyeler" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Özel Takviyeler</Link></li>
                      <li><Link href="/urunler/kisisel-bakim" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Kişisel Bakım</Link></li>
                      <li className="text-xs font-bold text-[#ED6E2D] uppercase px-4 pt-4">Markalar</li>
                      <li><Link href="/markalar/more-than" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">More Than</Link></li>
                      <li><Link href="/markalar/smart-caps" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Smart Caps</Link></li>
                      <li><Link href="/markalar/raw-material" className="block py-2 px-4 text-sm hover:bg-[#F3EBE2] rounded-md">Raw Material</Link></li>
                    </ul>
                  </details>
                </li>
                <li>
                  <Link href="/eczaneler" className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md">
                    Eczaneler
                  </Link>
                </li>
                <li>
                  <Link href="/saglik-onerileri" className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md">
                    Sağlık Önerileri
                  </Link>
                </li>
                <li>
                  <Link href="/bayimiz-ol" className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md">
                    Bayimiz Ol
                  </Link>
                </li>
                <li>
                  <Link href="https://bayi.fw.com.tr" target="_blank" rel="noopener noreferrer" className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md">
                    Bayi Girişi
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="block py-2 px-4 text-[#1E40D8] font-bold hover:bg-[#F3EBE2] rounded-md border border-[#1E40D8]">
                    İletişim
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      
      {/* Sayfa içeriği için boşluk - sadece solid modda (sticky header için gerekli değil ama güvenlik için) */}
    </>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  title: string
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li className="list-none">
        <Link
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F3EBE2] focus:bg-[#F3EBE2] hover:text-[#1E40D8]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-[#1E40D8] mb-1.5">{title}</div>
          <p className="text-xs leading-snug text-slate-500">
            {children}
          </p>
        </Link>
      </li>
    )
  }
)

const ListItemSimple = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li className="list-none">
      <Link
        href={href}
        className="block py-2 text-sm text-gray-600 hover:text-[#ED6E2D] transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

ListItem.displayName = "ListItem"