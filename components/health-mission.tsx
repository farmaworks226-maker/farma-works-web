import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, Leaf, FlaskConical, Microscope } from "lucide-react"

export function HealthMission() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* SOL TARAF: İçerik ve Özellikler */}
          <div>
            {/* Üst Küçük Başlık */}
            <h4 className="text-[#00b074] font-bold uppercase tracking-wider mb-2 text-sm">
              Sağlıklı Yaşamın Öncüsü
            </h4>
            
            {/* Ana Başlık */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Sağlığınız İçin <span className="text-[#00b074]">Her Şey</span>
            </h2>
            
            {/* Açıklama Metni */}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Farma Works olarak, premium kalitede doğal sağlık takviyeleri ile optimum sağlığı 
              hedefliyoruz. Bilimsel araştırmalarla desteklenen formülasyonlarımız, yaşam 
              kalitenizi artırmak için özel olarak geliştirilmiştir.
            </p>

            {/* 4'lü Özellik Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              
              {/* Özellik 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">GMP Sertifikalı</h5>
                  <p className="text-sm text-gray-500">Uluslararası kalite standartları</p>
                </div>
              </div>

              {/* Özellik 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">Doğal İçerik</h5>
                  <p className="text-sm text-gray-500">%100 doğal ham maddeler</p>
                </div>
              </div>

              {/* Özellik 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">Laboratuvar Testli</h5>
                  <p className="text-sm text-gray-500">Her ürün test edilir</p>
                </div>
              </div>

              {/* Özellik 4 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#00b074] shrink-0">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">Bilimsel Formül</h5>
                  <p className="text-sm text-gray-500">Araştırma destekli</p>
                </div>
              </div>

            </div>

            {/* Buton */}
            <Link 
  href="#urun-vitrini"  // <-- Burayı değiştirdik (ID ile kaydırma)
  className="inline-block bg-[#00b074] hover:bg-[#00965e] text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-green-200"
>
  Daha Fazla Bilgi
</Link>
          </div>

          {/* SAĞ TARAF: Görsel */}
          <div className="relative">
            {/* Arka Plana Hafif Dekoratif Yeşil Gölge */}
            <div className="absolute -inset-4 bg-green-100 rounded-[2.5rem] transform rotate-3 -z-10"></div>
            
            {/* Ana Resim Kutusu */}
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              {/* NOT: Buraya görseldeki laboratuvar resmini koymalısınız.
                  Şimdilik internetten benzer bir stok fotoğraf kullanıyorum.
              */}
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Farma Works Laboratuvar" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}