"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, Menu, X, Search } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  variant?: "transparent" | "solid"
}

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Scroll durumunu takip et
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Arama açıldığında input'a focus
  React.useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // ESC ile arama kapatma
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false)
        setSearchQuery("")
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Arama submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

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

  // Text renkleri (scroll + şeffaflık durumuna göre)
  const textColor = isTransparent && !isScrolled ? "text-white" : "text-gray-800"
  const hoverColor = isTransparent && !isScrolled ? "hover:text-gray-200" : "hover:text-[#1E40D8]"

  // Menü link stili
  const menuLinkStyle = `px-4 py-2 text-sm font-medium ${textColor} ${hoverColor} transition-colors rounded-md`
  
  // Dropdown trigger butonu stili
  const triggerStyle = `flex items-center gap-1 px-4 py-2 text-sm font-medium ${textColor} ${hoverColor} transition-colors rounded-md`
  
  // İletişim butonu özel stili
  const contactButtonClass = `ml-2 px-5 py-2.5 text-sm font-semibold bg-[#ED6E2D] text-white hover:bg-[#d55f24] rounded-full transition-all shadow-sm hover:shadow-md`

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image 
              src="/images/logo.png" 
              alt="FW İlaç Logo" 
              width={120} 
              height={40}
              className={cn(
                "h-10 w-auto transition-all",
                isTransparent && !isScrolled ? "brightness-0 invert" : ""
              )}
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
                          <ListItem href="/kurumsal/hakkimizda" title="Hakkımızda">Hikayemiz.</ListItem>
                          <ListItem href="/kurumsal/insan-kaynaklari" title="İnsan Kaynakları">Kariyer.</ListItem>
                        </ul>
                      </div>
                      {/* SAĞ SÜTUN: Kişisel Verileriniz Hakkında */}
                      <div className="border-l border-gray-200 pl-6" style={{ minWidth: '220px' }}>
                        <p className="text-xs font-bold text-[#ED6E2D] uppercase tracking-wider mb-3 px-2">Kişisel Verileriniz Hakkında</p>
                        <ul className="space-y-1">
                          <ListItem href="/kisisel-verileriniz#aydinlatma" title="Aydınlatma Metni">Bilgilendirme.</ListItem>
                          <ListItem href="/kisisel-verileriniz#saklama" title="Saklama Politikası">Veri saklama.</ListItem>
                          <ListItem href="/kisisel-verileriniz#basvuru" title="Başvuru Formu">Talep formu.</ListItem>
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

              {/* ARAMA İKONU */}
              <li>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`${menuLinkStyle} p-2`}
                  aria-label="Ara"
                >
                  <Search className="w-5 h-5" />
                </button>
              </li>
            </ul>
          </nav>

          {/* ARAMA DROPDOWN */}
          {searchOpen && (
            <div className="hidden lg:block absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50">
              <div className="container mx-auto px-4 py-6">
                <form onSubmit={handleSearchSubmit} className="flex gap-3 max-w-2xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ürün veya sayfa ara..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#1E40D8] focus:ring-2 focus:ring-[#1E40D8]/20 text-gray-700"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#ED6E2D] hover:bg-[#d55f24] text-white font-semibold rounded-full transition-colors"
                  >
                    Ara
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="text-sm text-gray-500">Popüler:</span>
                  {["Vitamin D", "Omega 3", "Probiyotik", "Multivitamin"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        router.push(`/arama?q=${encodeURIComponent(term)}`)
                        setSearchOpen(false)
                      }}
                      className="text-sm text-[#1E40D8] hover:text-[#ED6E2D] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MOBİL MENÜ BUTONU */}
          <button
            className={`lg:hidden p-2 ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBİL MENÜ */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white overflow-y-auto" style={{ top: '96px' }}>
          <nav className="container mx-auto px-4 py-6">
            <ul className="space-y-2">
              <li><Link href="/" className="block py-3 text-gray-800 hover:text-[#1E40D8] font-medium">Anasayfa</Link></li>
              <li><Link href="/kurumsal/hakkimizda" className="block py-3 text-gray-800 hover:text-[#1E40D8]">Hakkımızda</Link></li>
              <li><Link href="/kurumsal/insan-kaynaklari" className="block py-3 text-gray-800 hover:text-[#1E40D8]">İnsan Kaynakları</Link></li>
              <li className="border-t pt-2">
                <p className="text-xs font-bold text-[#ED6E2D] uppercase mb-2">Kişisel Verileriniz</p>
                <Link href="/kisisel-verileriniz#aydinlatma" className="block py-2 pl-4 text-sm text-gray-700 hover:text-[#1E40D8]">Aydınlatma Metni</Link>
                <Link href="/kisisel-verileriniz#saklama" className="block py-2 pl-4 text-sm text-gray-700 hover:text-[#1E40D8]">Saklama Politikası</Link>
                <Link href="/kisisel-verileriniz#basvuru" className="block py-2 pl-4 text-sm text-gray-700 hover:text-[#1E40D8]">Başvuru Formu</Link>
              </li>
              <li className="border-t pt-2">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Ürünler</p>
                <Link href="/urunler" className="block py-2 pl-4 text-sm font-semibold text-[#ED6E2D] hover:text-[#d55f24]">Tüm Ürünler</Link>
                <Link href="/urunler/vitaminler" className="block py-2 pl-4 text-sm text-gray-700 hover:text-[#1E40D8]">Vitaminler</Link>
                <Link href="/urunler/mineraller" className="block py-2 pl-4 text-sm text-gray-700 hover:text-[#1E40D8]">Mineraller</Link>
                <Link href="/urunler/multivitaminler" className="block py-2 pl-4 text-sm text-gray-700 hover:text-[#1E40D8]">Multivitaminler</Link>
                <Link href="/urunler/probiyotikler" className="block py-2 pl-4 text-sm text-gray-700 hover:text-[#1E40D8]">Probiyotikler</Link>
              </li>
              <li><Link href="/eczaneler" className="block py-3 text-gray-800 hover:text-[#1E40D8]">Eczaneler</Link></li>
              <li><Link href="/saglik-onerileri" className="block py-3 text-gray-800 hover:text-[#1E40D8]">Sağlık Önerileri</Link></li>
              <li><Link href="/bayimiz-ol" className="block py-3 text-gray-800 hover:text-[#1E40D8]">Bayimiz Ol</Link></li>
              <li><Link href="/iletisim" className="block py-3 px-5 text-center bg-[#ED6E2D] text-white rounded-full font-semibold">İletişim</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

// Dropdown list item componentleri
const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li className="list-none">
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-[#1E40D8] focus:bg-gray-50 focus:text-[#1E40D8]",
          className
        )}
        {...props}
      >
        <div className="text-sm font-semibold leading-none text-gray-900">{title}</div>
        <p className="line-clamp-2 text-xs leading-snug text-gray-500">
          {children}
        </p>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"

const ListItemSimple: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <li className="list-none">
      <Link
        href={href}
        className="block py-2 px-3 text-sm text-gray-700 hover:text-[#1E40D8] hover:bg-gray-50 rounded-md transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}