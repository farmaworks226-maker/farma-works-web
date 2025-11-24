"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

// YENİ EKLENEN MOBİL MENÜ
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
  // Hydration hatasını çözmek için kontrol
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2 min-w-fit">
          <div className="relative h-10 w-10 shrink-0">
             <Image 
               src="/images/logo.png" 
               alt="Farma Works Logo" 
               fill
               className="object-contain"
               // Logo yüklenmezse hata vermemesi için placeholder
               onError={(e) => {
                 e.currentTarget.style.display = "none"
               }}
             />
             {/* Resim yüklenemezse F harfi görünsün diye yedek */}
             <div className="absolute inset-0 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold -z-10">F</div>
          </div>
          <span className="text-2xl font-bold text-blue-900 tracking-tight hidden md:block">Farma Works</span>
        </Link>

        {/* 2. MENÜ (Sadece Büyük Ekranlar - LG ve üzeri) */}
        {/* Sadece tarayıcı yüklendikten sonra menüyü göster (Hata Çözümü) */}
        <div className="hidden lg:flex justify-center w-full">
          {isMounted && (
            <NavigationMenu>
              <NavigationMenuList>
                
                <NavigationMenuItem>
                  <Link href="/" className={navigationMenuTriggerStyle()}>
                    Anasayfa
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Kurumsal</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4">
                      <ListItem href="/kurumsal/hakkimizda" title="Hakkımızda">Hikayemiz ve değerlerimiz.</ListItem>
                      <ListItem href="/kurumsal/insan-kaynaklari" title="İnsan Kaynakları">Kariyer fırsatları.</ListItem>
                      <ListItem href="/kurumsal/kvkk" title="KVKK">Kişisel verilerin korunması.</ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Ürünlerimiz</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <ListItem href="/urunler/mineraller" title="Mineraller">Magnezyum, Çinko, Demir.</ListItem>
                      <ListItem href="/urunler/vitaminler" title="Vitaminler">C, D, B12 vitaminleri.</ListItem>
                      <ListItem href="/urunler/multivitaminler" title="Multivitaminler">Kompleks destekler.</ListItem>
                      <ListItem href="/urunler/probiyotikler" title="Probiyotikler">Sindirim sistemi sağlığı.</ListItem>
                      <ListItem href="/urunler/ozel-takviyeler" title="Özel Takviyeler">Spesifik ihtiyaçlar.</ListItem>
                      <ListItem href="/urunler/kisisel-bakim" title="Kişisel Bakım">Dermo kozmetik ürünler.</ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/eczaneler" className={navigationMenuTriggerStyle()}>Eczaneler</Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/saglik-onerileri" className={navigationMenuTriggerStyle()}>Sağlık Önerileri</Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/bayimiz-ol" className={navigationMenuTriggerStyle()}>Bayimiz Ol</Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/iletisim" className={navigationMenuTriggerStyle()}>İletişim</Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        
        {/* 3. MOBİL MENÜ (Sadece Küçük Ekranlar - LG altı) */}
        <div className="lg:hidden">
          <MobileNav />
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
          <div className="text-sm font-medium leading-none text-blue-900">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-slate-500 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"