"use client"
import Link from "next/link"
import Image from "next/image"
import { storyblokEditable } from "@storyblok/react/rsc"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroSection({ blok }: { blok: any }) {
  // Resim URL'si
  const imgUrl = blok.image?.filename || "";

  // Link Mantığı (Storyblok'tan gelen link formatını çözer)
  let btnLink = "#";
  
  if (blok.link) {
    if (blok.link.linktype === 'story' && blok.link.cached_url) {
      btnLink = `/${blok.link.cached_url.replace(/^\//, "")}`;
    } else if (blok.link.linktype === 'url' && blok.link.url) {
      btnLink = blok.link.url;
    } else if (typeof blok.link === 'string') {
      btnLink = blok.link;
    } else if (blok.link.cached_url) {
      btnLink = `/${blok.link.cached_url.replace(/^\//, "")}`;
    }
  }

  // Resim yoksa bileşeni çizme
  if (!imgUrl) return null;

  return (
    <div {...storyblokEditable(blok)} className="relative w-full h-full">
      {/* Arka Plan Resmi */}
      <div className="absolute inset-0">
        <Image
          src={imgUrl}
          alt={blok.title || "Hero Image"}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Yazılar */}
      <div className="relative container mx-auto flex h-full flex-col justify-center px-4 text-center z-20">
        {blok.title && (
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl drop-shadow-lg">
            {blok.title}
          </h1>
        )}
        
        {blok.description && (
          <p className="mb-8 text-lg text-gray-100 md:text-xl max-w-2xl mx-auto drop-shadow-md">
            {blok.description}
          </p>
        )}

        {blok.button_text && (
          <div>
            <Link
              href={btnLink}
              className="inline-block rounded-full bg-[#ED6E2D] px-8 py-3 text-lg font-semibold text-white transition-transform hover:scale-105 hover:bg-[#d55f24] shadow-lg"
            >
              {blok.button_text}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}