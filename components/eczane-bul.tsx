"use client"

import { useState } from "react"
import { Search, X, Phone, Navigation, MapPin } from "lucide-react"
import { PHARMACIES } from "@/data/pharmacies" 

export function EczaneBul() {
  const [searchTerm, setSearchTerm] = useState("") 
  const [selectedCity, setSelectedCity] = useState("Tümü") 
  
  // Harita merkezi (Varsayılan: Türkiye geneli)
  const [mapCenter, setMapCenter] = useState({ lat: 39.9334, lng: 32.8597 })

  // Arama Filtresi
  const filteredPharmacies = PHARMACIES.filter((pharmacy) => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pharmacy.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = selectedCity === "Tümü" || pharmacy.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  const handleShowOnMap = (lat: number, lng: number) => {
    setMapCenter({ lat, lng })
    // Mobilde haritayı görmek için yukarı kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const getDirectionsLink = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <h1 className="text-3xl font-bold text-[#0f172a] mb-8">Anlaşmalı Eczaneler</h1>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* SOL TARAF: Arama */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Eczane veya Konum Ara
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8cc63f]">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Örn: Ankara, Eylül Eczanesi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:border-[#8cc63f] transition"
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
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Şehir Filtrele
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8cc63f]">
                  <Navigation className="w-5 h-5" />
                </div>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:border-[#8cc63f] appearance-none cursor-pointer"
                >
                  <option value="Tümü">Tüm Şehirler</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Bursa">Bursa</option>
                  <option value="Elazığ">Elazığ</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => { setSearchTerm(""); setSelectedCity("Tümü"); }}
              className="w-full bg-white border border-[#8cc63f] text-[#8cc63f] hover:bg-gray-50 font-bold py-3 px-4 rounded transition"
            >
              Filtreleri Temizle
            </button>

          </div>

          {/* SAĞ TARAF: Harita (DÜZELTİLDİ) */}
          <div className="lg:col-span-7 h-[400px] bg-gray-200 rounded-lg overflow-hidden shadow-sm relative border border-gray-300">
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen
              // DÜZELTİLEN KISIM: Standart Google Maps Embed URL'i
              src={`https://maps.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&hl=tr&z=14&output=embed`}
            ></iframe>
            
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded shadow text-xs font-bold text-gray-600 z-10">
              Canlı Harita
            </div>
          </div>

        </div>

        {/* Alt Kısım: Liste */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-[#8cc63f] font-bold mb-6">Bulunan Mağaza Sayısı: {filteredPharmacies.length}</h3>

          {filteredPharmacies.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredPharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="bg-white flex flex-col h-full p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                  
                  <div className="mb-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[#0f172a] font-bold text-lg">{pharmacy.name}</h4>
                      <button 
                        onClick={() => handleShowOnMap(pharmacy.lat, pharmacy.lng)}
                        className="text-[#8cc63f] hover:text-[#7ab332] p-1 rounded hover:bg-green-50 transition"
                        title="Haritada Göster"
                      >
                        <MapPin className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                      {pharmacy.address}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      <Phone className="w-4 h-4" />
                      {pharmacy.phone}
                    </div>
                  </div>

                  <a 
                    href={getDirectionsLink(pharmacy.lat, pharmacy.lng)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button className="w-full bg-[#8cc63f] hover:bg-[#7ab332] text-white font-bold py-3 rounded transition text-center shadow-sm flex justify-center items-center gap-2">
                      <Navigation className="w-4 h-4" /> Yol Tarifi Al
                    </button>
                  </a>

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