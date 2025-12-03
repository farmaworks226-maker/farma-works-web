"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, Heart, Activity, Beaker, Star } from "lucide-react"
import { storyblokEditable } from "@storyblok/react/rsc"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCategories({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* Başlık Storyblok'tan gelir */}
          <h2 className="text-3xl font-bold text-gray-900">{blok?.title || "Ürün Kategorileri"}</h2>
          {/* Açıklama Storyblok'tan gelir */}
          <p className="text-gray-500 mt-2">{blok?.description || "İhtiyacınıza uygun kategoriyi seçin ve size özel ürünleri keşfedin."}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Kategori Kartları */}
          <CategoryCard 
            title="Vitaminler" 
            desc="Günlük vitamin ihtiyaçlarınız için saf formüller" 
            color="from-orange-400 to-orange-300" 
            icon={<Zap className="w-6 h-6 text-white" />} 
            tags={["C Vitamini", "B12", "D3"]} 
            link="/urunler/vitaminler" 
          />
          <CategoryCard 
            title="Mineraller" 
            desc="Vücudunuzun ihtiyaç duyduğu temel mineraller" 
            color="from-emerald-400 to-emerald-300" 
            icon={<Beaker className="w-6 h-6 text-white" />} 
            tags={["Magnezyum", "Çinko", "Demir"]} 
            link="/urunler/mineraller" 
          />
          <CategoryCard 
            title="Multivitaminler" 
            desc="Kapsamlı vitamin ve mineral kompleksleri" 
            color="from-blue-400 to-blue-300" 
            icon={<Activity className="w-6 h-6 text-white" />} 
            tags={["Kadın", "Erkek", "Çocuk"]} 
            link="/urunler/multivitaminler" 
          />
          <CategoryCard 
            title="Probiyotikler" 
            desc="Bağırsak sağlığı için özel formülasyonlar" 
            color="from-green-400 to-green-300" 
            icon={<ShieldCheck className="w-6 h-6 text-white" />} 
            tags={["Sindirim", "Bağışıklık"]} 
            link="/urunler/probiyotikler" 
          />
          <CategoryCard 
            title="Özel Takviyeler" 
            desc="Hedef odaklı özel formülasyonlar" 
            color="from-pink-400 to-pink-300" 
            icon={<Star className="w-6 h-6 text-white" />} 
            tags={["Kolajen", "Safran", "Q10"]} 
            link="/urunler/ozel-takviyeler" 
          />
          <CategoryCard 
            title="Kişisel Bakım" 
            desc="Günlük bakım rutininiz için doğal ürünler" 
            color="from-rose-400 to-rose-300" 
            icon={<Heart className="w-6 h-6 text-white" />} 
            tags={["Serum", "Krem", "Tonik"]} 
            link="/urunler/kisisel-bakim" 
          />
        </div>
      </div>
    </div>
  )
}

// Tip Tanımlaması
interface CategoryCardProps {
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  tags: string[];
  link: string;
}

function CategoryCard({ title, desc, color, icon, tags, link }: CategoryCardProps) {
  return (
    <Link href={link} className="block h-full">
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 group h-full flex flex-col">
        <div className={`h-32 rounded-xl bg-gradient-to-br ${color} mb-6 relative overflow-hidden p-6`}>
          <div className="absolute top-4 left-4 bg-white/20 p-2 rounded-lg backdrop-blur-sm">{icon}</div>
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{title}</h3>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 flex-grow">{desc}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-[#00b074] text-sm font-bold flex items-center mt-auto">
          Tüm Ürünleri Gör 
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </Link>
  )
}