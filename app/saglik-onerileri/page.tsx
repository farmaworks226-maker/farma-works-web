import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

// BLOG YAZILARI VERİSİ
const ARTICLES = [
  {
    id: 1,
    category: "Bağışıklık",
    date: "15 Mart 2024",
    title: "Bağışıklık Sistemini Güçlendirme",
    description: "Mevsim geçişlerinde hastalıklardan korunmak ve bağışıklık sisteminizi doğal yollarla güçlendirmek için uzman tavsiyeleri.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400" // Meyve sebze görseli
  },
  {
    id: 2,
    category: "Vitaminler",
    date: "12 Mart 2024",
    title: "Vitamin D Eksikliği ve Önemi",
    description: "Güneş ışığından yeterince faydalanabiliyor musunuz? D vitamini eksikliğinin belirtileri ve sağlığınız için kritik önemi.",
    image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?auto=format&fit=crop&q=80&w=400" // Güneş görseli
  },
  {
    id: 3,
    category: "Probiyotikler",
    date: "10 Mart 2024",
    title: "Probiyotiklerin Faydaları",
    description: "Bağırsak sağlığı, genel sağlığın aynasıdır. Probiyotiklerin sindirim sistemi ve bağışıklık üzerindeki kanıtlanmış etkileri.",
    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=400" // Yoğurt/Limon görseli
  },
  {
    id: 4,
    category: "Beslenme",
    date: "8 Mart 2024",
    title: "Omega-3 ve Kalp Sağlığı",
    description: "Kalp dostu yağ asitleri Omega-3'ün damar sağlığına etkileri ve hangi besinlerde ne kadar bulunduğu hakkında rehber.",
    image: "https://images.unsplash.com/photo-1600601101828-7105eb0a7706?auto=format&fit=crop&q=80&w=400" // Somon balığı görseli
  },
  {
    id: 5,
    category: "Mineraller",
    date: "5 Mart 2024",
    title: "Stres Yönetimi ve Magnezyum",
    description: "Günlük stresle başa çıkmada magnezyumun rolü nedir? Hangi magnezyum formu sizin için daha uygun?",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400" // Yoga/Rahatlama görseli
  },
  {
    id: 6,
    category: "Beslenme",
    date: "1 Mart 2024",
    title: "Antioksidanlar ve Yaşlanma",
    description: "Hücre yenilenmesini destekleyen ve yaşlanma etkilerini geciktiren en güçlü antioksidan besinler hangileridir?",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=400" // Kırmızı meyveler görseli
  },
  // --- EKSTRA BAŞLIKLAR ---
  {
    id: 7,
    category: "Yaşam Tarzı",
    date: "28 Şubat 2024",
    title: "Kaliteli Uyku İçin İpuçları",
    description: "Melatonin üretimi ve uyku hijyeni. Sabahları daha dinç uyanmak için uygulayabileceğiniz 5 basit yöntem.",
    image: "https://images.unsplash.com/photo-1511295742362-92c96b5ddd36?auto=format&fit=crop&q=80&w=400" // Yatak odası/uyku görseli
  },
  {
    id: 8,
    category: "Cilt Sağlığı",
    date: "25 Şubat 2024",
    title: "Kolajen Desteği Gerekli mi?",
    description: "Cilt elastikiyeti ve eklem sağlığı için kolajen takviyeleri ne zaman kullanılmalı? Doğal kaynaklar nelerdir?",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9b0570?auto=format&fit=crop&q=80&w=400" // Cilt bakımı görseli
  },
  {
    id: 9,
    category: "Hidrasyon",
    date: "20 Şubat 2024",
    title: "Su Tüketimi ve Metabolizma",
    description: "Yeterli su içmenin kilo kontrolü ve enerji seviyeleri üzerindeki şaşırtıcı etkileri. Günde ne kadar su içmelisiniz?",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400" // Su bardağı görseli
  }
]

export default function SaglikOnerileriPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. BÖLÜM: Üst Yeşil Header */}
      <div className="bg-[#00b074] py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sağlık Önerileri</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Sağlıklı yaşam için uzman tavsiyeleri, güncel araştırmalar ve bilimsel destekli öneriler.
          </p>
        </div>
      </div>

      {/* 2. BÖLÜM: Blog Kartları Grid */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {ARTICLES.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100">
              
              {/* Resim Alanı */}
              <div className="relative h-56 overflow-hidden">
                {/* Kategori Rozeti (Sol Üst) */}
                <span className="absolute top-4 left-4 z-10 bg-[#00b074] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {article.category}
                </span>
                
                {/* Resim */}
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* İçerik Alanı */}
              <div className="p-6 flex flex-col flex-grow">
                
                {/* Tarih */}
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                </div>

                {/* Başlık */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#00b074] transition-colors">
                  {article.title}
                </h3>

                {/* Açıklama */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                  {article.description}
                </p>

                {/* Devamını Oku Linki */}
                <div className="mt-auto">
                  <Link 
                    href={`/saglik-onerileri/${article.id}`} // İleride blog detay sayfası yapılırsa buraya gider
                    className="inline-flex items-center text-[#00b074] font-bold text-sm hover:text-[#00965e] transition-colors"
                  >
                    Devamını Oku <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* 3. BÖLÜM: Alt CTA (Call To Action) */}
      <div className="bg-[#00965e] py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Daha Fazla Sağlık Önerisi İçin</h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto">
            Uzman eczacılarımızdan kişiselleştirilmiş sağlık önerileri alın ve size en uygun takviyeleri öğrenin.
          </p>
          <Link 
            href="/iletisim" 
            className="inline-block bg-white text-[#00965e] font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            Bizimle İletişime Geçin
          </Link>
        </div>
      </div>

    </div>
  )
}