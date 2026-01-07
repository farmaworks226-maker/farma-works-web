import type { Metadata } from "next"
import Image from "next/image"
import { Microscope, Award, Leaf, Lightbulb, Heart, FlaskConical, Hexagon, Store, Factory, Recycle, Scale, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "FW İlaç'ın kuruluş hikayesi, vizyonu, misyonu ve üretim kalitesi hakkında detaylı bilgi edinin.",
}

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. BÖLÜM: Hero Banner */}
      <div className="bg-[#1E40D8] py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">FW İlaç</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Yüksek kalite standartlarına sahip gıda takviyeleriyle &quot;optimum sağlığı&quot; hedefleyen alanında inovatif, lider bir firmadır.
          </p>
        </div>
      </div>

      {/* 2. BÖLÜM: Giriş Yazısı */}
      <div className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <p className="text-lg text-gray-600 leading-relaxed">
          Hedefleri doğrultusunda üretim süreçlerini titizlik ve en son teknolojiye bağlı kalarak sürdürmektedir. 
          Yenilikçi ve geniş ürün yelpazesi ile sağlıklı yaşamın sürdürülebilirliği için çalışmalarına devam etmektedir.
        </p>
      </div>

      {/* 3. BÖLÜM: Misyon & Vizyon (Bej Alan) */}
      <div className="bg-[#F3EBE2] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Misyon */}
            <div>
              <h2 className="text-2xl font-bold text-[#1E40D8] mb-4">Misyonumuz</h2>
              <p className="text-gray-600 leading-relaxed text-sm text-justify">
                FW İlaç olarak; ortomoleküler bilim yaklaşımıyla, doğa ve bilimi bir araya getiren, yüksek biyoyararlanıma sahip gıda takviyeleri geliştiriyoruz. Yaşamın her evresinde sağlığı destekleyen, bilimsel verilerle temellendirilmiş ve kalite standartlarıyla güven veren çözümler sunarak bireylerin yaşam kalitesini sürdürülebilir biçimde artırmayı amaçlıyoruz.
              </p>
            </div>

            {/* Vizyon */}
            <div>
              <h2 className="text-2xl font-bold text-[#1E40D8] mb-4">Vizyonumuz</h2>
              <p className="text-gray-600 leading-relaxed text-sm text-justify">
                Ortomoleküler sağlık anlayışını merkeze alan ürün ekosistemimizle; yenilikçi formülasyonları, akıllı kapsül teknolojileri ve sürdürülebilir üretim yaklaşımıyla, &quot;sağlıklı yaş alma&quot; kavramını geleceğin standardı haline getiren öncü bir sağlık markası olmak.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. BÖLÜM: Temel Değerlerimiz (İkonlu - 8 Değer) */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-[#1E40D8] mb-16">Temel Değerlerimiz</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Bilimsel Temellilik */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#F3EBE2] rounded-full flex items-center justify-center text-[#ED6E2D] mb-4">
              <Microscope className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Bilimsel Temellilik</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Tüm ürün ve süreçlerimizi, güncel bilimsel veriler, klinik kanıtlar ve ortomoleküler tıp prensipleri doğrultusunda geliştiririz. Bilimi, karar alma süreçlerimizin merkezine koyarız.
            </p>
          </div>

          {/* Doğa ile Uyum */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#1E40D8]/10 rounded-full flex items-center justify-center text-[#1E40D8] mb-4">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Doğa ile Uyum</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Doğadan ilham alan ham maddeleri, bilimsel yaklaşımla birleştirerek; insan biyolojisine uyumlu, dengeli ve rasyonel çözümler üretiriz.
            </p>
          </div>

          {/* Yüksek Kalite ve Güven */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#F3EBE2] rounded-full flex items-center justify-center text-[#ED6E2D] mb-4">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Yüksek Kalite ve Güven</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Hammadde seçiminden nihai ürüne kadar tüm aşamalarda en yüksek kalite standartlarını uygular; güvenilirlikten ve şeffaflıktan ödün vermeyiz.
            </p>
          </div>

          {/* Yenilikçilik */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#1E40D8]/10 rounded-full flex items-center justify-center text-[#1E40D8] mb-4">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Yenilikçilik</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Akıllı kapsül teknolojileri, ileri formülasyonlar ve sürekli gelişen üretim teknikleriyle, sağlık çözümlerinde fark yaratan yenilikler geliştiririz.
            </p>
          </div>

          {/* Yaşam Boyu Sağlık Yaklaşımı */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#F3EBE2] rounded-full flex items-center justify-center text-[#ED6E2D] mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Yaşam Boyu Sağlık Yaklaşımı</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sağlığı yalnızca hastalık odaklı değil, koruyucu ve destekleyici bir bütün olarak ele alır; her yaş dönemine uygun çözümler sunarız.
            </p>
          </div>

          {/* Sürdürülebilirlik */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#1E40D8]/10 rounded-full flex items-center justify-center text-[#1E40D8] mb-4">
              <Recycle className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Sürdürülebilirlik</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Üretimden tedarik zincirine kadar tüm süreçlerde çevresel, sosyal ve ekonomik sürdürülebilirliği gözetir; gelecek nesiller için sorumluluk alırız.
            </p>
          </div>

          {/* Etik ve Sorumluluk */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#F3EBE2] rounded-full flex items-center justify-center text-[#ED6E2D] mb-4">
              <Scale className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Etik ve Sorumluluk</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sağlık alanında faaliyet göstermenin bilinciyle; etik ilkelere, mevzuata ve toplumsal sorumluluklara tam uyum içinde hareket ederiz.
            </p>
          </div>

          {/* Değer Odaklı İletişim */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#1E40D8]/10 rounded-full flex items-center justify-center text-[#1E40D8] mb-4">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#1E40D8] mb-3 text-sm">Değer Odaklı İletişim</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sağlık profesyonelleri, paydaşlarımız ve toplumla; doğru, açık ve bilimsel iletişim kurar, güvene dayalı ilişkiler inşa ederiz.
            </p>
          </div>

        </div>
      </div>

      {/* 5. BÖLÜM: Aile Resmi ve Slogan */}
      <div className="w-full relative h-[400px] mb-20 bg-gray-200 flex items-center justify-center">
        <div className="relative w-full h-full">
            <Image
            src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=2000" 
            alt="Mutlu Aile"
            fill
            className="object-cover"
            priority
            />
        </div>
        
        <div className="absolute inset-0 bg-[#1E40D8]/40 flex items-end justify-center pb-8 z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white italic drop-shadow-lg text-center px-4">
            FW İlaç optimum sağlık için yaşamın her anında!
          </h2>
        </div>
      </div>

      {/* 6. BÖLÜM: Ürünlerin Oluşma Yolculuğu */}
      <div className="container mx-auto px-4 pb-24 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1E40D8] uppercase tracking-wider mb-2">Ürünlerin Oluşma Yolculuğu</h2>
          <p className="text-gray-500 text-sm">FW İlaç, her bir ürünün oluşum yolculuğunda birincil önceliğini tüketicinin optimum sağlığını sürdürebilme hedefi üzerine verdi.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#F3EBE2] -translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-0 relative">
            <div className="md:w-1/2 pr-8 text-right hidden md:block"></div> 
            <div className="z-10 bg-white p-2 border-4 border-[#F3EBE2] rounded-full mb-4 md:mb-0">
              <div className="w-16 h-16 bg-[#ED6E2D] rounded-full flex items-center justify-center text-white">
                <FlaskConical className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <h3 className="font-bold text-[#1E40D8] mb-2">DOĞRU FORMÜLASYON VE DOĞRU ETKEN MADDE</h3>
              <p className="text-sm text-gray-500">Ürünlerin formülasyonu oluşturulurken etken maddelerin bilimsel temelli çalışmalarda yer almasına, günlük ihtiyaç miktarlarına ve sinerjik etkinlik gösteren kombinasyonlarına dikkat edildi.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-0 relative">
            <div className="md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
              <h3 className="font-bold text-[#1E40D8] mb-2">DOĞAL VE KATKISIZ HAMMADDE SUNUMU</h3>
              <p className="text-sm text-gray-500">Şeker, tatlandırıcı, koruyucu ve renklendirici içermeyen hammaddeler tüketicilerin kullanımı için sunulmuştur. Aynı zamanda titanyum dioksit içermeyen vegan kapsüller yer verilmiştir.</p>
            </div>
            <div className="z-10 bg-white p-2 border-4 border-[#F3EBE2] rounded-full mb-4 md:mb-0 order-1 md:order-2">
              <div className="w-16 h-16 bg-[#1E40D8] rounded-full flex items-center justify-center text-white">
                <Hexagon className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 hidden md:block order-3"></div> 
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-0 relative">
            <div className="md:w-1/2 hidden md:block"></div>
            <div className="z-10 bg-white p-2 border-4 border-[#F3EBE2] rounded-full mb-4 md:mb-0">
              <div className="w-16 h-16 bg-[#ED6E2D] rounded-full flex items-center justify-center text-white">
                <Factory className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <h3 className="font-bold text-[#1E40D8] mb-2">KALİTELİ ÜRETİM KOŞULLARI</h3>
              <p className="text-sm text-gray-500">Ürünlerimiz Türkiye&apos;de ISO, Haccp, Helal ve Kosher sertifikalı, iyi üretim koşullarına sahip tesislerde üst düzey hijyen ile üretilmektedir.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between relative">
            <div className="md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
              <h3 className="font-bold text-[#1E40D8] mb-2">ULAŞILABİLİRLİK</h3>
              <p className="text-sm text-gray-500">Ürünler üye olan eczanelerimizde yer almaktadır.</p>
            </div>
            <div className="z-10 bg-white p-2 border-4 border-[#F3EBE2] rounded-full mb-4 md:mb-0 order-1 md:order-2">
              <div className="w-16 h-16 bg-[#1E40D8] rounded-full flex items-center justify-center text-white">
                <Store className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 hidden md:block order-3"></div>
          </div>

        </div>
      </div>

    </div>
  )
}