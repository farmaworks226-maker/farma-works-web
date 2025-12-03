"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

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

  // --- HEADER AYARLARI ---
  const headerClass = "sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm h-24 flex items-center"
  const textColorClass = "text-[#065f46]"
  const logoColorClass = "text-[#065f46]"

  const menuLinkStyle = `group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold transition-colors hover:bg-green-50 focus:bg-green-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${textColorClass}`
  
  const triggerStyle = `group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold transition-colors hover:bg-green-50 focus:bg-green-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${textColorClass}`

  return (
    <header className={headerClass}>
      <div className="container mx-auto flex items-center justify-between px-4 h-full">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 min-w-fit group">
          <span className={`text-2xl font-bold tracking-tight ${logoColorClass}`}>
            Farma Works
          </span>
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
                    {/* SAĞ SÜTUN: KVKK */}
                    <div className="border-l border-gray-200 pl-6" style={{ minWidth: '220px' }}>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">KVKK</p>
                      <ul className="space-y-1">
                        <ListItem href="/kurumsal/kvkk/aydinlatma-metni" title="Aydınlatma Metni">Bilgilendirme.</ListItem>
                        <ListItem href="/kurumsal/kvkk/imha-ve-saklama-politikasi" title="İmha Politikası">Veri saklama.</ListItem>
                        <ListItem href="/kurumsal/kvkk/basvuru-formu" title="Başvuru Formu">Talep formu.</ListItem>
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
                  style={{ minWidth: '700px', width: 'max-content' }}
                  onMouseEnter={() => handleMouseEnter('urunler')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-6">
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                      <ListItem href="/urunler/mineraller" title="Mineraller">Magnezyum, Çinko.</ListItem>
                      <ListItem href="/urunler/vitaminler" title="Vitaminler">C, D, B12.</ListItem>
                      <ListItem href="/urunler/multivitaminler" title="Multivitaminler">Kompleks destek.</ListItem>
                      <ListItem href="/urunler/probiyotikler" title="Probiyotikler">Sindirim sağlığı.</ListItem>
                      <ListItem href="/urunler/ozel-takviyeler" title="Özel Takviyeler">Kolajen, Q10.</ListItem>
                      <ListItem href="/urunler/kisisel-bakim" title="Kişisel Bakım">Dermo kozmetik.</ListItem>
                      
                      <li className="col-span-2 border-t border-gray-200 pt-4 mt-3">
                        <Link href="/urunler" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 focus:bg-green-50 text-center font-bold text-[#166534]">
                          Tüm Ürünleri İncele →
                        </Link>
                      </li>
                    </ul>
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
              <Link href="/iletisim" className={`${menuLinkStyle} border border-gray-200 hover:bg-green-50 hover:text-[#166534]`}>
                İletişim
              </Link>
            </li>

          </ul>
        </nav>
        
        {/* MOBİL MENÜ BUTONU */}
        <div className="lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${logoColorClass}`}
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
                <Link href="/" className="block py-2 px-4 text-[#065f46] font-bold hover:bg-green-50 rounded-md">
                  Anasayfa
                </Link>
              </li>
              <li>
                <details className="group">
                  <summary className="block py-2 px-4 text-[#065f46] font-bold hover:bg-green-50 rounded-md cursor-pointer list-none">
                    Kurumsal
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2">
                    <li><Link href="/kurumsal/hakkimizda" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Hakkımızda</Link></li>
                    <li><Link href="/kurumsal/insan-kaynaklari" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">İnsan Kaynakları</Link></li>
                    <li><Link href="/kurumsal/kvkk/aydinlatma-metni" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Aydınlatma Metni</Link></li>
                    <li><Link href="/kurumsal/kvkk/imha-ve-saklama-politikasi" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">İmha Politikası</Link></li>
                    <li><Link href="/kurumsal/kvkk/basvuru-formu" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Başvuru Formu</Link></li>
                  </ul>
                </details>
              </li>
              <li>
                <details className="group">
                  <summary className="block py-2 px-4 text-[#065f46] font-bold hover:bg-green-50 rounded-md cursor-pointer list-none">
                    Ürünlerimiz
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2">
                    <li><Link href="/urunler/mineraller" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Mineraller</Link></li>
                    <li><Link href="/urunler/vitaminler" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Vitaminler</Link></li>
                    <li><Link href="/urunler/multivitaminler" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Multivitaminler</Link></li>
                    <li><Link href="/urunler/probiyotikler" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Probiyotikler</Link></li>
                    <li><Link href="/urunler/ozel-takviyeler" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Özel Takviyeler</Link></li>
                    <li><Link href="/urunler/kisisel-bakim" className="block py-2 px-4 text-sm hover:bg-green-50 rounded-md">Kişisel Bakım</Link></li>
                  </ul>
                </details>
              </li>
              <li>
                <Link href="/eczaneler" className="block py-2 px-4 text-[#065f46] font-bold hover:bg-green-50 rounded-md">
                  Eczaneler
                </Link>
              </li>
              <li>
                <Link href="/saglik-onerileri" className="block py-2 px-4 text-[#065f46] font-bold hover:bg-green-50 rounded-md">
                  Sağlık Önerileri
                </Link>
              </li>
              <li>
                <Link href="/bayimiz-ol" className="block py-2 px-4 text-[#065f46] font-bold hover:bg-green-50 rounded-md">
                  Bayimiz Ol
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="block py-2 px-4 text-[#065f46] font-bold hover:bg-green-50 rounded-md border border-gray-200">
                  İletişim
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
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
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 hover:text-[#166534]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-[#065f46] mb-1.5">{title}</div>
          <p className="text-xs leading-snug text-slate-500">
            {children}
          </p>
        </Link>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"