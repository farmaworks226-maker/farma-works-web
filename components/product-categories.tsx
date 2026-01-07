"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { storyblokEditable } from "@storyblok/react/rsc"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCategories({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className="bg-[#F3EBE2] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1E40D8]">{blok?.title || "Ürün Kategorileri"}</h2>
          <p className="text-gray-500 mt-2">{blok?.description || "İhtiyacınıza uygun kategoriyi seçin ve size özel ürünleri keşfedin."}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <CategoryCard 
            title="Vitaminler" 
            desc="Günlük vitamin ihtiyaçlarınız için saf formüller" 
            image="/images/categories/vitaminler.jpg"
            tags={["C Vitamini", "B12", "D3"]} 
            link="/urunler/vitaminler" 
          />
          <CategoryCard 
            title="Mineraller" 
            desc="Vücudunuzun ihtiyaç duyduğu temel mineraller" 
            image="/images/categories/mineraller.jpg"
            tags={["Magnezyum", "Çinko", "Demir"]} 
            link="/urunler/mineraller" 
          />
          <CategoryCard 
            title="Multivitaminler" 
            desc="Kapsamlı vitamin ve mineral kompleksleri" 
            image="/images/categories/multi_vitaminler.jpg"
            tags={["Kadın", "Erkek", "Çocuk"]} 
            link="/urunler/multivitaminler" 
          />
          <CategoryCard 
            title="Probiyotikler" 
            desc="Bağırsak sağlığı için özel formülasyonlar" 
            image="/images/categories/probiyotikler.jpg"
            tags={["Sindirim", "Bağışıklık"]} 
            link="/urunler/probiyotikler" 
          />
          <CategoryCard 
            title="Balık Yağları" 
            desc="Kalp, beyin ve eklem sağlığı için Omega-3" 
            image="/images/categories/balik_yaglari.jpg"
            tags={["Omega-3", "EPA", "DHA"]} 
            link="/urunler/balik-yaglari" 
          />
          <CategoryCard 
            title="Bitkisel Ekstreler" 
            desc="Doğanın gücünden faydalanan formüller" 
            image="/images/categories/bitkisel_ekstreler.jpg"
            tags={["Ekinezya", "Zerdeçal", "Ginseng"]} 
            link="/urunler/bitkisel-ekstreler" 
          />
          <CategoryCard 
            title="Özel Takviyeler" 
            desc="Hedef odaklı özel formülasyonlar" 
            image="/images/categories/ozel_takviyeler.jpg"
            tags={["Kolajen", "Safran", "Q10"]} 
            link="/urunler/ozel-takviyeler" 
          />
          <CategoryCard 
            title="Kişisel Bakım" 
            desc="Günlük bakım rutininiz için doğal ürünler" 
            image="/images/categories/kisisel_bakim.jpg"
            tags={["Serum", "Krem", "Tonik"]} 
            link="/urunler/kisisel-bakim" 
          />
        </div>
      </div>
    </div>
  )
}

interface CategoryCardProps {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  link: string;
}

function CategoryCard({ title, desc, image, tags, link }: CategoryCardProps) {
  return (
    <Link href={link} className="block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group h-full flex flex-col">
        {/* Resim Alanı - Tam görünür */}
        <div className="relative w-full aspect-[3/1] overflow-hidden flex-shrink-0 bg-[#1E40D8]">
          <Image 
            src={image} 
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* İçerik Alanı */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <h3 className="text-[#1E40D8] font-bold text-base sm:text-lg mb-2">{title}</h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 flex-grow line-clamp-2">{desc}</p>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {tags.map((tag) => (
              <span key={tag} className="bg-[#F3EBE2] text-gray-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="text-[#ED6E2D] text-xs sm:text-sm font-bold flex items-center mt-auto">
            Tüm Ürünleri Gör 
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>
    </Link>
  )
}