import { Leaf, ShieldCheck, Truck, Microscope } from "lucide-react";

// KART VERİLERİ
const features = [
  {
    icon: <Leaf className="h-10 w-10 text-green-600" />,
    title: "%100 Doğal İçerik",
    description: "Ürünlerimizde GDO, katkı maddesi ve yapay tatlandırıcı bulunmaz. Tamamen doğadan ilham alıyoruz."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
    title: "Güvenilir Sertifikalar",
    description: "Tüm ürünlerimiz uluslararası kalite standartlarına (ISO, GMP) uygun tesislerde üretilmektedir."
  },
  {
    icon: <Microscope className="h-10 w-10 text-purple-600" />,
    title: "Bilimsel Formüller",
    description: "Eczacı ve diyetisyenlerden oluşan uzman kadromuzla en etkili formülleri geliştiriyoruz."
  },
  {
    icon: <Truck className="h-10 w-10 text-orange-600" />,
    title: "Hızlı Teslimat",
    description: "Siparişleriniz özel korumalı paketlerde, 24 saat içinde kargoya verilir."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Üst Başlık */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Neden Farma Works?
          </h2>
          <p className="text-gray-600">
            Sağlığınız için en iyisini sunuyoruz. Kalite ve güven önceliğimizdir.
          </p>
        </div>

        {/* Kartlar (Grid Yapısı) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group"
            >
              {/* İkon Alanı */}
              <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 bg-gray-50 rounded-full">
                  {feature.icon}
                </div>
              </div>
              
              {/* Yazılar */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}