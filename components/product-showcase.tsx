import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, Leaf, Heart, Activity, Beaker, Star, CheckCircle } from "lucide-react"

export function ProductShowcase() {
  return (
    <section id="urun-vitrini" className="bg-white">
      
      {/* 1. BÖLÜM: Yeşil Gradient Banner (Hero) */}
      <div className="bg-gradient-to-r from-[#008c73] to-[#00b09b] py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-4">Sağlıklı Yaşam İçin Premium Ürünler</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Bilimsel olarak formüle edilmiş, en yüksek kalite standartlarında üretilen takviye 
            ürünlerimizle sağlığınızı destekleyin.
          </p>
          {/* İstatistik Rozetleri */}
          <div className="flex justify-center gap-4 text-sm font-medium">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">100+ Ürün</span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">6 Kategori</span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">Premium Kalite</span>
          </div>
        </div>
      </div>

      {/* 2. BÖLÜM: En Popüler Ürünler */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[#00b074] bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Öne Çıkan Ürünler</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">En Popüler Ürünlerimiz</h2>
          <p className="text-gray-500 mt-2">Müşterilerimizin en çok tercih ettiği ve güvendiği ürünlerimizi keşfedin.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ürün Kartı 1 - Vitaminler Sayfasına Gider */}
          <ProductCard 
            badge="Popüler" badgeColor="bg-green-500"
            category="Vitaminler"
            title="Pure C Vitamini"
            image="/images/hero.png" 
            link="/urunler/vitaminler" // LİNK EKLENDİ
          />
          {/* Ürün Kartı 2 - Mineraller Sayfasına Gider */}
          <ProductCard 
            badge="Yeni" badgeColor="bg-blue-500"
            category="Mineraller"
            title="Magnesium Oil"
            image="/images/hero.png" 
            link="/urunler/mineraller" // LİNK EKLENDİ
          />
          {/* Ürün Kartı 3 - Multivitaminler Sayfasına Gider */}
          <ProductCard 
            badge="Önerilen" badgeColor="bg-orange-500"
            category="Multivitaminler"
            title="Avokado D3K2"
            image="/images/hero.png" 
            link="/urunler/multivitaminler" // LİNK EKLENDİ
          />
          {/* Ürün Kartı 4 - Özel Takviyeler Sayfasına Gider */}
          <ProductCard 
            badge="Premium" badgeColor="bg-purple-500"
            category="Özel Takviyeler"
            title="Safran Ekstresi"
            image="/images/hero.png" 
            link="/urunler/ozel-takviyeler" // LİNK EKLENDİ
          />
        </div>
      </div>

      {/* 3. BÖLÜM: Ürün Kategorileri (Renkli Grid) */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Ürün Kategorileri</h2>
            <p className="text-gray-500 mt-2">İhtiyacınıza uygun kategoriyi seçin ve size özel ürünleri keşfedin.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard 
              title="Vitaminler" 
              desc="Günlük vitamin ihtiyaçlarınız için saf formüller" 
              color="from-orange-400 to-orange-300" 
              icon={<Zap className="w-6 h-6 text-white" />}
              tags={["C Vitamini", "B12", "D3"]}
              link="/urunler/vitaminler" // LİNK EKLENDİ
            />
            <CategoryCard 
              title="Mineraller" 
              desc="Vücudunuzun ihtiyaç duyduğu temel mineraller" 
              color="from-emerald-400 to-emerald-300" 
              icon={<Beaker className="w-6 h-6 text-white" />}
              tags={["Magnezyum", "Çinko", "Demir"]}
              link="/urunler/mineraller" // LİNK EKLENDİ
            />
            <CategoryCard 
              title="Multivitaminler" 
              desc="Kapsamlı vitamin ve mineral kompleksleri" 
              color="from-blue-400 to-blue-300" 
              icon={<Activity className="w-6 h-6 text-white" />}
              tags={["Kadın", "Erkek", "Çocuk"]}
              link="/urunler/multivitaminler" // LİNK EKLENDİ
            />
            <CategoryCard 
              title="Probiyotikler" 
              desc="Bağırsak sağlığı için özel formülasyonlar" 
              color="from-green-400 to-green-300" 
              icon={<ShieldCheck className="w-6 h-6 text-white" />}
              tags={["Sindirim", "Bağışıklık"]}
              link="/urunler/probiyotikler" // LİNK EKLENDİ
            />
            <CategoryCard 
              title="Özel Takviyeler" 
              desc="Hedef odaklı özel formülasyonlar" 
              color="from-pink-400 to-pink-300" 
              icon={<Star className="w-6 h-6 text-white" />}
              tags={["Kolajen", "Safran", "Q10"]}
              link="/urunler/ozel-takviyeler" // LİNK EKLENDİ
            />
            <CategoryCard 
              title="Kişisel Bakım" 
              desc="Günlük bakım rutininiz için doğal ürünler" 
              color="from-rose-400 to-rose-300" 
              icon={<Heart className="w-6 h-6 text-white" />}
              tags={["Serum", "Krem", "Tonik"]}
              link="/urunler/kisisel-bakim" // LİNK EKLENDİ
            />
          </div>
        </div>
      </div>

      {/* 4. BÖLÜM: Neden Farma Works? */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Neden Farma Works?</h2>
          <p className="text-gray-500 mt-2">Sağlığınız için en iyisini sunmak adına her detayı özenle planlıyoruz</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <FeatureItem icon={<ShieldCheck />} color="bg-green-100 text-green-600" title="Premium Kalite" desc="En yüksek kalite standartlarında üretilen ürünler" />
          <FeatureItem icon={<Beaker />} color="bg-blue-100 text-blue-600" title="Bilimsel Formül" desc="Bilimsel araştırmalara dayalı özel formülasyonlar" />
          <FeatureItem icon={<Leaf />} color="bg-purple-100 text-purple-600" title="Doğal İçerik" desc="Doğal ve saf hammaddelerden üretilmiş ürünler" />
          <FeatureItem icon={<CheckCircle />} color="bg-orange-100 text-orange-600" title="Uzman Destek" desc="Profesyonel danışmanlık ve müşteri desteği" />
        </div>
      </div>

      {/* 5. BÖLÜM: Alt Yeşil CTA (Call to Action) */}
      <div className="bg-[#00965e] py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Size Özel Ürün Önerileri</h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto">
            Hangi ürünlerin sizin için uygun olduğunu öğrenmek ister misiniz? 
            Uzman ekibimiz size yardımcı olmaktan mutluluk duyar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/iletisim" className="bg-white text-[#00965e] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
              Bizimle İletişime Geçin
            </Link>
            <Link href="/bayimiz-ol" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition">
              Bayimiz Olun
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}

// --- YARDIMCI ALT BİLEŞENLER ---

function ProductCard({ badge, badgeColor, category, title, image, link }: any) {
  return (
    <Link href={link} className="group block">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-64 bg-gray-50 rounded-xl overflow-hidden mb-4">
          <span className={`absolute top-3 right-3 ${badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10`}>
            {badge}
          </span>
          <div 
              className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
              style={{ backgroundImage: `url(${image})` }} 
          />
        </div>
        <div className="text-[#00b074] text-xs font-bold uppercase mb-1">{category}</div>
        <h3 className="font-bold text-gray-900 text-lg mb-4 flex-grow">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 group-hover:text-[#00b074] transition mt-auto">
          İncele <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  )
}

function CategoryCard({ title, desc, color, icon, tags, link }: any) {
  return (
    <Link href={link} className="block h-full">
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 group h-full flex flex-col">
        <div className={`h-32 rounded-xl bg-gradient-to-br ${color} mb-6 relative overflow-hidden p-6`}>
           <div className="absolute top-4 left-4 bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              {icon}
           </div>
           <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-6 flex-grow">{desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag: string) => (
            <span key={tag} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">{tag}</span>
          ))}
        </div>
        <div className="text-[#00b074] text-sm font-bold flex items-center mt-auto">
          Tüm Ürünleri Gör <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </Link>
  )
}

function FeatureItem({ icon, color, title, desc }: any) {
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