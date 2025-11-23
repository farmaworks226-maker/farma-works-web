"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

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
      
      {/* HAMBURGER BUTONU */}
      <SheetTrigger asChild>
        <button className="p-2 -mr-2 md:hidden text-gray-700 hover:text-black transition">
          <Menu className="h-8 w-8" />
          <span className="sr-only">Menüyü Aç</span>
        </button>
      </SheetTrigger>

      {/* YAN PANEL İÇERİĞİ */}
      <SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto bg-white p-6">
        
        {/* 1. BAŞLIK KISMI */}
        <SheetHeader className="text-left border-b border-gray-100 pb-6 mb-6">
          <SheetTitle className="text-2xl font-bold text-[#1e293b] flex items-center gap-3">
            <div className="h-10 w-10 bg-[#00b074] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
              F
            </div>
            Farma Works
          </SheetTitle>
        </SheetHeader>

        {/* 2. MENÜ LİSTESİ */}
        <div className="flex flex-col gap-6">
          
          {/* Anasayfa */}
          <MobileLink href="/" setOpen={setOpen} className="font-bold text-lg">
            Anasayfa
          </MobileLink>

          {/* AÇILIR MENÜ: KURUMSAL */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="kurumsal" className="border-none">
              <AccordionTrigger className="py-0 font-bold text-lg text-gray-800 hover:no-underline hover:text-[#00b074]">
                Kurumsal
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 pt-4 pl-4">
                <MobileLink href="/kurumsal/hakkimizda" setOpen={setOpen} className="text-gray-600">› Hakkımızda</MobileLink>
                <MobileLink href="/kurumsal/insan-kaynaklari" setOpen={setOpen} className="text-gray-600">› İnsan Kaynakları</MobileLink>
                <MobileLink href="/kurumsal/kvkk" setOpen={setOpen} className="text-gray-600">› KVKK</MobileLink>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* AÇILIR MENÜ: ÜRÜNLERİMİZ */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="urunler" className="border-none">
              <AccordionTrigger className="py-0 font-bold text-lg text-gray-800 hover:no-underline hover:text-[#00b074]">
                Ürünlerimiz
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 pt-4 pl-4">
                <MobileLink href="/urunler/vitaminler" setOpen={setOpen} className="text-gray-600">› Vitaminler</MobileLink>
                <MobileLink href="/urunler/mineraller" setOpen={setOpen} className="text-gray-600">› Mineraller</MobileLink>
                <MobileLink href="/urunler/multivitaminler" setOpen={setOpen} className="text-gray-600">› Multivitaminler</MobileLink>
                <MobileLink href="/urunler/probiyotikler" setOpen={setOpen} className="text-gray-600">› Probiyotikler</MobileLink>
                <MobileLink href="/urunler/ozel-takviyeler" setOpen={setOpen} className="text-gray-600">› Özel Takviyeler</MobileLink>
                <MobileLink href="/urunler/kisisel-bakim" setOpen={setOpen} className="text-gray-600">› Kişisel Bakım</MobileLink>
                <div className="my-2 border-t border-gray-100"></div>
                <MobileLink href="/urunler" setOpen={setOpen} className="font-bold text-[#00b074]">Tüm Ürünleri Gör</MobileLink>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* DİĞER LİNKLER */}
          <MobileLink href="/eczaneler" setOpen={setOpen} className="font-bold text-lg">
            Eczaneler
          </MobileLink>
          
          <MobileLink href="/saglik-onerileri" setOpen={setOpen} className="font-bold text-lg">
            Sağlık Önerileri
          </MobileLink>
          
          <MobileLink href="/bayimiz-ol" setOpen={setOpen} className="font-bold text-lg">
            Bayimiz Ol
          </MobileLink>
          
          {/* 3. ALT BUTON (İLETİŞİM) */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <SheetClose asChild>
              <Link
                href="/iletisim"
                className="flex w-full items-center justify-center rounded-xl bg-[#00b074] py-4 font-bold text-white shadow-lg hover:bg-[#00965e] transition active:scale-95"
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

// Yardımcı Link Bileşeni
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
      className={`text-gray-800 transition-colors hover:text-[#00b074] ${className}`}
    >
      {children}
    </Link>
  )
}