"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, X, Phone, Navigation, MapPin, User } from "lucide-react"

interface Eczane {
  id: string
  ad: string
  eczaci: string
  adres: string
  il: string
  ilce: string
  telefon: string
  lat: number | null
  lng: number | null
}

const STORYBLOK_TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "your-preview-token"

export function EczaneBul() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("Tümü")
  const [eczaneler, setEczaneler] = useState<Eczane[]>([])
  const [sehirler, setSehirler] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
  // Harita merkezi (Varsayılan: Türkiye geneli)
  const [mapCenter, setMapCenter] = useState({ lat: 39.9334, lng: 32.8597 })

  // Storyblok'tan eczaneleri çek
  useEffect(() => {
    async function fetchPharmacies() {
      try {
        let allPharmacies: Eczane[] = []
        let page = 1
        const perPage = 100
        
        while (true) {
          const response = await fetch(
            `https://api.storyblok.com/v2/cdn/stories?starts_with=eczaneler/&per_page=${perPage}&page=${page}&version=published&token=${STORYBLOK_TOKEN}`
          )
          const data = await response.json()
          
          if (!data.stories || data.stories.length === 0) break
          
          const pharmacies = data.stories.map((story: { uuid: string; content: { name?: string; pharmacist?: string; address?: string; city?: string; district?: string; phone?: string; location?: { lat?: number; lng?: number } } }) => ({
            id: story.uuid,
            ad: story.content.name || "",
            eczaci: story.content.pharmacist || "",
            adres: story.content.address || "",
            il: story.content.city || "",
            ilce: story.content.district || "",
            telefon: story.content.phone || "",
            lat: story.content.latitude ? parseFloat(story.content.latitude) : null,
            lng: story.content.longitude ? parseFloat(story.content.longitude) : null
          }))
          
          allPharmacies = [...allPharmacies, ...pharmacies]
          
          if (data.stories.length < perPage) break
          page++
        }
        
        setEczaneler(allPharmacies)
        
        // Şehirleri çıkar
        const cities = [...new Set(allPharmacies.map(e => e.il).filter(Boolean))].sort() as string[]
        setSehirler(cities)
        
      } catch (error) {
        console.error("Eczaneler yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPharmacies()
  }, [])

  // Arama Filtresi
  const filteredPharmacies = useMemo(() => {
    return eczaneler.filter((eczane) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        eczane.ad.toLowerCase().includes(searchLower) ||
        eczane.il.toLowerCase().includes(searchLower) ||
        eczane.ilce.toLowerCase().includes(searchLower) ||
        eczane.adres.toLowerCase().includes(searchLower) ||
        eczane.eczaci.toLowerCase().includes(searchLower)
      
      const matchesCity = selectedCity === "Tümü" || eczane.il === selectedCity

      return matchesSearch && matchesCity
    })
  }, [searchTerm, selectedCity, eczaneler])

  const handleShowOnMap = (lat: number | null, lng: number | null) => {
    if (lat && lng) {
      setMapCenter({ lat, lng })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getDirectionsLink = (lat: number | null, lng: number | null) => {
    if (lat && lng) {
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    }
    return "#"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3EBE2] py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40D8] mx-auto mb-4"></div>
          <p className="text-gray-600">Eczaneler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F3EBE2] py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <h1 className="text-3xl font-bold text-[#1E40D8] mb-8">Anlaşmalı Eczaneler</h1>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* SOL TARAF: Arama */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#1E40D8] mb-2">
                Eczane veya Konum Ara
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ED6E2D]">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Örn: Ankara, Eylül Eczanesi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:border-[#ED6E2D] transition"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-[#1E40D8] mb-2">
                Şehir Filtrele
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ED6E2D]">
                  <Navigation className="w-5 h-5" />
                </div>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#ED6E2D] appearance-none cursor-pointer"
                >
                  <option value="Tümü">Tüm Şehirler</option>
                  {sehirler.map((sehir) => (
                    <option key={sehir} value={sehir}>{sehir}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={() => { setSearchTerm(""); setSelectedCity("Tümü"); }}
              className="w-full bg-white border border-[#ED6E2D] text-[#ED6E2D] hover:bg-[#F3EBE2] font-bold py-3 px-4 rounded transition"
            >
              Filtreleri Temizle
            </button>

          </div>

          {/* SAĞ TARAF: Harita */}
          <div className="lg:col-span-7 h-[400px] bg-gray-200 rounded-lg overflow-hidden shadow-sm relative border border-gray-300">
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen
              src={`https://maps.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&hl=tr&z=14&output=embed`}
            ></iframe>
            
            <div className="absolute bottom-4 left-4 bg-[#1E40D8] text-white px-3 py-1 rounded shadow text-xs font-bold z-10">
              Canlı Harita
            </div>
          </div>

        </div>

        {/* Alt Kısım: Liste */}
        <div className="border-t border-gray-300 pt-8">
          <h3 className="text-[#ED6E2D] font-bold mb-6">Bulunan Eczane Sayısı: {filteredPharmacies.length}</h3>

          {filteredPharmacies.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredPharmacies.map((eczane) => (
                <div key={eczane.id} className="bg-white flex flex-col h-full p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                  
                  <div className="mb-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[#1E40D8] font-bold text-lg">{eczane.ad}</h4>
                      {eczane.lat && eczane.lng && (
                        <button 
                          onClick={() => handleShowOnMap(eczane.lat, eczane.lng)}
                          className="text-[#ED6E2D] hover:text-[#d55f24] p-1 rounded hover:bg-[#F3EBE2] transition"
                          title="Haritada Göster"
                        >
                          <MapPin className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    
                    {/* Eczacı İsmi */}
                    {eczane.eczaci && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                        <User className="w-4 h-4 text-[#1E40D8]" />
                        <span className="font-medium">{eczane.eczaci}</span>
                      </div>
                    )}
                    
                    <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                      {eczane.adres}
                    </p>
                    <p className="text-gray-400 text-xs mb-4">
                      {eczane.ilce}/{eczane.il}
                    </p>
                    {eczane.telefon && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                        <Phone className="w-4 h-4 text-[#ED6E2D]" />
                        {eczane.telefon}
                      </div>
                    )}
                  </div>

                  {eczane.lat && eczane.lng && (
                    <a 
                      href={getDirectionsLink(eczane.lat, eczane.lng)}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <button className="w-full bg-[#ED6E2D] hover:bg-[#d55f24] text-white font-bold py-3 rounded transition text-center shadow-sm flex justify-center items-center gap-2">
                        <Navigation className="w-4 h-4" /> Yol Tarifi Al
                      </button>
                    </a>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Aradığınız kriterlere uygun eczane bulunamadı.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}