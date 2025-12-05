"use client"

import { ShieldCheck, Leaf, Beaker, CheckCircle } from "lucide-react"
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc"

interface FeaturesGridBlok extends SbBlokData {
  title?: string
}

interface FeatureItemProps {
  icon: React.ReactNode
  color: string
  title: string
  desc: string
}

export function FeaturesGrid({ blok }: { blok: FeaturesGridBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900">{blok?.title || "Neden Farma Works?"}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        <FeatureItem icon={<ShieldCheck />} color="bg-green-100 text-green-600" title="Premium Kalite" desc="En yüksek kalite standartlarında üretim" />
        <FeatureItem icon={<Beaker />} color="bg-blue-100 text-blue-600" title="Bilimsel Formül" desc="Bilimsel araştırmalara dayalı formüller" />
        <FeatureItem icon={<Leaf />} color="bg-purple-100 text-purple-600" title="Doğal İçerik" desc="Doğal ve saf hammaddeler" />
        <FeatureItem icon={<CheckCircle />} color="bg-orange-100 text-orange-600" title="Uzman Destek" desc="Profesyonel danışmanlık" />
      </div>
    </div>
  )
}

function FeatureItem({ icon, color, title, desc }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
        <div className="w-8 h-8">{icon}</div>
      </div>
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}