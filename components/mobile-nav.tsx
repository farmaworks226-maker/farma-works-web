"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Activity } from "lucide-react" // İkonlar

// Shadcn Bileşenleri
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 1. TETİKLEYİCİ BUTON (HAMBURGER) */}
      <SheetTrigger asChild>
        <button className="p-2 -mr-2 md:hidden text-gray-600 hover:text-gray-900">
          <Menu className="h-8 w-8" />
          <span className="sr-only">Menüyü Aç</span>
        </button>
      </SheetTrigger>

      {/* 2. AÇILAN YAN PANEL */}
      <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
        
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">F</div>
            Farma Works
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 pb-10">
          
          {/* TEKİL LİNKLER */}
          <MobileLink href="/" setOpen={setOpen}>
            Anasayfa
          </MobileLink>

          {/* AÇILIR MENÜ: KURUMSAL */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="kurumsal" className="border-b-0">
              <AccordionTrigger className="py-2 font-semibold hover:no-underline">
                Kurumsal
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 pl-4 border-l-2 border-gray-100 ml-2">
                <MobileLink href="/kurumsal/hakkimizda" setOpen={setOpen}>Hakkımızda</MobileLink>
                <MobileLink href="/kurumsal/insan-kaynaklari" setOpen={setOpen}>İnsan Kaynakları</MobileLink>
                <MobileLink href="/kurumsal/kvkk" setOpen={setOpen}>KVKK</MobileLink>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* AÇILIR MENÜ: ÜRÜNLERİMİZ */}
          <Accordion type="single" collapsible className="w-full -mt-4">
            <AccordionItem value="urunler" className="border-b-0">
              <AccordionTrigger className="py-2 font-semibold hover:no-underline">
                Ürünlerimiz
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 pl-4 border-l-2 border-gray-100 ml-2">
                <MobileLink href="/urunler/vitaminler" setOpen={setOpen}>Vitaminler</MobileLink>
                <MobileLink href="/urunler/mineraller" setOpen={setOpen}>Mineraller</MobileLink>
                <MobileLink href="/urunler/multivitaminler" setOpen={setOpen}>Multivitaminler</MobileLink>
                <MobileLink href="/urunler/probiyotikler" setOpen={setOpen}>Probiyotikler</MobileLink>
                <MobileLink href="/urunler/ozel-takviyeler" setOpen={setOpen}>Özel Takviyeler</MobileLink>
                <MobileLink href="/urunler/kisisel-bakim" setOpen={setOpen}>Kişisel Bakım</MobileLink>
                <MobileLink href="/urunler" setOpen={setOpen} className="font-bold text-[#00b074]">Tüm Ürünler</MobileLink>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* DİĞER LİNKLER */}
          <MobileLink href="/eczaneler" setOpen={setOpen}>
            Eczaneler
          </MobileLink>
          <MobileLink href="/saglik-onerileri" setOpen={setOpen}>
            Sağlık Önerileri
          </MobileLink>
          <MobileLink href="/bayimiz-ol" setOpen={setOpen}>
            Bayimiz Ol
          </MobileLink>
          
          <div className="mt-4">
            <SheetClose asChild>
              <Link
                href="/iletisim"
                className="flex w-full items-center justify-center rounded-full bg-[#00b074] p-3 font-bold text-white hover:bg-[#00965e]"
              >
                İletişim
              </Link>
            </SheetClose>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}

// Yardımcı Link Bileşeni (Tıklayınca menüyü kapatır)
interface MobileLinkProps {
  href: string
  setOpen: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, setOpen, children, className }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`block py-2 text-lg font-medium text-gray-600 hover:text-black ${className}`}
    >
      {children}
    </Link>
  )
}