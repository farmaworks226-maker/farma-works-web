"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MobileNav } from "@/components/mobile-nav"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  // --- HEADER STİL AYARLARI ---
  
  // Anasayfa: Şeffaf ve Sabit (Resmin üstüne biner)
  // Diğerleri: Beyaz ve Sticky (Sayfa akışında yer kaplar)
  const headerPositionClass = isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"
  
  const headerBgClass = isHome 
    ? "bg-transparent border-none shadow-none" 
    : "bg-white border-none shadow-sm"

  const textColorClass = isHome
    ? "text-white hover:text-white/80" 
    : "text-[#065f46] hover:text-[#166534]"

  const logoColorClass = isHome
    ? "text-white"
    : "text-[#065f46]"

  // Link Stilleri
  const menuLinkStyle = `group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${isHome ? 'hover:bg-white/10' : 'hover:bg-green-50'} ${textColorClass}`
  
  const triggerStyle = `group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent ${isHome ? 'data-[state=open]:bg-white/10' : 'data-[state=open]:bg-green-50'} ${textColorClass}`

  return (
    <header className={`${headerPositionClass} z-50 w-full transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 min-w-fit group">
          <span className={`text-2xl font-bold tracking-tight drop-shadow-md transition-colors ${logoColorClass}`}>
            Farma Works
          </span>
        </Link>

        {/* MENÜ (Masaüstü) */}
        <div className="hidden lg:flex justify-center w-full">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              
              <NavigationMenuItem>
                <Link href="/" className={menuLinkStyle}>
                  Anasayfa
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerStyle}>Kurumsal</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                  <ul className="grid w-[200px] gap-2 p-4">
                    <ListItem href="/kurumsal/hakkimizda" title="Hakkımızda">Hikayemiz.</ListItem>
                    <ListItem href="/kurumsal/insan-kaynaklari" title="İnsan Kaynakları">Kariyer.</ListItem>
                    <ListItem href="/kurumsal/kvkk" title="KVKK">Yasal metinler.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerStyle}>Ürünlerimiz</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                  <ul className="grid gap-3 p-4 w-[300px] md:w-[500px] md:grid-cols-2 lg:w-[600px] max-h-[calc(100vh-200px)] overflow-y-auto">
                    <ListItem href="/urunler/mineraller" title="Mineraller">Magnezyum, Çinko.</ListItem>
                    <ListItem href="/urunler/vitaminler" title="Vitaminler">C, D, B12.</ListItem>
                    <ListItem href="/urunler/multivitaminler" title="Multivitaminler">Kompleks destek.</ListItem>
                    <ListItem href="/urunler/probiyotikler" title="Probiyotikler">Sindirim sağlığı.</ListItem>
                    <ListItem href="/urunler/ozel-takviyeler" title="Özel Takviyeler">Kolajen, Q10.</ListItem>
                    <ListItem href="/urunler/kisisel-bakim" title="Kişisel Bakım">Dermo kozmetik.</ListItem>
                    
                    <li className="col-span-1 md:col-span-2 border-t pt-2 mt-2">
                       <Link 
                         href="/urunler" 
                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 text-center font-bold text-[#166534]"
                       >
                           Tüm Ürünleri İncele →
                       </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem><Link href="/eczaneler" className={menuLinkStyle}>Eczaneler</Link></NavigationMenuItem>
              <NavigationMenuItem><Link href="/saglik-onerileri" className={menuLinkStyle}>Sağlık Önerileri</Link></NavigationMenuItem>
              <NavigationMenuItem><Link href="/bayimiz-ol" className={menuLinkStyle}>Bayimiz Ol</Link></NavigationMenuItem>
              <NavigationMenuItem><Link href="/iletisim" className={`${menuLinkStyle} border ${isHome ? 'border-white/30 hover:bg-white/10' : 'border-current/30 hover:bg-green-50'}`}>İletişim</Link></NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* MOBİL MENÜ */}
        <div className="lg:hidden">
          <div className={logoColorClass}>
            <MobileNav />
          </div>
        </div>

      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-[#065f46]">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-slate-500 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
