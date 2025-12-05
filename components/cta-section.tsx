"use client"

import Link from "next/link"
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc"

interface CtaSectionBlok extends SbBlokData {
  title?: string
}

export function CtaSection({ blok }: { blok: CtaSectionBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="bg-[#00965e] py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-4">
          {blok?.title || "Size Özel Ürün Önerileri"}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/iletisim" className="bg-white text-[#00965e] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
            Bizimle İletişime Geçin
          </Link>
          <Link href="/bayimiz-ol" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition">
            Bayimiz Olun
          </Link>
        </div>
      </div>
    </div>
  )
}